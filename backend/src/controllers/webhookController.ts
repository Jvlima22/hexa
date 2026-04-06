import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const webhookController = {
  mercadopago: async (req: Request, res: Response) => {
    try {
      const { data, type } = req.query;

      if (type === 'payment') {
        const paymentData = data as any;
        const paymentId = paymentData?.id;
        console.log(`💳 Pagamento recebido: ${paymentId}`);

        // Aqui você faria a lógica de buscar os detalhes do pagamento no MP
        // e atualizar o status no seu banco de dados (Supabase)
        // const { error } = await supabase
        //   .from('orders')
        //   .update({ status: 'paid' })
        //   .eq('payment_id', paymentId);
      }

      return res.status(200).send('OK');
    } catch (error) {
      console.error('Webhook Error:', error);
      return res.status(500).json({ error: 'Webhook processing failed' });
    }
  }
};
