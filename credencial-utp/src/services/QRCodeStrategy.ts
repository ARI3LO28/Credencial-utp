export interface QRCodeStrategy {
  createUrl(value: string): string;
}

export class ExternalQRServerStrategy implements QRCodeStrategy {
  createUrl(value: string): string {
    const data = encodeURIComponent(`https://credencial.utpuebla.edu.mx/validar/${value}`);
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${data}`;
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
}

export const qrCodeContext = new QRCodeContext();
