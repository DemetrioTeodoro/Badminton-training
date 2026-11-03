import { ALL_POS } from './court.js';

/*
 * Exercícios.
 * default: prescrição padrão { time (s) | reps (texto), sets, rest (s entre séries) }
 * shadow: se presente, o player chama os cantos durante o exercício.
 */
export const EXERCISES = [
  // ---------- Aquecimento ----------
  {
    id: 'polichinelo', name: 'Polichinelo', cat: 'aquecimento',
    default: { time: 60 },
    desc: 'Eleva a frequência cardíaca e aquece o corpo inteiro.',
    steps: ['Pés juntos, braços ao lado do corpo', 'Salte abrindo as pernas e levando os braços acima da cabeça', 'Volte à posição inicial em ritmo constante'],
    tips: ['Aterrisse na ponta dos pés, com os joelhos levemente flexionados'],
  },
  {
    id: 'skipping', name: 'Skipping alto', cat: 'aquecimento',
    default: { time: 45 },
    desc: 'Corrida no lugar elevando os joelhos, ativando quadril e panturrilhas.',
    steps: ['Corra no lugar elevando os joelhos até a altura do quadril', 'Braços acompanham o movimento', 'Mantenha o tronco ereto'],
    tips: ['Contato rápido com o chão, sempre na ponta dos pés'],
  },
  {
    id: 'mobilidade-ombro', name: 'Mobilidade de ombros', cat: 'aquecimento',
    default: { time: 60 },
    desc: 'Prepara o ombro para os golpes acima da cabeça (clear, smash).',
    steps: ['10 círculos de braço para frente, de pequenos a grandes', '10 círculos para trás', 'Cruze os braços à frente do peito e abra, 10 vezes', 'Gire o tronco com os braços abertos'],
    tips: ['Nunca comece a jogar smash com o ombro frio'],
  },
  {
    id: 'mobilidade-quadril', name: 'Mobilidade de quadril e tornozelo', cat: 'aquecimento',
    default: { time: 60 },
    desc: 'Abre o quadril e solta os tornozelos para os afundos e mudanças de direção.',
    steps: ['Abra e feche o portão: joelho sobe e gira para fora, 8 cada perna', 'Círculos de tornozelo, 10 para cada lado', 'Afundo lento alternado com rotação de tronco'],
    tips: ['Movimentos controlados, sem pressa'],
  },

  // ---------- Footwork ----------
  {
    id: 'split-step', name: 'Split step', cat: 'footwork',
    default: { time: 30, sets: 3, rest: 20 },
    desc: 'O pequeno salto de prontidão feito no instante em que o adversário bate na peteca. É a base de todo o footwork.',
    steps: ['Fique na base com os pés na largura dos ombros', 'Faça um salto baixo e rápido', 'Aterrisse com os pés um pouco mais abertos, joelhos flexionados', 'Saia rápido para um lado e volte; repita ~1 por segundo'],
    tips: ['Altura não importa, tempo sim: o salto deve ser curto', 'Peso na parte da frente dos pés'],
  },
  {
    id: 'chasse-lateral', name: 'Chassé lateral', cat: 'footwork',
    default: { time: 30, sets: 3, rest: 20 },
    desc: 'Deslocamento lateral sem cruzar as pernas, usado na defesa e para cobrir as laterais.',
    steps: ['Base baixa, raquete à frente', 'Desloque-se 2–3 passos para um lado sem cruzar os pés', 'Simule a defesa e volte para o outro lado'],
    tips: ['Mantenha o quadril baixo e o tronco estável', 'Os pés nunca se encostam'],
  },
  {
    id: 'avanco-rede', name: 'Avanço para a rede (lunge)', cat: 'footwork',
    default: { reps: '8 cada lado', sets: 3, rest: 30 },
    desc: 'O passo final para alcançar a peteca na rede.',
    steps: ['Saia da base com split step', 'Dê 1–2 passos de aproximação', 'Finalize com afundo longo, pé da raquete à frente, calcanhar tocando primeiro', 'Empurre com a perna da frente e volte para a base'],
    tips: ['Joelho da frente alinhado com o pé', 'Braço livre para trás para equilibrar'],
  },
  {
    id: 'recuo-fundo', name: 'Recuo para o fundo', cat: 'footwork',
    default: { reps: '8 cada lado', sets: 3, rest: 30 },
    desc: 'Giro + chassé ou passo cruzado para chegar atrás da peteca no fundo da quadra.',
    steps: ['Split step na base', 'Gire o corpo de lado, ombro da raquete para trás', 'Chassé ou passo cruzado para trás', 'Faça o golpe de sombra (tesoura, se for avançado) e volte à base'],
    tips: ['Chegue atrás da peteca, não embaixo dela'],
  },
  {
    id: 'shadow-6', name: 'Shadow 6 cantos', cat: 'footwork',
    shadow: { positions: ALL_POS, interval: 3 },
    default: { time: 60, sets: 4, rest: 40 },
    desc: 'O app chama um dos 6 cantos. Vá até ele, simule o golpe e volte para a base.',
    steps: ['Comece na base (centro da quadra)', 'Ao ouvir o canto, saia com split step', 'Chegue ao canto e faça o golpe de sombra', 'Volte à base antes da próxima chamada'],
    tips: ['Sempre volte ao centro', 'Qualidade antes de velocidade: aumente o ritmo aos poucos'],
  },
  {
    id: 'shadow-frente-fundo', name: 'Shadow frente e fundo', cat: 'footwork',
    shadow: { positions: ['FL', 'FR', 'BL', 'BR'], interval: 3.2 },
    default: { time: 45, sets: 4, rest: 40 },
    desc: 'Alterna cantos da rede e do fundo: o deslocamento mais longo e exigente do jogo.',
    steps: ['Base no centro', 'Rede: passos de aproximação + lunge', 'Fundo: giro + recuo + golpe', 'Volte sempre à base'],
    tips: ['No fundo, gire o tronco antes de recuar'],
  },
  {
    id: 'shadow-defesa', name: 'Shadow de defesa', cat: 'footwork',
    shadow: { positions: ['ML', 'MR'], interval: 1.8 },
    default: { time: 30, sets: 4, rest: 30 },
    desc: 'Simula a defesa de smash: deslocamentos curtos e explosivos para as laterais.',
    steps: ['Base baixa, raquete à frente do corpo', 'Ao ouvir o lado, dê um passo largo lateral', 'Defesa de backhand ou forehand', 'Volte imediatamente ao centro'],
    tips: ['Fique baixo o tempo todo', 'Um passo só: chegue com o pé da raquete'],
  },
  {
    id: 'shadow-rede', name: 'Shadow de rede', cat: 'footwork',
    shadow: { positions: ['FL', 'FR'], interval: 2.4 },
    default: { time: 40, sets: 3, rest: 30 },
    desc: 'Repetição de avanços para os cantos da rede (net shot, lob, kill).',
    steps: ['Base um pouco mais à frente', 'Avance com lunge para o canto chamado', 'Simule net shot ou lob', 'Recue empurrando com a perna da frente'],
    tips: ['Raquete alta ao chegar na rede'],
  },

  // ---------- Agilidade ----------
  {
    id: 'pes-rapidos', name: 'Pés rápidos (fast feet)', cat: 'agilidade',
    default: { time: 20, sets: 4, rest: 20 },
    desc: 'Passos curtíssimos e o mais rápidos possível, no lugar.',
    steps: ['Base baixa, peso na ponta dos pés', 'Alterne os pés com passos mínimos e muito rápidos', 'Ao final, faça um split step e um sprint de 2 passos'],
    tips: ['Os pés mal saem do chão'],
  },
  {
    id: 'estrela-petecas', name: 'Estrela com petecas', cat: 'agilidade',
    default: { reps: '2 voltas', sets: 3, rest: 45 },
    desc: 'Coloque 6 petecas nos cantos da quadra e leve uma por vez até o centro (depois devolva).',
    steps: ['Posicione uma peteca em cada canto e uma caixa/raquete no centro', 'Vá ao canto, pegue a peteca com o footwork correto', 'Leve ao centro e vá para o próximo canto', 'Na volta seguinte, devolva-as aos cantos'],
    tips: ['Use o mesmo footwork do jogo: lunge na rede, recuo no fundo'],
  },
  {
    id: 'salto-lateral', name: 'Salto lateral sobre a linha', cat: 'agilidade',
    default: { time: 30, sets: 3, rest: 30 },
    desc: 'Saltos laterais rápidos sobre uma linha da quadra, com os pés juntos.',
    steps: ['Fique ao lado de uma linha', 'Salte para o outro lado com os pés juntos', 'Contato curto com o chão e salte de volta'],
    tips: ['Braços ajudam no ritmo'],
  },
  {
    id: 'reacao-parceiro', name: 'Reação com parceiro', cat: 'agilidade', partner: true,
    default: { time: 30, sets: 4, rest: 30 },
    desc: 'O parceiro aponta uma direção ou solta uma peteca, e você reage o mais rápido possível.',
    steps: ['Fique na base, em split step contínuo', 'O parceiro aponta para um canto ou solta uma peteca', 'Reaja e toque/pegue antes de cair', 'Volte à base'],
    tips: ['Sem parceiro? Use o Shadow com "ritmo imprevisível"'],
  },

  // ---------- Condicionamento ----------
  {
    id: 'corda', name: 'Pular corda', cat: 'condicionamento',
    default: { time: 60, sets: 3, rest: 30 },
    desc: 'Clássico para panturrilha, coordenação e resistência. Avançados: double unders.',
    steps: ['Saltos baixos na ponta dos pés', 'Gire a corda com os punhos, não com os braços', 'Varie: pés alternados, joelhos altos, duplos'],
    tips: ['Ótimo para ritmo de pés e para fortalecer o punho'],
  },
  {
    id: 'burpee', name: 'Burpee', cat: 'condicionamento',
    default: { time: 30, sets: 3, rest: 30 },
    desc: 'Exercício de corpo inteiro que simula a recuperação após mergulho/defesa.',
    steps: ['Agache e apoie as mãos no chão', 'Jogue os pés para trás em prancha', 'Volte os pés e salte com os braços para cima'],
    tips: ['Mantenha o abdômen firme na prancha'],
  },
  {
    id: 'corrida-linhas', name: 'Corrida de linhas (suicide)', cat: 'condicionamento',
    default: { reps: '1 percurso', sets: 4, rest: 45 },
    desc: 'Corra da linha de fundo até cada linha da quadra e volte, aumentando a distância.',
    steps: ['Saia da linha de fundo', 'Vá até a linha de serviço longo e volte', 'Vá até a linha de serviço curto e volte', 'Vá até a rede e volte'],
    tips: ['Toque a linha com a mão para baixar o centro de gravidade'],
  },
  {
    id: 'escalador', name: 'Escalador (mountain climber)', cat: 'condicionamento',
    default: { time: 30, sets: 3, rest: 20 },
    desc: 'Cardio intenso com trabalho de core.',
    steps: ['Posição de prancha com braços estendidos', 'Leve um joelho ao peito e troque rapidamente', 'Quadril baixo e estável'],
    tips: [],
  },

  // ---------- Força ----------
  {
    id: 'agachamento-salto', name: 'Agachamento com salto', cat: 'forca',
    default: { reps: '10', sets: 3, rest: 45 },
    desc: 'Potência de pernas para saltos (smash em salto) e arranques.',
    steps: ['Pés na largura dos ombros', 'Agache até as coxas ficarem quase paralelas ao chão', 'Salte de forma explosiva', 'Aterrisse suave, já descendo para o próximo'],
    tips: ['Joelhos apontando para a ponta dos pés'],
  },
  {
    id: 'afundo', name: 'Afundo alternado', cat: 'forca',
    default: { reps: '12 cada perna', sets: 3, rest: 40 },
    desc: 'Fortalece a perna para os lunges de rede.',
    steps: ['Em pé, dê um passo longo à frente', 'Desça até o joelho de trás quase tocar o chão', 'Empurre com a perna da frente para voltar', 'Alterne as pernas'],
    tips: ['Tronco ereto', 'Para progredir, segure peso ou faça com salto'],
  },
  {
    id: 'panturrilha', name: 'Elevação de panturrilha unilateral', cat: 'forca',
    default: { reps: '15 cada perna', sets: 3, rest: 30 },
    desc: 'Panturrilha forte = arranques rápidos e menos lesão no tendão de Aquiles.',
    steps: ['Fique em um pé só, na beira de um degrau', 'Suba o calcanhar o máximo possível', 'Desça devagar abaixo da linha do degrau'],
    tips: ['Descida lenta (3 segundos)'],
  },
  {
    id: 'prancha', name: 'Prancha', cat: 'forca',
    default: { time: 40, sets: 3, rest: 20 },
    desc: 'Core estável transfere força das pernas para o golpe.',
    steps: ['Apoie antebraços e pontas dos pés', 'Corpo em linha reta da cabeça aos calcanhares', 'Contraia abdômen e glúteos'],
    tips: ['Não deixe o quadril cair'],
  },
  {
    id: 'prancha-lateral', name: 'Prancha lateral', cat: 'forca',
    default: { time: 30, sets: 2, rest: 15 },
    desc: 'Fortalece oblíquos, importantes para a rotação do tronco no golpe.',
    steps: ['Deite de lado, apoiado no antebraço', 'Eleve o quadril formando uma linha reta', 'Troque de lado a cada série'],
    tips: [],
  },
  {
    id: 'rotacao-russa', name: 'Rotação russa', cat: 'forca',
    default: { time: 30, sets: 3, rest: 20 },
    desc: 'Rotação de tronco que imita a transferência de força do smash e do clear.',
    steps: ['Sentado, joelhos flexionados, tronco inclinado para trás', 'Gire o tronco de um lado para o outro', 'Use um peso ou a raquete nas mãos'],
    tips: ['Tire os pés do chão para dificultar'],
  },
  {
    id: 'punho', name: 'Fortalecimento de punho e antebraço', cat: 'forca',
    default: { reps: '15 cada movimento', sets: 3, rest: 30 },
    desc: 'Punho e antebraço fortes dão potência e controle aos golpes.',
    steps: ['Segure a raquete com capa (ou uma garrafa) pela ponta do cabo', 'Pronação e supinação: gire o antebraço', 'Flexão e extensão do punho', 'Desvio radial: leve a cabeça da raquete para cima e para baixo'],
    tips: ['Movimento lento e controlado'],
  },

  // ---------- Técnica ----------
  {
    id: 'golpes-sombra', name: 'Golpes de sombra', cat: 'tecnica',
    default: { time: 60, sets: 3, rest: 30 },
    desc: 'Clear, drop e smash sem peteca, focando na técnica completa.',
    steps: ['Posição lateral, braço livre apontando para a peteca imaginária', 'Rotação de tronco e pronação no golpe', 'Alterne clear, drop e smash', 'Recupere a base após cada golpe'],
    tips: ['Faça em frente a um espelho ou se filme'],
  },
  {
    id: 'paredao', name: 'Paredão (wall rally)', cat: 'tecnica',
    default: { time: 60, sets: 5, rest: 30 },
    desc: 'Bata a peteca contra a parede sem deixar cair: reflexo, empunhadura e defesa.',
    steps: ['Fique a 2–3 m da parede', 'Golpes curtos de forehand e backhand', 'Mantenha a peteca no ar o máximo possível'],
    tips: ['Empunhadura relaxada, aperte só no impacto'],
  },
  {
    id: 'troca-empunhadura', name: 'Troca de empunhadura', cat: 'tecnica',
    default: { time: 45, sets: 3, rest: 20 },
    desc: 'Troca rápida entre empunhadura de forehand e backhand.',
    steps: ['Raquete à frente do corpo', 'Alterne forehand ↔ backhand girando o cabo com os dedos', 'Aumente a velocidade sem olhar para a mão'],
    tips: ['O polegar apoia no lado largo do cabo no backhand'],
  },

  // ---------- Alongamento ----------
  {
    id: 'along-panturrilha', name: 'Alongamento de panturrilha', cat: 'alongamento',
    default: { time: 60 },
    desc: 'Alivia a panturrilha e o tendão de Aquiles após o treino.',
    steps: ['Mãos na parede, uma perna atrás estendida', 'Calcanhar de trás no chão', 'Segure 30s e troque de perna'],
    tips: [],
  },
  {
    id: 'along-quadriceps', name: 'Alongamento de quadríceps', cat: 'alongamento',
    default: { time: 60 },
    desc: 'Alonga a parte da frente da coxa.',
    steps: ['Em pé, segure o pé atrás levando o calcanhar ao glúteo', 'Joelhos juntos, quadril para frente', 'Segure 30s e troque'],
    tips: [],
  },
  {
    id: 'along-posterior', name: 'Alongamento de posterior e quadril', cat: 'alongamento',
    default: { time: 60 },
    desc: 'Alonga posterior de coxa, glúteos e virilha, muito usados nos lunges.',
    steps: ['Sentado, pernas estendidas, incline o tronco à frente (20s)', 'Pernas abertas, incline para cada lado (20s)', 'Afundo baixo com o joelho de trás no chão (20s)'],
    tips: ['Respire fundo e solte o ar ao descer'],
  },
  {
    id: 'along-ombro', name: 'Alongamento de ombro e antebraço', cat: 'alongamento',
    default: { time: 60 },
    desc: 'Relaxa ombro, tríceps e antebraço do braço da raquete.',
    steps: ['Braço cruzado à frente do peito (15s cada)', 'Mão atrás da cabeça, puxe o cotovelo (15s cada)', 'Braço estendido, puxe os dedos para trás (15s)'],
    tips: [],
  },
];

/** Índice de exercícios por id. */
export const EX = Object.fromEntries(EXERCISES.map(e => [e.id, e]));
