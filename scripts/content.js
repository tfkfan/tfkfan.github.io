/* =============================================================================
   content.js — identity and UI strings.
   Five languages: en · es · de · fr · pt.  T(en, es, de, fr, pt) builds one string.
   Source: CV_EN_Golang_V2.pdf (Oct 2026).
   ========================================================================== */

window.SITE = window.SITE || {};

SITE.T = function (en, es, de, fr, pt) { return { en: en, es: es, de: de, fr: fr, pt: pt }; };

SITE.langs = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'es', label: 'Español', short: 'ES' },
  { id: 'de', label: 'Deutsch', short: 'DE' },
  { id: 'fr', label: 'Français', short: 'FR' },
  { id: 'pt', label: 'Português', short: 'PT' }
];

SITE.meta = {
  name: 'Artem Baltser',
  email: 'abaltserdev@gmail.com',
  github: 'https://github.com/tfkfan',
  linkedin: 'https://www.linkedin.com/in/tfkfan',
  cv: 'assets/Artem-Baltser-CV.pdf',
  since: 2013,
  typed: [
    SITE.T('Backend Engineer', 'Ingeniero Backend', 'Backend Engineer', 'Ingénieur Backend', 'Engenheiro Backend'),
    SITE.T(
      'Go (Golang) · Java · Distributed Systems',
      'Go (Golang) · Java · Sistemas distribuidos',
      'Go (Golang) · Java · Verteilte Systeme',
      'Go (Golang) · Java · Systèmes distribués',
      'Go (Golang) · Java · Sistemas distribuídos'
    ),
    SITE.T(
      'Kafka · Flink · Event-driven architecture',
      'Kafka · Flink · Arquitectura orientada a eventos',
      'Kafka · Flink · Event-Driven-Architektur',
      'Kafka · Flink · Architecture événementielle',
      'Kafka · Flink · Arquitetura orientada a eventos'
    ),
    SITE.T(
      'High-load fintech · real-time backends',
      'Fintech de alta carga · backends en tiempo real',
      'High-Load-Fintech · Echtzeit-Backends',
      'Fintech à forte charge · backends temps réel',
      'Fintech de alta carga · backends em tempo real'
    ),
    SITE.T(
      'Agentic pipelines · LLM & RAG integration',
      'Pipelines agénticos · integración LLM y RAG',
      'Agentische Pipelines · LLM- & RAG-Integration',
      'Pipelines agentiques · intégration LLM et RAG',
      'Pipelines agênticos · integração LLM e RAG'
    )
  ],
  pitch: SITE.T(
    'Backend, platform engineer. AI engineer. AI artist.',
    'Ingeniero backend y de plataforma. Ingeniero de IA. Artista de IA.',
    'Backend- und Plattform-Engineer. KI-Engineer. KI-Künstler.',
    'Ingénieur backend et plateforme. Ingénieur IA. Artiste IA.',
    'Engenheiro backend e de plataforma. Engenheiro de IA. Artista de IA.'
  ),
  facts: SITE.T(
    '13+ years in production · fintech, cloud platforms, real-time streaming · delivered for GitLab, Siemens, N26, Delivery Hero, Factorial.',
    'Más de 13 años en producción · fintech, plataformas cloud, streaming en tiempo real · proyectos para GitLab, Siemens, N26, Delivery Hero y Factorial.',
    '13+ Jahre in Produktion · Fintech, Cloud-Plattformen, Echtzeit-Streaming · Projekte für GitLab, Siemens, N26, Delivery Hero, Factorial.',
    'Plus de 13 ans en production · fintech, plateformes cloud, streaming temps réel · projets pour GitLab, Siemens, N26, Delivery Hero, Factorial.',
    'Mais de 13 anos em produção · fintech, plataformas cloud, streaming em tempo real · projetos para GitLab, Siemens, N26, Delivery Hero e Factorial.'
  )
};

/* -----------------------------------------------------------------------------
   UI strings
   -------------------------------------------------------------------------- */
SITE.ui = {
  avail: SITE.T(
    'open to contracts and orders',
    'abierto a contratos y encargos',
    'offen für Verträge und Aufträge',
    'ouvert aux contrats et commandes',
    'aberto a contratos e encomendas'
  ),
  scroll: SITE.T('scroll', 'desplazar', 'scrollen', 'défiler', 'role'),
  langLabel: SITE.T('Language', 'Idioma', 'Sprache', 'Langue', 'Idioma'),

  servicesTitle: SITE.T(
    'My services and expertise',
    'Mis servicios y experiencia',
    'Meine Leistungen und Expertise',
    'Mes services et mon expertise',
    'Os meus serviços e competências'
  ),
  servicesLead: SITE.T(
    'Five ways to plug me into a team. Open any row for the short version of what you get.',
    'Cinco formas de sumarme a un equipo. Abre cualquier fila para ver el resumen de lo que obtienes.',
    'Fünf Wege, mich in ein Team zu holen. Zeile öffnen für die Kurzfassung.',
    'Cinq façons de m’intégrer à une équipe. Ouvrez une ligne pour le résumé.',
    'Cinco formas de me integrar numa equipa. Abra qualquer linha para ver o resumo.'
  ),

  skillsTitle: SITE.T(
    'Stack, with receipts.',
    'Stack, con pruebas.',
    'Stack, mit Belegen.',
    'Stack, preuves à l’appui.',
    'Stack, com provas.'
  ),
  skillsFilter: SITE.T('filter the stack', 'filtrar el stack', 'Stack filtern', 'filtrer le stack', 'filtrar o stack'),
  skillNote: SITE.T('shown where it shipped', 'mostrado donde se aplicó', 'gezeigt, wo es lief', 'affiché là où il a servi', 'mostrado onde foi aplicado'),

  portfolioTitle: SITE.T(
    'Portfolio.',
    'Portafolio.',
    'Portfolio.',
    'Portfolio.',
    'Portfólio.'
  ),

  contactTitle: SITE.T(
    'Let’s talk about your system.',
    'Hablemos de tu sistema.',
    'Sprechen wir über Ihr System.',
    'Parlons de votre système.',
    'Vamos falar do seu sistema.'
  ),

  formEmail: SITE.T('your_email', 'tu_email', 'ihre_email', 'votre_email', 'seu_email'),
  formMsg: SITE.T('brief', 'resumen', 'kurzbeschreibung', 'brief', 'resumo'),
  formSend: SITE.T('send email', 'enviar email', 'E-Mail senden', 'envoyer l’e-mail', 'enviar e-mail'),
  formCopy: SITE.T('copy as text', 'copiar como texto', 'als Text kopieren', 'copier en texte', 'copiar como texto'),
  formHint: SITE.T(
    'No backend, no tracking — this just builds an email.',
    'Sin backend ni seguimiento: esto solo redacta un email.',
    'Kein Backend, kein Tracking — das baut nur eine E-Mail.',
    'Pas de backend, pas de tracking — ceci rédige juste un e-mail.',
    'Sem backend e sem tracking — isto apenas redige um e-mail.'
  ),

  sendEmail: SITE.T('send email', 'enviar email', 'E-Mail senden', 'envoyer l’e-mail', 'enviar e-mail'),
  copied: SITE.T('Copied to clipboard', 'Copiado al portapapeles', 'In die Zwischenablage kopiert', 'Copié dans le presse-papiers', 'Copiado para a área de transferência'),
  copyFailed: SITE.T('Copy failed — select it manually', 'No se pudo copiar: selecciónalo manualmente', 'Kopieren fehlgeschlagen — bitte manuell markieren', 'Copie impossible — sélectionnez manuellement', 'Falha ao copiar — selecione manualmente'),
  downloadCv: SITE.T('download CV (PDF)', 'descargar CV (PDF)', 'CV herunterladen (PDF)', 'télécharger le CV (PDF)', 'baixar CV (PDF)'),
  more: SITE.T('what you get', 'lo que obtienes', 'was Sie bekommen', 'ce que vous obtenez', 'o que recebe'),


  mailSubject: SITE.T(
    'Project enquiry — from artem portfolio',
    'Consulta de proyecto — desde el portfolio de Artem',
    'Projektanfrage — über Artems Portfolio',
    'Demande de projet — depuis le portfolio d’Artem',
    'Pedido de projeto — do portfólio do Artem'
  ),

  foot: SITE.T(
    'Built as a single page of vanilla JavaScript — no frameworks, no trackers. AI generated',
    'Hecho como una sola página en JavaScript puro: sin frameworks ni rastreadores. Generado con IA',
    'Eine einzige Seite in reinem JavaScript — keine Frameworks, kein Tracking. KI-generiert',
    'Une seule page en JavaScript pur — sans framework ni traqueur. Généré par IA',
    'Uma única página em JavaScript puro — sem frameworks nem rastreadores. Gerado por IA'
  ),


  boot: [
    SITE.T('mount /home/artem/portfolio', 'montando /home/artem/portfolio', 'mounte /home/artem/portfolio', 'montage /home/artem/portfolio', 'montando /home/artem/portfolio'),
    SITE.T('load profile — backend engineer', 'cargando perfil — ingeniero backend', 'Profil laden — Backend Engineer', 'chargement du profil — ingénieur backend', 'carregando perfil — engenheiro backend'),
    SITE.T('index 5 sections · 5 languages', 'indexando 5 secciones · 5 idiomas', 'indexiere 5 Abschnitte · 5 Sprachen', 'indexation de 5 sections · 5 langues', 'indexando 5 secções · 5 idiomas'),
    SITE.T('link metrics — 100K+ msg/s · 50K+ TPS', 'conectando métricas — 100K+ msg/s · 50K+ TPS', 'Metriken verbinden — 100K+ msg/s · 50K+ TPS', 'connexion des métriques — 100K+ msg/s · 50K+ TPS', 'ligando métricas — 100K+ msg/s · 50K+ TPS'),
    SITE.T('ready. scroll to explore.', 'listo. desplázate para explorar.', 'bereit. Scrollen zum Erkunden.', 'prêt. faites défiler pour explorer.', 'pronto. role para explorar.')
  ]
};
