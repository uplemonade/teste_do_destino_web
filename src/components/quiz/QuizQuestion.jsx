import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      onAnswer(question.id, option.points);
      setSelectedOption(null);
    }, 400);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/70 text-sm font-medium">
            Pergunta {questionNumber} de {totalQuestions}
          </span>
          <span className="text-amber-300 text-sm font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 md:p-12 shadow-2xl">
        <div className="mb-3">
          <span className="text-amber-300 text-sm font-semibold uppercase tracking-wider">
            {question.title}
          </span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.div
              key={option.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => handleSelect(option)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  selectedOption?.label === option.label
                    ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/50 scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-amber-300/50'
                }`}
              >
                <div className="flex items-start gap-4 relative z-10">
                  {selectedOption?.label === option.label && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white text-amber-500">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                  <span className="flex-1 text-base md:text-lg leading-relaxed">
                    {option.text}
                  </span>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Subtle decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8 text-white/40 text-sm"
      >
        Responda com sinceridade
      </motion.div>
    </motion.div>
  );
}