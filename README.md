# Badminton Training — app de treino de badminton

App em HTML/CSS/JavaScript puro (sem framework e sem build), que roda no navegador e vira **app Android (APK)** com o [Capacitor](https://capacitorjs.com).

## Funcionalidades

- **Shadow footwork**: meia-quadra interativa com 6 cantos. O app chama o canto (voz com o nome, número ou só bipe), mostra no desenho e você volta para a base. Configura nível, ritmo, duração, séries, descanso, cantos ativos, ordem aleatória/sequencial e ritmo imprevisível.
- **Exercícios**: 33 exercícios em 7 categorias (aquecimento, footwork, agilidade, condicionamento, força, técnica, alongamento), com passo a passo, dicas e timer.
- **Treinos**: 7 rotinas guiadas.
- **Player**: timer, contagem 3-2-1 com bipe, voz em português, vibração, pausa/pular/voltar, tela sempre ligada.
- **Histórico**: sessões, dias seguidos, minutos da semana, movimentos de shadow (salvo no aparelho).

## Estrutura

```
web/                        app (é esta pasta que vai para dentro do APK)
├── index.html
├── manifest.webmanifest    instalação como PWA
├── sw.js                   modo offline (só na versão web)
├── assets/icon.svg
├── css/                    estilos por área
│   ├── base.css            cores (variáveis), reset
│   ├── layout.css          cabeçalho, abas, cards
│   ├── controls.css        botões, sliders, switches
│   ├── court.css           desenho da quadra
│   ├── lists.css           listas e estatísticas
│   ├── sheet.css           painel que sobe de baixo
│   ├── player.css          tela de treino
│   └── toast.css
└── js/                     módulos ES (import/export)
    ├── main.js             entrada: roteador das abas
    ├── core/               utilidades: DOM, formatação, storage, ícones
    ├── data/               conteúdo: exercícios, treinos, cantos, categorias
    ├── services/           voz, bipes, vibração, tela ligada, histórico, configurações
    ├── training/           lógica: motor do shadow, montagem das fases
    ├── ui/                 componentes: player, quadra, sheet, toast
    └── views/              telas: shadow, exercícios, treinos, histórico, configurações
android/                    projeto Android nativo gerado pelo Capacitor
capacitor.config.json       nome do app, id do pacote, pasta web
```

**Onde mexer:** exercícios em `web/js/data/exercises.js`, treinos em `web/js/data/workouts.js`, níveis do shadow em `web/js/data/court.js`, cores em `web/css/base.css`.

## Rodar no navegador

```bash
npm run dev
# abra http://localhost:5173
```

## Gerar o APK Android

No Android, voz, tela ligada e vibração usam plugins nativos, porque o WebView não tem a API de voz do navegador. O código detecta sozinho se está no app ou no navegador (`web/js/services/native.js`).

Requisitos: Node 22, Android SDK e **JDK 21** (por padrão o build usa o JDK do Android Studio em `~/android-studio/jbr`; para usar outro, defina `JAVA_HOME_21`).

```bash
npm install
npm run apk        # gera badminton-training.apk na raiz
```

Instalar no celular conectado por USB (com depuração USB ativada):

```bash
~/Android/Sdk/platform-tools/adb install -r badminton-training.apk
```

Ou copie o `.apk` para o celular e abra (permita "instalar apps de fontes desconhecidas").

Depois de alterar qualquer arquivo em `web/`, rode `npm run apk` de novo. Para abrir no Android Studio: `npx cap open android`.

## Versão web (PWA)

Para publicar como site, suba a pasta `web/` em qualquer hospedagem estática com HTTPS. Ao adicionar ou renomear arquivos, atualize a lista `ASSETS` e a versão `CACHE` em `web/sw.js`.
