import { MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || '';

if (!accessToken) {
  console.warn('⚠️ MERCADOPAGO_ACCESS_TOKEN not found in .env');
}

export const mpClient = new MercadoPagoConfig({
  accessToken: accessToken
});
