const baseUrl = import.meta.env.BASE_URL
const asset = (path) => `${baseUrl}${path.replace(/^\//, '')}`

export const projectsData = [
  {
    id: 1,
    name: 'Self-Payment Terminal',
    kind: 'produto',
    cover: asset('/assets/img/projects/p1.webp'),
    thumb: asset('/assets/img/projects/p1-sm.webp'),
    title: 'Self-Payment Terminal — Solução de Checkout Autônomo para Varejo',
    category: 'Enterprise | React + Docker',
    shortDesc: "Terminal de autoatendimento em produção na Livraria Leitura: 60–70% menos tempo no checkout.",
    heroDesc:
      "Filas longas no caixa afastavam clientes da Livraria Leitura. Desenvolvi um self-checkout seguro, implantável em várias lojas, com o branding de cada uma configurável sem rebuild.",

    overview: [
      "Sistema de ponto de venda em React, com várias telas, que funciona como checkout autônomo dentro do sistema de vendas da rede.",
      "A interface foi feita para kiosk touchscreen e bloqueia cinco formas de sair do fluxo: teclado, menu de contexto, arrastar e soltar, toque longo (com vibração de aviso) e seleção de texto. Todo evento de risco é interceptado com preventDefault e stopImmediatePropagation.",
      "Módulos: catálogo com busca e filtros, carrinho, pagamento (crédito, débito, PIX e dinheiro), confirmação com recibo digital, cancelamento com reembolso automático e painel administrativo com relatórios em tempo real e gestão de estoque.",
      "A infraestrutura roda em Docker Compose com três serviços: client React, NIC (camada de integração) e Nginx como gateway reverso. O backend integra as APIs fiscais NFC-e e NFS-e, MySQL e AWS S3.",
      "Projeto sob NDA e em produção: o código-fonte não é público.",
    ],

    challenges: [
      {
        title: 'Segurança em Kiosk Público',
        solution: "Criei os hooks useLongPressBlock e useKeyboardBlock e listeners que cancelam arrastar, seleção e menu de contexto. Um CSS injetado remove as respostas visuais nativas ao toque."
      },
      {
        title: 'Fullscreen Multiplataforma',
        solution: "O hook useFullscreenState unifica as variações da API de tela cheia (webkit, ms e padrão) e gerencia seus eventos entre navegadores."
      },
      {
        title: 'Configurabilidade em Runtime',
        solution: "O servidor Node injeta a configuração em window.__NERUSWEB_CONFIG__ ao servir o index.html. Logo e demais ajustes mudam no docker-compose.yml, sem rebuild."
      }
    ],

    results: [
      { metric: 'Redução de Tempo', value: '60-70%', desc: 'no checkout manual vs autônomo' },
      { metric: 'Portal para totem', value: 'Em uso hoje', desc: 'com impressão, bloqueio e testes de segurança, nas livrarias Leitura' },
      { metric: 'Customização', value: '0 rebuild', desc: 'necessário para mudanças de branding' },
      { metric: 'Escalabilidade', value: 'Multi-loja', desc: 'pronto para a rede de lojas' },
    ],

    tools: ['React', 'JavaScript', 'Node.js', 'Docker', 'Docker Compose', 'Nginx', 'MySQL', 'AWS S3', 'Material-UI', 'Git'],

    image: asset('/assets/svg/terminal.png'),

    status: 'Em Produção',
    client: 'Livraria Leitura',
    codeLink: '#',
    liveLink: '#',
    isPrivate: true,
    privateNote: "Código privado (NDA). Detalhes de arquitetura e trechos de código sob solicitação.",
  },
  {
    id: 2,
    name: 'Diagnóstico de Vendas',
    kind: 'web',
    cover: asset('/assets/img/projects/p2.webp'),
    thumb: asset('/assets/img/projects/p2-sm.webp'),
    title: ' Sistema de Diagnóstico Inteligente de Vendas',
    shortDesc: "Quiz que mede a maturidade comercial da empresa e aponta seus gargalos.",
    heroDesc:
      "Quiz desenvolvido para a Sense House: avalia a operação comercial da empresa e entrega um relatório com score de maturidade e plano de ação.",
    image: asset('/assets/svg/raioxcomercial.png'),
    overview: [
      "O questionário avalia posicionamento de mercado, reconhecimento de marca, geração de demanda, comunicação, estratégia de eventos, gargalos de crescimento e investimento em estruturação.",
      "São três etapas: cadastro da empresa com validação, quiz com feedback visual a cada resposta e relatório com score de maturidade, gap de crescimento e plano de ação. A interface segue a identidade visual da Sense House e é responsiva.",
    ],
    tools: ['React', 'Tailwind CSS', 'Shadcn/ui', 'Lucide Icons', 'JavaScript', 'Vite'],
    liveLink: 'https://diagnostico-vendas.vercel.app/',
    codeLink: 'https://github.com/octaviocrv/diagnostico-vendas',
  },
  {
    id: 7,
    name: 'AI Voice Receptionist',
    kind: 'ia',
    cover: asset('/assets/img/projects/p7.webp'),
    thumb: asset('/assets/img/projects/p7-sm.webp'),
    title: 'AI Voice Receptionist • Automação de Atendimento',
    shortDesc: "Atendente por voz com IA que atende ligações, qualifica leads e faz agendamentos para empresas de marketing.",

    heroDesc:
      "Recepcionista de voz com IA para empresas de marketing: atende a ligação, qualifica o lead e marca o agendamento, sem atendente humano no primeiro contato.",

    image: asset('/assets/jpeg/chatbot.jpg'),

    overview: [
      "O cliente liga para um número e é atendido por uma IA que entende, responde e conduz a conversa, reduzindo a necessidade de atendimento humano no primeiro contato.",
      "A VAPI converte voz em texto e texto em voz. As transcrições vão por webhook para um agente com modelos da OpenAI, que interpreta a intenção e decide a próxima ação. O n8n orquestra o fluxo e integra Google Calendar (agendamentos), SMS e banco de dados, em tempo real.",
      "Projeto sob NDA e em produção. Credenciais e integrações sensíveis impedem a publicação do código.",
    ],

    tools: [
      'n8n',
      'Node.js',
      'JavaScript',
      'OpenAI API',
      'VAPI (Voice AI)',
      'Google Calendar API',
      'Twilio',
      'PostgreSQL',
      'Nginx',
      'Python',
      'REST API',
      'Git',
      'GitHub'
    ],

    status: 'Em Produção',
    client: 'Confidencial (NDA)',
    liveLink: '#',
    codeLink: '#',
    isPrivate: true,
    privateNote: "Código privado (NDA): o projeto usa credenciais e integrações sensíveis.",
  },
  {
    id: 4,
    name: 'Quintal Voo Livre',
    kind: 'web',
    cover: asset('/assets/img/projects/p4.webp'),
    thumb: asset('/assets/img/projects/p4-sm.webp'),
    title: 'Quintal Voo Livre do Saber - Website Institucional',
    shortDesc: "Site institucional responsivo de uma escola infantil, feito para gerar agendamentos de visita.",
    heroDesc:
      "Site da escola infantil Quintal Voo Livre do Saber: apresenta serviços e valores e leva os pais a agendar uma visita.",
    image: asset('/assets/svg/quintal.png'),
    overview: [
      "Estrutura: abertura com chamada para ação, sobre a escola, serviços (cuidados, alimentação e diversão), depoimentos de pais e formulário de contato.",
      "Feito com HTML semântico, CSS e JavaScript puro: rolagem suave, menu responsivo mobile-first e chamadas para agendamento ao longo da página.",
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Git', 'GitHub Pages'],
    liveLink: 'https://octaviocrv.github.io/My-first-project---QuintalVooLivre/',
    codeLink: 'https://github.com/octaviocrv/My-first-project---QuintalVooLivre',
  },
  {
    id: 8,
    name: 'WhatsApp & IA · Planads',
    kind: 'ia',
    cover: asset('/assets/img/projects/p8.webp'),
    thumb: asset('/assets/img/projects/p8-sm.webp'),
    title: 'Automação WhatsApp & IA • Planads',
    shortDesc: "Fluxo no n8n que conversa com leads no WhatsApp via IA e os registra no Pipedrive.",

    heroDesc:
      "Para a Planads, conectei uma assistente de IA no WhatsApp ao funil do Pipedrive. Cada lead é qualificado em tempo real e registrado direto no CRM.",

    image: asset('/assets/jpeg/foto12.jpg'),

    overview: [
      "O fluxo intercepta as mensagens, identifica a intenção com IA e atualiza o Pipedrive. Inclui os fluxos “IA dispara WhatsApp” e as rotinas da assistente virtual.",
      "Por trás: webhooks, APIs REST, tratamento de payloads JSON e orquestração no n8n. O resultado é menos trabalho manual para a equipe comercial e atendimento mais rápido aos leads.",
    ],

    tools: ['n8n', 'Pipedrive CRM', 'WhatsApp API', 'Webhooks', 'REST API', 'JavaScript', 'JSON'],

    status: 'Em Produção',
    client: 'Planads',
    isPrivate: true,
    privateNote: "Sistema interno da Planads, com dados de leads e regras comerciais da agência."
  },
  {
    id: 3,
    name: 'Autocomplete ViaCEP',
    kind: 'web',
    cover: asset('/assets/img/projects/p3.webp'),
    thumb: asset('/assets/img/projects/p3-sm.webp'),
    title: 'Integração API ViaCEP - Autocompletar Endereços',
    shortDesc: "Preenche o endereço a partir do CEP, via API ViaCEP.",
    heroDesc:
      "Ao digitar o CEP, o formulário consulta a API ViaCEP e preenche rua, bairro, cidade e estado, evitando erros de digitação no cadastro.",
    image: asset('/assets/svg/cep.png'),
    overview: [
      "Com um CEP válido de 8 dígitos, a aplicação faz uma requisição assíncrona e preenche logradouro, bairro, cidade e estado.",
      "Em JavaScript puro com Fetch API: validação do CEP, tratamento de CEP inexistente e indicador de carregamento enquanto a resposta chega.",
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Fetch API', 'ViaCEP API', 'Git'],
    liveLink: 'https://octaviocrv.github.io/authcomplet-viacep/',
    codeLink: 'https://github.com/octaviocrv/authcomplet-viacep',
  },
  {
    id: 9,
    name: 'Funil Webinar V8',
    kind: 'ia',
    cover: asset('/assets/img/projects/p9.webp'),
    thumb: asset('/assets/img/projects/p9-sm.webp'),
    title: 'Funil de Vendas Webinar • V8',
    shortDesc: "Integrações no n8n que rastreiam a VSL, captam leads e processam vendas da Kiwify.",

    heroDesc:
      "Automação no n8n para o lançamento do Webinar V8: acompanha como cada pessoa assiste à VSL e atualiza o funil conforme compras e pagamentos aprovados.",

    image: asset('/assets/jpeg/foto13.jpg'),

    overview: [
      "Reúne três fluxos (Principal, VSL | Rastreio e Kiwify | Vendas). O sistema captura o engajamento durante o vídeo de vendas e, com os eventos de compra que chegam por webhook da Kiwify, atualiza o status de cada cliente.",
      "Inclui roteamento condicional, sincronização entre plataforma de pagamento e CRM, recuperação de carrinho e onboarding de novos clientes.",
    ],

    tools: ['n8n', 'Kiwify API', 'Webhooks', 'Integração de CRM', 'Lógica Condicional', 'Data Mapping'],

    status: 'Em Produção',
    client: 'Comercial V8',
    isPrivate: true,
    privateNote: "Automação privada, com regras de negócio confidenciais e integração direta com pagamentos."
  },
  {
    id: 6,
    name: 'Game Catalog',
    kind: 'web',
    cover: asset('/assets/img/projects/p6.webp'),
    thumb: asset('/assets/img/projects/p6-sm.webp'),
    title: 'Game Catalog • RAWG API',
    shortDesc: "Catálogo de jogos com busca, listagem e páginas de detalhe, alimentado pela API RAWG.",

    heroDesc:
      "Aplicação que consome a API pública RAWG para listar jogos, buscar títulos e mostrar detalhes como lançamento, avaliação e capa.",

    image: asset('/assets/jpeg/brasilgames.png'),

    overview: [
      "Lista jogos automaticamente, busca por título e abre uma página de detalhes para cada um, com data de lançamento, avaliação e imagem de capa.",
      "Envolve várias requisições assíncronas, tratamento dos dados retornados, renderização dinâmica do DOM e navegação por parâmetros de URL.",
    ],

    tools: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Fetch API', 'REST API', 'Git', 'GitHub'],

    liveLink: 'https://octaviocrv.github.io/game-catalog-rawg-api/',
    codeLink: 'https://github.com/octaviocrv/game-catalog-rawg-api',
  },
  {
    id: 10,
    name: 'Funil de Lançamento',
    kind: 'ia',
    cover: asset('/assets/img/projects/p10.webp'),
    thumb: asset('/assets/img/projects/p10-sm.webp'),
    title: 'Lançamento • Funil de Vendas Automatizado',
    shortDesc: "Funil de lançamento no n8n: rastreio da VSL, captação de leads e vendas pela Kiwify.",

    heroDesc:
      "Automação no n8n para o lançamento do Webinar V8: acompanha como cada pessoa assiste à VSL e atualiza o funil conforme compras e pagamentos aprovados.",

    image: asset('/assets/jpeg/PEIXE.png'),

    overview: [
      "Reúne três fluxos (Principal, VSL | Rastreio e Kiwify | Vendas). O sistema captura o engajamento durante o vídeo de vendas e, com os eventos de compra que chegam por webhook da Kiwify, atualiza o status de cada cliente.",
      "Inclui roteamento condicional, sincronização entre plataforma de pagamento e CRM, recuperação de carrinho e onboarding de novos clientes.",
    ],

    tools: ['n8n', 'Kiwify API', 'Webhooks', 'Integração de CRM', 'Lógica Condicional', 'Data Mapping'],

    liveLink: 'https://planads.com.br/implementacao/comercial-v8/',
  },
  {
    id: 5,
    name: 'Divide Já',
    kind: 'web',
    cover: asset('/assets/img/projects/p5.webp'),
    thumb: asset('/assets/img/projects/p5-sm.webp'),
    title: 'Divide Já • Divisão de Contas',
    shortDesc: "Divide a conta entre amigos item por item e mostra quanto cada um deve pagar.",

    heroDesc:
      "Crie uma mesa, adicione o que foi consumido e o app calcula a parte de cada participante. O projeto está em refatoração; a versão nova será publicada em breve.",

    image: asset('/assets/jpeg/divide-ja.png'),

    overview: [
      "Resolve um problema comum: dividir a conta de forma justa. Cada item consumido é ligado aos participantes, e o cálculo individual sai automático.",
      "O foco técnico está no estado: divisão parcial de itens, vários participantes e valores que se atualizam a cada mudança.",
    ],

    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'GitHub'],

    liveLink: 'https://octaviocrv.github.io/divide-ja/src/pages/login/index.html',
    codeLink: 'https://github.com/octaviocrv/divide-ja',
  },
  {
    id: 11,
    name: 'CRM Multi-Nicho',
    kind: 'ia',
    cover: asset('/assets/img/projects/p11.webp'),
    thumb: asset('/assets/img/projects/p11-sm.webp'),
    title: 'Arquitetura e Implementação de CRM • Multi-Nicho',
    shortDesc: "CRMs Pipedrive e Kommo implantados e automatizados para operações de venda.",

    heroDesc:
      "Implantei CRMs para agências de marketing, administradoras de consórcio e outras operações de venda: processo comercial estruturado, follow-up automático e captação integrada de vários canais.",

    image: asset('/assets/jpeg/CRM2.jpg'),

    overview: [
      "Começa no mapeamento do processo comercial e segue para a configuração no Pipedrive e no Kommo: funis por operação, campos customizados, motivos de perda e regras de mudança de etapa que mantêm os dados consistentes.",
      "Com n8n, webhooks e APIs REST, os leads chegam em tempo real, são distribuídos para corretores e vendedores, geram tarefas e ligações automaticamente e recebem mensagens transacionais.",
    ],

    tools: [
      'Pipedrive CRM',
      'Kommo',
      'n8n',
      'Webhooks',
      'REST API',
      'Mapeamento de Processos',
      'Automação de Vendas'
    ],

    status: 'Em Produção',
    client: 'Múltiplos Clientes (Marketing, Consórcios, etc.)',
    isPrivate: true,
    privateNote: "Infraestrutura restrita sob NDA: bases de leads, fluxos operacionais e estratégias comerciais de cada cliente.",
  }
]

export const kinds = {
  produto: 'Produto & Enterprise',
  web: 'Web & Front-end',
  ia: 'Automação & IA',
}

export const projectIndex = (project) => projectsData.findIndex((p) => p.id === project.id)
