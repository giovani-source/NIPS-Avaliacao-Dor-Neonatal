/**
 * Valida e higieniza URL pública HTTPS para o QR code de compartilhamento do aplicativo.
 * Regras clínicas e de segurança:
 * 1. Deve ser uma URL válida com protocolo estritamente HTTPS (https:).
 * 2. Não pode apontar para localhost, 127.0.0.1, 0.0.0.0, ::1, domínios .local ou IPs privados (LAN).
 * 3. Nunca deve incluir parâmetros de query ou hash contendo escores, respostas ou dados clínicos/pacientes.
 */

const PRIVATE_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^0\./,
  /^169\.254\./,
];

export interface PublicUrlValidationResult {
  isValid: boolean;
  sanitizedUrl: string | null;
  reason?: string;
}

export function validatePublicAppUrl(rawUrl: string | undefined | null): PublicUrlValidationResult {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      isValid: false,
      sanitizedUrl: null,
      reason: 'Nenhuma URL pública foi informada.',
    };
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return {
      isValid: false,
      sanitizedUrl: null,
      reason: 'A URL informada está vazia.',
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      isValid: false,
      sanitizedUrl: null,
      reason: 'Formato de URL inválido.',
    };
  }

  if (parsed.protocol !== 'https:') {
    return {
      isValid: false,
      sanitizedUrl: null,
      reason: 'O QR code exige exclusivamente uma URL pública segura com protocolo HTTPS.',
    };
  }

  const hostname = parsed.hostname.toLowerCase();

  if (
    hostname === 'localhost' ||
    hostname === '::1' ||
    hostname === '[::1]' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.localhost') ||
    !hostname.includes('.')
  ) {
    return {
      isValid: false,
      sanitizedUrl: null,
      reason: 'Endereços locais (localhost) não são permitidos como QR code público funcional.',
    };
  }

  if (PRIVATE_IP_PATTERNS.some((regex) => regex.test(hostname))) {
    return {
      isValid: false,
      sanitizedUrl: null,
      reason: 'Endereços IP de rede local não são permitidos como QR code público.',
    };
  }

  if (parsed.username || parsed.password) {
    return {
      isValid: false,
      sanitizedUrl: null,
      reason: 'A URL não deve conter credenciais.',
    };
  }

  // Remove quaisquer parâmetros de busca (search) ou fragmentos (hash) para garantir
  // que nenhum dado de avaliação clínica ou paciente possa ser codificado na URL do QR code.
  const cleanUrl = new URL(parsed.origin + parsed.pathname);
  return {
    isValid: true,
    sanitizedUrl: cleanUrl.toString(),
  };
}

export function isValidPublicHttpsUrl(rawUrl: string | undefined | null): boolean {
  return validatePublicAppUrl(rawUrl).isValid;
}

/**
 * Resolve a URL pública da aplicação a partir de variável de ambiente ou window.location.origin.
 */
export function resolveCurrentPublicAppUrl(
  envPublicUrl?: string,
  currentLocationHref?: string
): PublicUrlValidationResult {
  if (envPublicUrl && envPublicUrl.trim().length > 0) {
    const envCheck = validatePublicAppUrl(envPublicUrl);
    if (envCheck.isValid) {
      return envCheck;
    }
  }

  if (currentLocationHref) {
    return validatePublicAppUrl(currentLocationHref);
  }

  if (typeof window !== 'undefined' && window.location?.href) {
    return validatePublicAppUrl(window.location.href);
  }

  return {
    isValid: false,
    sanitizedUrl: null,
    reason: 'Aplicação em ambiente local de desenvolvimento sem URL HTTPS pública configurada.',
  };
}

