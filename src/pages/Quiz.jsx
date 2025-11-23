import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Flame, Heart, AlertTriangle, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizResult from '../components/quiz/QuizResult';
import PaymentScreen from '../components/quiz/PaymentScreen';
import { useLocation } from 'react-router-dom';

const questions = [
  {
    id: 1,
    title: "Perdão",
    question: "Você costuma perdoar quem te magoou?",
    options: [
      { label: "A", text: "Sim, sempre tento perdoar.", points: 0 },
      { label: "B", text: "Só quando a pessoa se arrepende.", points: 1 },
      { label: "C", text: "Nunca perdoo.", points: 2 }
    ]
  },
  {
    id: 2,
    title: "Orgulho",
    question: "Quando percebe que errou, o que faz?",
    options: [
      { label: "A", text: "Admito e peço desculpas.", points: 0 },
      { label: "B", text: "Tento justificar.", points: 1 },
      { label: "C", text: "Finjo que nada aconteceu.", points: 2 }
    ]
  },
  {
    id: 3,
    title: "Ajuda ao próximo",
    question: "Você ajuda quem está passando por necessidade?",
    options: [
      { label: "A", text: "Sim, sempre que posso.", points: 0 },
      { label: "B", text: "Às vezes, se sobrar tempo.", points: 1 },
      { label: "C", text: "Não é minha responsabilidade.", points: 2 }
    ]
  },
  {
    id: 4,
    title: "Mentira e engano",
    question: "Você mente para se beneficiar?",
    options: [
      { label: "A", text: "Nunca.", points: 0 },
      { label: "B", text: "Às vezes, em situações difíceis.", points: 1 },
      { label: "C", text: "Sim, quando preciso me proteger.", points: 2 }
    ]
  },
  {
    id: 5,
    title: "Fé e oração",
    question: "Você costuma conversar com Deus?",
    options: [
      { label: "A", text: "Todos os dias.", points: 0 },
      { label: "B", text: "Raramente.", points: 1 },
      { label: "C", text: "Nunca.", points: 2 }
    ]
  },
  {
    id: 6,
    title: "Rancor",
    question: "Quando alguém te ofende, o que você faz?",
    options: [
      { label: "A", text: "Tento esquecer.", points: 0 },
      { label: "B", text: "Fico com raiva por um tempo.", points: 1 },
      { label: "C", text: "Desejo o mal de volta.", points: 2 }
    ]
  },
  {
    id: 7,
    title: "Amor ao próximo",
    question: "Como você trata pessoas diferentes de você?",
    options: [
      { label: "A", text: "Com respeito.", points: 0 },
      { label: "B", text: "Com desconfiança.", points: 1 },
      { label: "C", text: "Com desprezo.", points: 2 }
    ]
  },
  {
    id: 8,
    title: "Ganância",
    question: "O dinheiro é sua maior prioridade?",
    options: [
      { label: "A", text: "Não, é apenas uma ferramenta.", points: 0 },
      { label: "B", text: "Às vezes, penso mais em dinheiro que em pessoas.", points: 1 },
      { label: "C", text: "Sim, tudo gira em torno disso.", points: 2 }
    ]
  },
  {
    id: 9,
    title: "Inveja",
    question: "Quando alguém conquista algo, o que você sente?",
    options: [
      { label: "A", text: "Fico feliz pela pessoa.", points: 0 },
      { label: "B", text: "Sinto um pouco de inveja.", points: 1 },
      { label: "C", text: "Fico irritado ou com raiva.", points: 2 }
    ]
  },
  {
    id: 10,
    title: "Justiça",
    question: "Você já foi injusto com alguém por interesse próprio?",
    options: [
      { label: "A", text: "Nunca.", points: 0 },
      { label: "B", text: "Uma ou duas vezes.", points: 1 },
      { label: "C", text: "Sim, sem arrependimento.", points: 2 }
    ]
  },
  {
    id: 11,
    title: "Promessas",
    question: "Você cumpre o que promete?",
    options: [
      { label: "A", text: "Sempre.", points: 0 },
      { label: "B", text: "Só quando é conveniente.", points: 1 },
      { label: "C", text: "Quase nunca.", points: 2 }
    ]
  },
  {
    id: 12,
    title: "Orgulho espiritual",
    question: "Você se acha melhor que outras pessoas por sua fé?",
    options: [
      { label: "A", text: "Não, todos somos iguais.", points: 0 },
      { label: "B", text: "Às vezes penso assim.", points: 1 },
      { label: "C", text: "Sim, me considero superior.", points: 2 }
    ]
  },
  {
    id: 13,
    title: "Paciência",
    question: "Quando as coisas dão errado, como reage?",
    options: [
      { label: "A", text: "Tento manter a calma.", points: 0 },
      { label: "B", text: "Reclamo bastante.", points: 1 },
      { label: "C", text: "Desconto em alguém.", points: 2 }
    ]
  },
  {
    id: 14,
    title: "Verdade",
    question: "Você costuma dizer a verdade, mesmo quando dói?",
    options: [
      { label: "A", text: "Sim, sempre.", points: 0 },
      { label: "B", text: "Só quando não me prejudica.", points: 1 },
      { label: "C", text: "Não, prefiro mentir.", points: 2 }
    ]
  },
  {
    id: 15,
    title: "Arrependimento",
    question: "Você costuma refletir e se arrepender dos seus erros?",
    options: [
      { label: "A", text: "Sim, e tento mudar.", points: 0 },
      { label: "B", text: "Às vezes penso, mas continuo igual.", points: 1 },
      { label: "C", text: "Não me arrependo de nada.", points: 2 }
    ]
  },
  {
    id: 16,
    title: "Compaixão",
    question: "Você sente empatia por quem sofre?",
    options: [
      { label: "A", text: "Sim, sempre.", points: 0 },
      { label: "B", text: "Depende da situação.", points: 1 },
      { label: "C", text: "Não sinto nada.", points: 2 }
    ]
  },
  {
    id: 17,
    title: "Egoísmo",
    question: "Quando precisa escolher entre você e outro, o que faz?",
    options: [
      { label: "A", text: "Penso no bem comum.", points: 0 },
      { label: "B", text: "Tento equilibrar.", points: 1 },
      { label: "C", text: "Sempre escolho o que é melhor pra mim.", points: 2 }
    ]
  },
  {
    id: 18,
    title: "Perdão a si mesmo",
    question: "Quando erra, você se perdoa?",
    options: [
      { label: "A", text: "Sim, confio na misericórdia de Deus.", points: 0 },
      { label: "B", text: "Tenho dificuldade, mas tento.", points: 1 },
      { label: "C", text: "Não me importo, sigo do mesmo jeito.", points: 2 }
    ]
  },
  {
    id: 19,
    title: "Respeito à vida",
    question: "Você respeita a vida — sua e a dos outros?",
    options: [
      { label: "A", text: "Sim, acredito que toda vida é sagrada.", points: 0 },
      { label: "B", text: "Nem sempre, depende da situação.", points: 1 },
      { label: "C", text: "Não, penso só em mim.", points: 2 }
    ]
  },
  {
    id: 20,
    title: "Uso do poder ou influência",
    question: "Quando tem autoridade sobre alguém, o que faz?",
    options: [
      { label: "A", text: "Uso com justiça.", points: 0 },
      { label: "B", text: "Às vezes abuso sem perceber.", points: 1 },
      { label: "C", text: "Gosto de mandar e controlar.", points: 2 }
    ]
  }
];

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check for success query param from Stripe redirect
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('success') === 'true') {
      const savedResult = localStorage.getItem('quizResult');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);

        // Re-attach icon immediately
        let icon;
        if (parsedResult.percentage <= 30) icon = Heart;
        else if (parsedResult.percentage <= 65) icon = AlertTriangle;
        else icon = Flame;

        setResult({ ...parsedResult, icon });
        setShowResult(true);
        setStarted(true); // Ensure we are in "started" mode to show result
      }
    }
  }, [location]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (questionId, points) => {
    const newAnswers = { ...answers, [questionId]: points };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers) => {
    const totalPoints = Object.values(finalAnswers).reduce((sum, points) => sum + points, 0);
    const percentage = Math.round((totalPoints / 40) * 100);

    let category, message, verse, books, icon;

    if (percentage <= 30) {
      category = "Caminho da Luz";
      message = "Você está no caminho da luz. Seu coração é guiado pelo amor, perdão e humildade. Continue firme, cultivando a fé e ajudando quem precisa.";
      verse = '"Bem-aventurados os puros de coração, porque verão a Deus." — Mateus 5:8';
      books = [
        "O Poder da Oração — Stormie Omartian",
        "A Imitação de Cristo — Tomás de Kempis",
        "O Caminho — São Josemaría Escrivá"
      ];
      icon = Heart;
    } else if (percentage <= 65) {
      category = "Zona de Risco Espiritual";
      message = "Você está dividido entre o bem e o mal. Há luz dentro de você, mas também atitudes que precisam mudar — orgulho, egoísmo e falta de perdão.";
      verse = '"Examinai-vos a vós mesmos, se permaneceis na fé." — 2 Coríntios 13:5';
      books = [
        "O Monge e o Executivo — James C. Hunter",
        "Ame de Verdade — Max Lucado",
        "Os Sete Pecados Capitais — Fulton J. Sheen"
      ];
      icon = AlertTriangle;
    } else {
      category = "Alerta Espiritual";
      message = "Você está em alerta espiritual. O coração endurecido e as más escolhas te afastam da luz. Mas ainda há tempo para mudar e recomeçar.";
      verse = '"Arrependei-vos, pois, e convertei-vos, para que sejam apagados os vossos pecados." — Atos 3:19';
      books = [
        "O Peregrino — John Bunyan",
        "Volta ao Lar do Pai — Henri Nouwen",
        "Em Busca de Sentido — Viktor Frankl"
      ];
      icon = Flame;
    }

    const resultData = {
      score: totalPoints,
      percentage,
      category,
      message,
      verse,
      books,
      icon, // Note: Icon component won't serialize well to JSON, might need handling
      answers: finalAnswers
    };

    // Save to localStorage for persistence across redirects
    // We need to handle the icon component separately or reconstruct it
    const resultToSave = { ...resultData, icon: null }; // Don't save the component
    localStorage.setItem('quizResult', JSON.stringify(resultToSave));

    setResult(resultData);

    try {
      await base44.entities.QuizResult.create({
        score: totalPoints,
        percentage,
        category,
        answers: finalAnswers
      });
    } catch (error) {
      console.error('Erro ao salvar resultado:', error);
    }

    setTimeout(() => {
      setShowPayment(true);
    }, 500);
  };

  const handlePaymentComplete = () => {
    // This might not be called directly with Stripe Checkout redirect flow
    // But keeping it for compatibility or manual testing
    setShowPayment(false);
    setShowResult(true);
  };

  const restart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowPayment(false);
    setShowResult(false);
    setResult(null);
    localStorage.removeItem('quizResult');
    // Remove query param
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (showPayment) {
    return <PaymentScreen onPaymentComplete={handlePaymentComplete} />;
  }

  if (showResult && result) {
    return <QuizResult result={result} onRestart={restart} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#4B0000] via-[#3d0000] to-[#2b0000]">
      <div className="w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl"
              >
                <Flame className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
              >
                Qual a sua chance de ir para o inferno?
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 mb-12"
              >
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                  Baseado em estudos teológicos sobre fé, arrependimento e escolhas humanas.
                </p>
                <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                  Será que suas atitudes te aproximam do céu ou do inferno?
                </p>
                <p className="text-sm md:text-base text-amber-300 font-semibold">
                  Responda com sinceridade.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-white text-[#4B0000] hover:bg-amber-50 font-semibold text-lg px-12 py-6 rounded-full shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:scale-105"
                >
                  Iniciar Quiz
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16 flex items-center justify-center gap-2 text-white/60 text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>20 perguntas · 5 minutos</span>
              </motion.div>
            </motion.div>
          ) : (
            <QuizQuestion
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}