/* =============================================================================
   content.js — identity, UI strings, metrics.
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
  { id: 'pt', label: 'Português', short: 'PT' },
  { id: 'zh', label: '中文（简体）', short: 'ZH' },
  { id: 'ja', label: '日本語', short: 'JA' }
];

SITE.meta = {
  name: 'Artem Baltser',
  email: 'abaltserdev@outlook.com',
  github: 'https://github.com/tfkfan',
  linkedin: 'https://www.linkedin.com/in/tfkfan',
  since: 2013,
  location: SITE.T(
    'London, United Kingdom',
    'Londres, Reino Unido',
    'London, Vereinigtes Königreich',
    'Londres, Royaume-Uni',
    'Londres, Reino Unido'
  ),
  remote: SITE.T(
    'Open to remote',
    'Abierto a trabajo remoto',
    'Offen für Remote',
    'Ouvert au télétravail',
    'Aberto a trabalho remoto'
  ),
  permit: SITE.T(
    'US, EU work permit',
    'Permiso de trabajo en EE. UU. y la UE',
    'US- und EU-Arbeitserlaubnis',
    'Permis de travail US et UE',
    'Permissão de trabalho nos EUA e na UE'
  ),
  typed: [
    SITE.T('Staff Backend Engineer', 'Ingeniero Backend Staff', 'Staff Backend Engineer', 'Ingénieur Backend Staff', 'Engenheiro Backend Staff'),
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
      'AI integrations · RAG · chat & voice bots',
      'Integraciones de IA · RAG · bots de chat y voz',
      'KI-Integrationen · RAG · Chat- & Voice-Bots',
      'Intégrations IA · RAG · bots chat et voix',
      'Integrações de IA · RAG · bots de chat e voz'
    )
  ],
  pitch: SITE.T(
    'I make AI integrations, RAG systems, chat/voice bots, realtime applications, high-load and event-driven microservices in Go and Java.',
    'Creo integraciones de IA, sistemas RAG, bots de chat y voz, aplicaciones en tiempo real y microservicios event-driven de alta carga en Go y Java.',
    'Ich baue KI-Integrationen, RAG-Systeme, Chat- und Voice-Bots, Echtzeitanwendungen sowie hochlastfähige, event-getriebene Microservices in Go und Java.',
    'Je crée des intégrations IA, des systèmes RAG, des bots chat et voix, des applications temps réel et des microservices événementiels à forte charge en Go et Java.',
    'Crio integrações de IA, sistemas RAG, bots de chat e voz, aplicações em tempo real e microsserviços orientados a eventos de alta carga em Go e Java.'
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
    'open to remote · US, EU work permit',
    'trabajo remoto · permiso EE. UU. y UE',
    'offen für Remote · US- und EU-Arbeitserlaubnis',
    'télétravail · permis US et UE',
    'trabalho remoto · permissão EUA e UE'
  ),
  scroll: SITE.T('scroll', 'desplazar', 'scrollen', 'défiler', 'role'),
  langLabel: SITE.T('Language', 'Idioma', 'Sprache', 'Langue', 'Idioma'),

  impactTitle: SITE.T(
    'Numbers I can defend.',
    'Cifras que puedo defender.',
    'Zahlen, für die ich geradestehe.',
    'Des chiffres que je peux défendre.',
    'Números que posso defender.'
  ),
  delivered: SITE.T('Delivered for', 'Proyectos para', 'Projekte für', 'Projets pour', 'Projetos para'),

  servicesTitle: SITE.T(
    'What I do for clients.',
    'Lo que hago para mis clientes.',
    'Was ich für Kunden mache.',
    'Ce que je fais pour mes clients.',
    'O que faço para os meus clientes.'
  ),
  servicesLead: SITE.T(
    'Five ways to plug me into a team. Open any row for the short version of what you get.',
    'Cinco formas de sumarme a un equipo. Abre cualquier fila para ver el resumen de lo que obtienes.',
    'Fünf Wege, mich in ein Team zu holen. Zeile öffnen für die Kurzfassung.',
    'Cinq façons de m’intégrer à une équipe. Ouvrez une ligne pour le résumé.',
    'Cinco formas de me integrar numa equipa. Abra qualquer linha para ver o resumo.'
  ),

  expTitle: SITE.T(
    'Thirteen years, in order.',
    'Trece años, en orden.',
    'Dreizehn Jahre, der Reihe nach.',
    'Treize ans, dans l’ordre.',
    'Treze anos, por ordem.'
  ),
  expLead: SITE.T(
    'Newest first. Open an entry for what actually changed.',
    'Lo más reciente primero. Abre una entrada para ver qué cambió realmente.',
    'Neueste zuerst. Eintrag öffnen für das, was sich wirklich geändert hat.',
    'Du plus récent au plus ancien. Ouvrez une entrée pour voir ce qui a changé.',
    'Mais recente primeiro. Abra uma entrada para ver o que mudou de facto.'
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

  workTitle: SITE.T(
    'Open source work.',
    'Trabajo open source.',
    'Open-Source-Arbeit.',
    'Travaux open source.',
    'Trabalho open source.'
  ),

  contactTitle: SITE.T(
    'Let’s talk about your system.',
    'Hablemos de tu sistema.',
    'Sprechen wir über Ihr System.',
    'Parlons de votre système.',
    'Vamos falar do seu sistema.'
  ),
  contactLead: SITE.T(
    'Tell me what it does today, what hurts (latency, throughput, cloud bill, a monolith that resists change) and what “done” looks like. I answer every enquiry personally, within one business day.',
    'Cuéntame qué hace hoy, qué duele (latencia, throughput, factura cloud, un monolito que no deja avanzar) y cómo sería “terminado”. Respondo personalmente en un día laborable.',
    'Erzählen Sie mir, was es heute tut, was weh tut (Latenz, Durchsatz, Cloud-Kosten, ein Monolith, der sich sträubt) und wie „fertig“ aussieht. Ich antworte persönlich innerhalb eines Werktags.',
    'Dites-moi ce qu’il fait aujourd’hui, ce qui fait mal (latence, débit, facture cloud, un monolithe qui résiste) et à quoi ressemble « terminé ». Je réponds personnellement en un jour ouvré.',
    'Diga-me o que faz hoje, o que dói (latência, throughput, fatura cloud, um monolito que não deixa avançar) e como é “concluído”. Respondo pessoalmente em um dia útil.'
  ),

  formName: SITE.T('your_name', 'tu_nombre', 'ihr_name', 'votre_nom', 'seu_nome'),
  formCompany: SITE.T('company', 'empresa', 'unternehmen', 'entreprise', 'empresa'),
  formEmail: SITE.T('your_email', 'tu_email', 'ihre_email', 'votre_email', 'seu_email'),
  formTopic: SITE.T('what_do_you_need', 'qué_necesitas', 'was_brauchen_sie', 'de_quoi_avez_vous_besoin', 'do_que_precisa'),
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
  aiBadge: SITE.T('made by AI', 'hecho con IA', 'mit KI erstellt', 'fait avec l’IA', 'feito com IA'),

  topics: [
    SITE.T('Senior/Staff engineer embedded in a team', 'Ingeniero senior/staff integrado en un equipo', 'Senior/Staff Engineer im Team', 'Ingénieur senior/staff intégré à une équipe', 'Engenheiro sênior/staff integrado numa equipa'),
    SITE.T('Architecture review or rescue', 'Revisión o rescate de arquitectura', 'Architektur-Review oder Rettung', 'Audit ou sauvetage d’architecture', 'Revisão ou resgate de arquitetura'),
    SITE.T('Kafka / streaming platform', 'Plataforma Kafka / streaming', 'Kafka-/Streaming-Plattform', 'Plateforme Kafka / streaming', 'Plataforma Kafka / streaming'),
    SITE.T('RAG / chat & voice bots', 'RAG / bots de chat y voz', 'RAG / Chat- & Voice-Bots', 'RAG / bots chat et voix', 'RAG / bots de chat e voz'),
    SITE.T('Agentic pipelines / AI integration', 'Pipelines agénticos / integración de IA', 'Agentische Pipelines / KI-Integration', 'Pipelines agentiques / intégration IA', 'Pipelines agênticos / integração de IA'),
    SITE.T('Performance or cloud-cost sprint', 'Sprint de rendimiento o coste cloud', 'Performance- oder Cloud-Cost-Sprint', 'Sprint performance ou coûts cloud', 'Sprint de performance ou custo cloud'),
    SITE.T('Real-time / game backend', 'Backend en tiempo real / juegos', 'Echtzeit-/Game-Backend', 'Backend temps réel / jeux', 'Backend em tempo real / jogos'),
    SITE.T('Something else', 'Otro asunto', 'Etwas anderes', 'Autre chose', 'Outro assunto')
  ],

  mailSubject: SITE.T(
    'Project enquiry — from artem portfolio',
    'Consulta de proyecto — desde el portfolio de Artem',
    'Projektanfrage — über Artems Portfolio',
    'Demande de projet — depuis le portfolio d’Artem',
    'Pedido de projeto — do portfólio do Artem'
  ),

  foot: SITE.T(
    'Built as a single page of vanilla JavaScript — no frameworks, no trackers. Full CV in PDF, or just send an email.',
    'Hecho como una sola página en JavaScript puro: sin frameworks ni rastreadores. CV completo en PDF, o simplemente escríbeme un email.',
    'Eine einzige Seite in reinem JavaScript — keine Frameworks, kein Tracking. Vollständiger Lebenslauf als PDF, oder schreiben Sie einfach eine E-Mail.',
    'Une seule page en JavaScript pur — sans framework ni traqueur. CV complet en PDF, ou écrivez-moi simplement un e-mail.',
    'Uma única página em JavaScript puro — sem frameworks nem rastreadores. CV completo em PDF, ou envie simplesmente um e-mail.'
  ),


  boot: [
    SITE.T('mount /home/artem/portfolio', 'montando /home/artem/portfolio', 'mounte /home/artem/portfolio', 'montage /home/artem/portfolio', 'montando /home/artem/portfolio'),
    SITE.T('load profile — staff backend engineer', 'cargando perfil — ingeniero backend staff', 'Profil laden — Staff Backend Engineer', 'chargement du profil — ingénieur backend staff', 'carregando perfil — engenheiro backend staff'),
    SITE.T('index 7 sections · 7 languages', 'indexando 7 secciones · 7 idiomas', 'indexiere 7 Abschnitte · 7 Sprachen', 'indexation de 7 sections · 7 langues', 'indexando 7 secções · 7 idiomas'),
    SITE.T('link metrics — 500K+ msg/s · 100K+ TPS · 10K RPS', 'conectando métricas — 500K+ msg/s · 100K+ TPS · 10K RPS', 'Metriken verbinden — 500K+ msg/s · 100K+ TPS · 10K RPS', 'connexion des métriques — 500K+ msg/s · 100K+ TPS · 10K RPS', 'ligando métricas — 500K+ msg/s · 100K+ TPS · 10K RPS'),
    SITE.T('ready. scroll to explore.', 'listo. desplázate para explorar.', 'bereit. Scrollen zum Erkunden.', 'prêt. faites défiler pour explorer.', 'pronto. role para explorar.')
  ]
};

/* -----------------------------------------------------------------------------
   Slide 2 — numbers
   -------------------------------------------------------------------------- */
SITE.numbers = [
  {
    v: 13, suffix: '+',
    label: SITE.T('years shipping production systems', 'años entregando sistemas en producción', 'Jahre in der Produktion', 'années de systèmes en production', 'anos a entregar sistemas em produção'),
    sub: SITE.T('since 2013', 'desde 2013', 'seit 2013', 'depuis 2013', 'desde 2013')
  },
  {
    v: 500, suffix: 'K+',
    label: SITE.T('messages per second on Kafka + Flink', 'mensajes por segundo en Kafka + Flink', 'Nachrichten pro Sekunde mit Kafka + Flink', 'messages par seconde sur Kafka + Flink', 'mensagens por segundo em Kafka + Flink'),
    sub: 'Delivery Hero'
  },
  {
    v: 100, suffix: 'K+',
    label: SITE.T('TPS in a credit-processing core', 'TPS en un core de procesamiento de crédito', 'TPS in einem Kredit-Kernsystem', 'TPS dans un cœur de traitement de crédit', 'TPS num core de processamento de crédito'),
    sub: 'N26'
  },
  {
    v: 40, suffix: '%+',
    label: SITE.T('cloud cost reduction', 'reducción del coste cloud', 'Reduktion der Cloud-Kosten', 'réduction des coûts cloud', 'redução do custo cloud'),
    sub: SITE.T('≈ $500K / year · GitLab', '≈ 500 mil $ / año · GitLab', '≈ 500.000 $ / Jahr · GitLab', '≈ 500 K$ / an · GitLab', '≈ 500 mil $ / ano · GitLab')
  },
  {
    v: 20, suffix: '+',
    label: SITE.T('Go microservices carved from a monolith', 'microservicios Go extraídos de un monolito', 'Go-Microservices aus einem Monolithen', 'microservices Go extraits d’un monolithe', 'microsserviços Go extraídos de um monolito'),
    sub: 'GitLab'
  },
  {
    v: 10, suffix: 'K RPS',
    label: SITE.T('payments services under real load', 'servicios de pago bajo carga real', 'Zahlungsdienste unter realer Last', 'services de paiement en charge réelle', 'serviços de pagamento sob carga real'),
    sub: 'Bling'
  },
  {
    v: 50, suffix: '+',
    label: SITE.T('engineering hours saved per month', 'horas de ingeniería ahorradas al mes', 'eingesparte Ingenieursstunden pro Monat', 'heures d’ingénierie économisées par mois', 'horas de engenharia poupadas por mês'),
    sub: SITE.T('LLM + RAG · Factorial', 'LLM + RAG · Factorial', 'LLM + RAG · Factorial', 'LLM + RAG · Factorial', 'LLM + RAG · Factorial')
  },
  {
    v: 15, suffix: '+',
    label: SITE.T('engineers grown in a platform group', 'ingenieros formados en un grupo de plataforma', 'Engineers in einer Plattformgruppe aufgebaut', 'ingénieurs formés dans un groupe plateforme', 'engenheiros formados num grupo de plataforma'),
    sub: SITE.T('from 5 · GitLab', 'desde 5 · GitLab', 'von 5 aufwärts · GitLab', 'à partir de 5 · GitLab', 'a partir de 5 · GitLab')
  }
];

SITE.delivered = ['GitLab', 'Siemens', 'N26', 'Delivery Hero', 'Factorial', 'Bling', 'UseTech'];
