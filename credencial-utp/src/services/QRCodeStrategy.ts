export interface QRCodeStrategy {
  createUrl(value: string): string;
}

function getRuntimeBaseUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return '';
}

export class ExternalQRServerStrategy implements QRCodeStrategy {
  createUrl(value: string): string {
    const baseUrl =
      process.env.EXPO_PUBLIC_VALIDATION_BASE_URL ||
      process.env.EXPO_PUBLIC_APP_URL ||
      getRuntimeBaseUrl() ||
      'http://localhost:8081';
    const validationUrl = `${baseUrl.replace(/\/$/, '')}/validar/${encodeURIComponent(value)}`;
    const data = encodeURIComponent(validationUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=16&data=${data}`;
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
    const baseUrl =
      process.env.EXPO_PUBLIC_VALIDATION_BASE_URL ||
      process.env.EXPO_PUBLIC_APP_URL ||
      getRuntimeBaseUrl() ||
      'http://localhost:8081';

    return `${baseUrl.replace(/\/$/, '')}/validar/${encodeURIComponent(matricula)}`;
  }
}

export const qrCodeContext = new QRCodeContext();
