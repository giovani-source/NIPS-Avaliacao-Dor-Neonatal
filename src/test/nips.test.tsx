import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  areAllIndicatorsAnswered,
  calculateNipsScore,
} from '../utils/nipsCalculator';
import {
  isValidPublicHttpsUrl,
  validatePublicAppUrl,
} from '../utils/qrUrlValidator';
import { App } from '../App';

describe('NIPS — Avaliação da Dor Neonatal (Regras Clínicas e Qualidade)', () => {
  it('1. Todas as opções 0 = total 0', () => {
    const result = calculateNipsScore(
      {
        expressaoFacial: 0,
        choro: 0,
        respiracao: 0,
        bracos: 0,
        pernas: 0,
        estadoAlerta: 0,
      },
      'Enfermeiro(a)'
    );

    expect(result.totalScore).toBe(0);
    expect(result.isSuggestiveOfPain).toBe(false);
    expect(result.classification).toBe('abaixo_corte');
  });

  it('2. Somente choro vigoroso = total 2', () => {
    const result = calculateNipsScore(
      {
        expressaoFacial: 0,
        choro: 2,
        respiracao: 0,
        bracos: 0,
        pernas: 0,
        estadoAlerta: 0,
      },
      'Médico(a)'
    );

    expect(result.totalScore).toBe(2);
    expect(result.isSuggestiveOfPain).toBe(false);
    expect(result.classification).toBe('abaixo_corte');
  });

  it('3. Todas as opções máximas = total 7', () => {
    const result = calculateNipsScore(
      {
        expressaoFacial: 1,
        choro: 2,
        respiracao: 1,
        bracos: 1,
        pernas: 1,
        estadoAlerta: 1,
      },
      'Enfermeiro(a)'
    );

    expect(result.totalScore).toBe(7);
    expect(result.isSuggestiveOfPain).toBe(true);
    expect(result.classification).toBe('sugestivo_dor');
  });

  it('4. Total 3 = abaixo do ponto de corte', () => {
    const result = calculateNipsScore({
      expressaoFacial: 1,
      choro: 1,
      respiracao: 1,
      bracos: 0,
      pernas: 0,
      estadoAlerta: 0,
    });

    expect(result.totalScore).toBe(3);
    expect(result.isSuggestiveOfPain).toBe(false);
    expect(result.classification).toBe('abaixo_corte');
    expect(result.interpretationMessage).toContain('abaixo do ponto de corte de 4 pontos');
    expect(result.interpretationMessage).toContain('não exclui dor');
  });

  it('5. Total 4 = sugestivo de dor', () => {
    const result = calculateNipsScore({
      expressaoFacial: 1,
      choro: 2,
      respiracao: 1,
      bracos: 0,
      pernas: 0,
      estadoAlerta: 0,
    });

    expect(result.totalScore).toBe(4);
    expect(result.isSuggestiveOfPain).toBe(true);
    expect(result.classification).toBe('sugestivo_dor');
    expect(result.interpretationMessage).toContain('Pontuação sugestiva de presença de dor');
  });

  it('6. Alteração de resposta anterior recalcula corretamente na função pura e na interface', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Tela 1 -> Iniciar avaliação
    await user.click(screen.getByRole('button', { name: /Iniciar avaliação/i }));

    // Tela 2 -> Selecionar Enfermeiro(a) -> Continuar
    await user.click(screen.getByRole('radio', { name: /Enfermeiro\(a\)/i }));
    await user.click(screen.getByRole('button', { name: /Continuar/i }));

    // Etapa 1 (Expressão facial): escolher 1 (Contraída / franzida)
    await user.click(screen.getByRole('radio', { name: /Contraída \/ franzida/i }));
    await user.click(screen.getByRole('button', { name: /Próximo/i }));

    // Etapa 2 (Choro): escolher 2 (Vigoroso)
    await user.click(screen.getByRole('radio', { name: /Vigoroso/i }));
    await user.click(screen.getByRole('button', { name: /Próximo/i }));

    // Etapa 3 (Respiração): escolher 1 (Alterada)
    await user.click(screen.getByRole('radio', { name: /Alterada/i }));
    await user.click(screen.getByRole('button', { name: /Próximo/i }));

    // Etapa 4 (Braços): escolher 0 (Relaxados)
    await user.click(screen.getByRole('radio', { name: /Relaxados/i }));
    await user.click(screen.getByRole('button', { name: /Próximo/i }));

    // Etapa 5 (Pernas): escolher 0 (Relaxadas)
    await user.click(screen.getByRole('radio', { name: /Relaxadas/i }));
    await user.click(screen.getByRole('button', { name: /Próximo/i }));

    // Etapa 6 (Estado de alerta): escolher 0 (Dormindo / calmo)
    await user.click(screen.getByRole('radio', { name: /Dormindo \/ calmo/i }));
    await user.click(screen.getByRole('button', { name: /Calcular escore NIPS/i }));

    // Resultado inicial: 1 + 2 + 1 + 0 + 0 + 0 = 4 / 7 pontos
    expect(screen.getByTestId('total-score-display')).toHaveTextContent('4 / 7 pontos');

    // Revisar respostas -> mudar Etapa 1 para Normal / relaxada (0)
    await user.click(screen.getByRole('button', { name: /Revisar respostas/i }));
    await user.click(screen.getByRole('radio', { name: /Normal \/ relaxada/i }));
    // Avançar pelas etapas (que mantiveram suas seleções persistidas)
    for (let step = 1; step <= 5; step++) {
      await user.click(screen.getByRole('button', { name: /Próximo/i }));
    }
    await user.click(screen.getByRole('button', { name: /Calcular escore NIPS/i }));

    // Novo resultado recalculado: 0 + 2 + 1 + 0 + 0 + 0 = 3 / 7 pontos
    expect(screen.getByTestId('total-score-display')).toHaveTextContent('3 / 7 pontos');
  });

  it('7. Alterar a profissão não altera a pontuação', () => {
    const sampleResponses = {
      expressaoFacial: 1,
      choro: 1,
      respiracao: 0,
      bracos: 1,
      pernas: 0,
      estadoAlerta: 1,
    };

    const nurseResult = calculateNipsScore(sampleResponses, 'Enfermeiro(a)');
    const doctorResult = calculateNipsScore(sampleResponses, 'Médico(a)');

    expect(nurseResult.totalScore).toBe(4);
    expect(doctorResult.totalScore).toBe(4);
    expect(nurseResult.totalScore).toBe(doctorResult.totalScore);
    expect(nurseResult.classification).toBe(doctorResult.classification);
  });

  it('8. QR code só compartilha URL pública válida (HTTPS, sem localhost e sem parâmetros clínicos)', () => {
    // Rejeita localhost, HTTP, IPs privados e strings inválidas
    expect(isValidPublicHttpsUrl('http://localhost:5173')).toBe(false);
    expect(isValidPublicHttpsUrl('https://localhost:5173')).toBe(false);
    expect(isValidPublicHttpsUrl('https://127.0.0.1:3000')).toBe(false);
    expect(isValidPublicHttpsUrl('https://192.168.1.15/app')).toBe(false);
    expect(isValidPublicHttpsUrl('http://nips-neonatal.vercel.app')).toBe(false);
    expect(isValidPublicHttpsUrl('')).toBe(false);

    // Aceita HTTPS público válido e remove query/hash clínicos
    const check = validatePublicAppUrl(
      'https://nips-neonatal.vercel.app/?paciente=123&escore=6#resultado'
    );
    expect(check.isValid).toBe(true);
    expect(check.sanitizedUrl).toBe('https://nips-neonatal.vercel.app/');
  });

  it('9. Não permite NaN, pontuação negativa, valores fora da escala ou formulário incompleto', () => {
    expect(
      areAllIndicatorsAnswered({
        expressaoFacial: 0,
        choro: 0,
      })
    ).toBe(false);

    expect(() =>
      calculateNipsScore({
        expressaoFacial: 0,
        choro: 0,
        respiracao: 0,
      })
    ).toThrow();

    expect(() =>
      calculateNipsScore({
        expressaoFacial: Number.NaN,
        choro: 0,
        respiracao: 0,
        bracos: 0,
        pernas: 0,
        estadoAlerta: 0,
      })
    ).toThrow();

    expect(() =>
      calculateNipsScore({
        expressaoFacial: -1,
        choro: 0,
        respiracao: 0,
        bracos: 0,
        pernas: 0,
        estadoAlerta: 0,
      })
    ).toThrow();

    expect(() =>
      calculateNipsScore({
        expressaoFacial: 2, // máximo para expressão facial é 1
        choro: 2,
        respiracao: 1,
        bracos: 1,
        pernas: 1,
        estadoAlerta: 1,
      })
    ).toThrow();
  });
});

