import { Request, Response } from 'express';
import { checkoutService } from '../services/checkoutService';

export const checkoutController = {
  create: async (req: Request, res: Response) => {
    try {
      const { items, siteUrl } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Carrinho vazio.' });
      }

      const result = await checkoutService.createPreference(items, siteUrl || 'http://localhost:3000');
      
      return res.status(201).json(result);
    } catch (error) {
      console.error('Checkout Controller Error:', error);
      return res.status(500).json({ error: 'Falha ao gerar pagamento' });
    }
  }
};
