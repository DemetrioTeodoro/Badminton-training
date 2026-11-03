/*
 * Treinos prontos. Cada etapa: { ex, time | reps, sets, rest (entre séries), after (pausa até a próxima etapa), interval (ritmo do shadow) }
 */
export const WORKOUTS = [
  {
    id: 'aquecimento', name: 'Aquecimento pré-jogo', level: 'Todos os níveis',
    desc: 'Prepara corpo e articulações antes de jogar. Faça sempre antes de entrar em quadra.',
    steps: [
      { ex: 'polichinelo', time: 45 },
      { ex: 'skipping', time: 30 },
      { ex: 'mobilidade-ombro', time: 45 },
      { ex: 'mobilidade-quadril', time: 45 },
      { ex: 'split-step', time: 30 },
      { ex: 'chasse-lateral', time: 30 },
      { ex: 'golpes-sombra', time: 45 },
    ],
  },
  {
    id: 'footwork-iniciante', name: 'Footwork iniciante', level: 'Iniciante',
    desc: 'Aprenda os movimentos básicos e depois junte tudo no shadow em ritmo tranquilo.',
    steps: [
      { ex: 'polichinelo', time: 45 },
      { ex: 'mobilidade-quadril', time: 45 },
      { ex: 'split-step', time: 30, sets: 2, rest: 20 },
      { ex: 'chasse-lateral', time: 30, sets: 2, rest: 20 },
      { ex: 'avanco-rede', reps: '6 cada lado', sets: 2, rest: 30 },
      { ex: 'recuo-fundo', reps: '6 cada lado', sets: 2, rest: 30 },
      { ex: 'shadow-frente-fundo', time: 40, sets: 3, rest: 45, interval: 3.8 },
      { ex: 'along-panturrilha', time: 60 },
      { ex: 'along-posterior', time: 60 },
    ],
  },
  {
    id: 'shadow-intenso', name: 'Shadow intenso', level: 'Avançado',
    desc: 'Volume alto de shadow em ritmo de jogo, com bloco de defesa no final.',
    steps: [
      { ex: 'polichinelo', time: 45 },
      { ex: 'skipping', time: 30 },
      { ex: 'split-step', time: 30 },
      { ex: 'shadow-6', time: 60, sets: 5, rest: 30, interval: 2.2, after: 60 },
      { ex: 'shadow-defesa', time: 30, sets: 4, rest: 20, interval: 1.5 },
      { ex: 'along-panturrilha', time: 60 },
      { ex: 'along-quadriceps', time: 60 },
    ],
  },
  {
    id: 'agilidade', name: 'Agilidade e reação', level: 'Intermediário',
    desc: 'Pés rápidos, mudanças de direção e shadow com chamadas curtas.',
    steps: [
      { ex: 'skipping', time: 45 },
      { ex: 'pes-rapidos', time: 20, sets: 3, rest: 20 },
      { ex: 'salto-lateral', time: 30, sets: 3, rest: 30 },
      { ex: 'shadow-rede', time: 40, sets: 3, rest: 30, interval: 2.2 },
      { ex: 'shadow-defesa', time: 30, sets: 3, rest: 30, interval: 1.7 },
      { ex: 'shadow-6', time: 45, sets: 3, rest: 40, interval: 2.6 },
      { ex: 'along-posterior', time: 60 },
    ],
  },
  {
    id: 'forca', name: 'Força e explosão', level: 'Intermediário',
    desc: 'Pernas, core e punho: a base física do badminton. Pode ser feito em casa.',
    steps: [
      { ex: 'polichinelo', time: 60 },
      { ex: 'agachamento-salto', reps: '10', sets: 3, rest: 45 },
      { ex: 'afundo', reps: '10 cada perna', sets: 3, rest: 40 },
      { ex: 'panturrilha', reps: '15 cada perna', sets: 3, rest: 30 },
      { ex: 'prancha', time: 40, sets: 3, rest: 20 },
      { ex: 'prancha-lateral', time: 30, sets: 2, rest: 15 },
      { ex: 'rotacao-russa', time: 30, sets: 2, rest: 20 },
      { ex: 'punho', reps: '15 cada movimento', sets: 2, rest: 30 },
    ],
  },
  {
    id: 'cardio', name: 'Condicionamento de quadra', level: 'Intermediário',
    desc: 'Resistência para aguentar ralis longos e jogos de 3 sets.',
    steps: [
      { ex: 'corda', time: 60, sets: 3, rest: 30 },
      { ex: 'burpee', time: 30, sets: 3, rest: 30 },
      { ex: 'escalador', time: 30, sets: 3, rest: 20 },
      { ex: 'corrida-linhas', reps: '1 percurso', sets: 4, rest: 45 },
      { ex: 'pes-rapidos', time: 20, sets: 3, rest: 20 },
      { ex: 'along-quadriceps', time: 60 },
      { ex: 'along-panturrilha', time: 60 },
    ],
  },
  {
    id: 'volta-calma', name: 'Volta à calma', level: 'Todos os níveis',
    desc: 'Alongamento leve para depois do jogo ou treino.',
    steps: [
      { ex: 'along-panturrilha', time: 60 },
      { ex: 'along-quadriceps', time: 60 },
      { ex: 'along-posterior', time: 60 },
      { ex: 'along-ombro', time: 60 },
    ],
  },
];
