import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, BookOpen, Quote, Heart, AlertTriangle, Flame, Sparkles } from 'lucide-react';

export default function QuizResult({ result, onRestart }) {
  const Icon = result.icon || Sparkles;

  const getColorScheme = () => {
    if (result.percentage <= 30) {
      return {
        primary: 'from-emerald-400 to-teal-500',
        glow: 'shadow-emerald-500/50',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30'
      };
    } else if (result.percentage <= 65) {
      return {
        primary: 'from-amber-400 to-orange-500',
        glow: 'shadow-amber-500/50',
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30'
      };
    } else {
      return {
        primary: 'from-red-500 to-orange-600',
        glow: 'shadow-red-500/50',
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30'
      };
    }
  };

  const colors = getColorScheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#4B0000] via-[#3d0000] to-[#2b0000]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        {/* Main Result Card */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 md:p-12 shadow-2xl mb-6">
          {/* Icon and Percentage */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${colors.primary} ${colors.glow} shadow-2xl mb-6`}>
              <Icon className="w-12 h-12 text-white" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-7xl md:text-8xl font-bold text-white mb-2">
                {result.percentage}%
              </div>
              <div className="text-white/60 text-sm md:text-base mb-4">
                de chance de ir para o inferno
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${colors.text} mb-4`}>
                {result.category}
              </div>
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`${colors.bg} ${colors.border} border rounded-xl p-6 mb-8`}
          >
            <p className="text-white/90 text-lg leading-relaxed text-center">
              {result.message}
            </p>
          </motion.div>

          {/* Bible Verse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 relative"
          >
            <Quote className="absolute top-4 left-4 w-8 h-8 text-white/20" />
            <div className="pl-8">
              <p className="text-white/90 text-base md:text-lg italic leading-relaxed mb-2">
                {result.verse.split('—')[0]}
              </p>
              <p className="text-amber-300 text-sm font-semibold">
                — {result.verse.split('—')[1]}
              </p>
            </div>
          </motion.div>

          {/* Books Recommendation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-amber-300" />
              <h3 className="text-white font-semibold text-lg">
                Livros Recomendados
              </h3>
            </div>
            <div className="space-y-3">
              {result.books.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <p className="text-white/90 text-sm md:text-base">
                    📖 {book}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Card>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6 text-center"
        >
          <Sparkles className="w-6 h-6 text-amber-300 mx-auto mb-3" />
          <p className="text-white/90 text-lg leading-relaxed italic">
            "O inferno começa quando o coração se fecha.<br />
            O céu começa quando o amor entra."
          </p>
        </motion.div>

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="text-center"
        >
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-white text-[#4B0000] hover:bg-amber-50 font-semibold text-lg px-12 py-6 rounded-full shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="mr-2 w-5 h-5" />
            Refazer Quiz
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}