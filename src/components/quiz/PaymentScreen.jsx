import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, CreditCard, Check, Sparkles } from 'lucide-react';

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    // Redireciona diretamente para o Payment Link do Stripe
    //window.location.href = "https://buy.stripe.com/00w8wH0Hu1gleFZf9jgjC00"; 
    window.location.href = "https://buy.stripe.com/test_6oUeV5dugf7b0P99OZgjC01";

  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-lg py-6 rounded-xl shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          Redirecionando...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <CreditCard className="w-5 h-5" />
          Pagar e Ver Resultado
        </span>
      )}
    </Button>
  );
};

export default function PaymentScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#4B0000] via-[#3d0000] to-[#2b0000]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 md:p-10 shadow-2xl">

          {/* Ícone Cadeado */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/50 mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Descubra seu Resultado
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Para ver sua análise espiritual completa com versículos e livros recomendados
            </p>
          </motion.div>

          {/* Preço */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 border border-white/20 rounded-xl p-6 mb-8 text-center"
          >
            <p className="text-white/60 text-sm mb-2">Investimento</p>
            <div className="text-5xl font-bold text-white mb-1">
              R$ 3,99
            </div>
            <p className="text-amber-300 text-sm font-semibold">
              Pagamento único
            </p>
          </motion.div>

          {/* Benefícios */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 mb-8"
          >
            {[
              'Resultado detalhado personalizado',
              'Versículos bíblicos específicos',
              'Recomendações de livros',
              'Orientação espiritual completa'
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white/80 text-sm">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Botão de Pagamento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <CheckoutButton />
          </motion.div>

          {/* Mensagem de segurança */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white/40 text-xs mt-6"
          >
            🔒 Pagamento 100% seguro e criptografado
          </motion.p>

        </Card>
      </motion.div>
    </div>
  );
}
