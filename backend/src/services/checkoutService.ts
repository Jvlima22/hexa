import { Preference } from 'mercadopago';
import { mpClient } from '../config/mercadopago';

export class CheckoutService {
  private preference: Preference;

  constructor() {
    this.preference = new Preference(mpClient);
  }

  async createPreference(items: any[], siteUrl: string) {
    try {
      const response = await this.preference.create({
        body: {
          items: items.map(item => ({
            id: item.id || 'item-default-id',
            title: item.title || 'Produto',
            quantity: Number(item.quantity) || 1,
            unit_price: Number(item.price) || 0,
            currency_id: 'BRL'
          })),
          back_urls: {
            success: `${siteUrl}/success`,
            failure: `${siteUrl}/error`,
            pending: `${siteUrl}/pending`
          },
          auto_return: 'approved',
          notification_url: `${process.env.BACKEND_EXTERNAL_URL || ''}/api/v1/webhooks/mercadopago`
        }
      });

      return {
        id: response.id,
        init_point: response.init_point
      };
    } catch (error) {
      console.error('Error creating MP preference:', error);
      throw error;
    }
  }
}

export const checkoutService = new CheckoutService();
