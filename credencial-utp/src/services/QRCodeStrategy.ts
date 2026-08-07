export interface QRCodeStrategy {
  createUrl(value: string): string;
}

function getRuntimeBaseUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return '';
}

function getConfiguredBaseUrl() {
  return process.env.EXPO_PUBLIC_VALIDATION_BASE_URL || process.env.EXPO_PUBLIC_APP_URL || '';
}

function isLocalUrl(url: string) {
  return /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(url);
}

function getValidationBaseUrl() {
  const runtimeBaseUrl = getRuntimeBaseUrl();
  const configuredBaseUrl = getConfiguredBaseUrl();

  if (runtimeBaseUrl && !isLocalUrl(runtimeBaseUrl)) {
    return runtimeBaseUrl;
  }

  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  return runtimeBaseUrl || 'http://localhost:8081';
}

export class ExternalQRServerStrategy implements QRCodeStrategy {
  createUrl(value: string): string {
    const baseUrl = getValidationBaseUrl();
    const validationUrl = `${baseUrl.replace(/\/$/, '')}/validar/${encodeURIComponent(value)}`;
    const data = encodeURIComponent(validationUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=700x700&margin=32&ecc=H&color=000000&bgcolor=FFFFFF&data=${data}`;
  }
}

export class QRCodeContext {
  constructor(private strategy: QRCodeStrategy = new ExternalQRServerStrategy()) {}

  setStrategy(strategy: QRCodeStrategy) {
    this.strategy = strategy;
  }

  getCredentialQR(matricula: string) {
    return this.strategy.createUrl(matricula);
  }

  getValidationUrl(matricula: string) {
    const baseUrl = getValidationBaseUrl();

    return `${baseUrl.replace(/\/$/, '')}/validar/${encodeURIComponent(matricula)}`;
  }
}

export const qrCodeContext = new QRCodeContext();
