/* =============================================================================
   content-rest.js — stack, open-source work, writing, recognition.
   T(en, es, de, fr, pt)
   ========================================================================== */

(function () {
  var T = SITE.T;

  SITE.skills = [
    {
      key: 'languages',
      label: T('languages', 'lenguajes', 'Sprachen', 'langages', 'linguagens'),
      items: [
        { n: 'Go (Golang)', where: T('Primary since 2019 — services, gateways, stream processors at GitLab, Delivery Hero, Bling, Siemens.',
          'Principal desde 2019: servicios, gateways y procesadores de stream en GitLab, Delivery Hero, Bling y Siemens.',
          'Hauptsprache seit 2019 — Services, Gateways, Stream-Prozessoren bei GitLab, Delivery Hero, Bling, Siemens.',
          'Langage principal depuis 2019 — services, gateways, processeurs de flux chez GitLab, Delivery Hero, Bling, Siemens.',
          'Principal desde 2019 — serviços, gateways e processadores de stream na GitLab, Delivery Hero, Bling e Siemens.') },
        { n: 'Java', where: T('13 years — Kafka Streams, Flink, Spark, Spring, Vert.x, Netty; N26 credit core and Orbital.',
          '13 años: Kafka Streams, Flink, Spark, Spring, Vert.x, Netty; core de crédito de N26 y Orbital.',
          '13 Jahre — Kafka Streams, Flink, Spark, Spring, Vert.x, Netty; N26-Kreditkern und Orbital.',
          '13 ans — Kafka Streams, Flink, Spark, Spring, Vert.x, Netty ; cœur crédit N26 et Orbital.',
          '13 anos — Kafka Streams, Flink, Spark, Spring, Vert.x, Netty; core de crédito da N26 e Orbital.') },
        { n: 'Python', where: T('Data plumbing and the ML side of the LLM/RAG toolkit at Factorial.',
          'Integración de datos y la parte ML del toolkit LLM/RAG en Factorial.',
          'Datenverarbeitung und die ML-Seite des LLM/RAG-Toolkits bei Factorial.',
          'Plomberie de données et partie ML de la boîte à outils LLM/RAG chez Factorial.',
          'Integração de dados e a parte de ML do toolkit LLM/RAG na Factorial.') },
        { n: 'TypeScript / JS', where: T('React and Phaser 3 front ends, Node.js tooling.',
          'Front ends en React y Phaser 3, herramientas en Node.js.',
          'React- und Phaser-3-Frontends, Node.js-Tooling.',
          'Front ends React et Phaser 3, outillage Node.js.',
          'Front ends em React e Phaser 3, ferramentas em Node.js.') },
        { n: 'SQL', where: T('PostgreSQL, ClickHouse, Greenplum, MSSQL — 13 years of it.',
          'PostgreSQL, ClickHouse, Greenplum, MSSQL: 13 años con ello.',
          'PostgreSQL, ClickHouse, Greenplum, MSSQL — 13 Jahre Erfahrung.',
          'PostgreSQL, ClickHouse, Greenplum, MSSQL — 13 ans de pratique.',
          'PostgreSQL, ClickHouse, Greenplum, MSSQL — 13 anos com isso.') }
      ]
    },
    {
      key: 'architecture',
      label: T('architecture', 'arquitectura', 'Architektur', 'architecture', 'arquitetura'),
      items: [
        { n: 'Event-driven architecture', where: T('Outbox, CDC, exactly-once, replayable topics, idempotent consumers.',
          'Outbox, CDC, exactly-once, topics reproducibles y consumidores idempotentes.',
          'Outbox, CDC, Exactly-once, wiederspielbare Topics, idempotente Consumer.',
          'Outbox, CDC, exactly-once, topics rejouables, consommateurs idempotents.',
          'Outbox, CDC, exactly-once, tópicos reproduzíveis e consumidores idempotentes.') },
        { n: 'Microservices', where: T('20+ Go services extracted from a monolith at GitLab.',
          'Más de 20 servicios Go extraídos de un monolito en GitLab.',
          '20+ Go-Services aus einem Monolithen bei GitLab herausgelöst.',
          '20+ services Go extraits d’un monolithe chez GitLab.',
          'Mais de 20 serviços Go extraídos de um monolito na GitLab.') },
        { n: 'Saga & eventual consistency', where: T('Async transaction saga engine for a 100K+ TPS credit core at N26.',
          'Motor de sagas transaccional asíncrono para un core de crédito de 100K+ TPS en N26.',
          'Asynchrone Saga-Engine für ein Kredit-Kernsystem mit 100K+ TPS bei N26.',
          'Moteur de sagas asynchrone pour un cœur crédit à 100K+ TPS chez N26.',
          'Motor de sagas assíncrono para um core de crédito de 100K+ TPS na N26.') },
        { n: 'CDC (Debezium)', where: T('Kafka data federation across product domains at Factorial.',
          'Federación de datos con Kafka entre dominios de producto en Factorial.',
          'Kafka-Datenföderation über Produktdomänen bei Factorial.',
          'Fédération de données Kafka entre domaines produit chez Factorial.',
          'Federação de dados com Kafka entre domínios de produto na Factorial.') },
        { n: 'gRPC & REST', where: T('Contract-first APIs with versioning and generated clients.',
          'APIs contract-first con versionado y clientes generados.',
          'Contract-first-APIs mit Versionierung und generierten Clients.',
          'API contract-first avec versionnage et clients générés.',
          'APIs contract-first com versionamento e clientes gerados.') }
      ]
    },
    {
      key: 'streaming',
      label: T('streaming & data', 'streaming y datos', 'Streaming & Daten', 'streaming et données', 'streaming e dados'),
      items: [
        { n: 'Apache Kafka', where: T('10 years: producers, Streams, Connect, schema registry, partition strategy.',
          '10 años: productores, Streams, Connect, schema registry y estrategia de particiones.',
          '10 Jahre: Producer, Streams, Connect, Schema Registry, Partitionsstrategie.',
          '10 ans : producers, Streams, Connect, schema registry, stratégie de partitions.',
          '10 anos: producers, Streams, Connect, schema registry e estratégia de partições.') },
        { n: 'Apache Flink', where: T('Stateful jobs at 500K+ msg/sec with checkpointing and back-pressure control.',
          'Jobs con estado a 500K+ msg/s con checkpointing y control de back-pressure.',
          'Stateful Jobs mit 500K+ Nachrichten/s, Checkpointing und Back-Pressure-Kontrolle.',
          'Jobs stateful à 500K+ msg/s avec checkpointing et contrôle du back-pressure.',
          'Jobs com estado a 500K+ msg/s com checkpointing e controlo de back-pressure.') },
        { n: 'Apache Spark', where: T('Batch and big-data integration in Java for the SiePA platform.',
          'Integración batch y big data en Java para la plataforma SiePA.',
          'Batch- und Big-Data-Integration in Java für die SiePA-Plattform.',
          'Intégration batch et big data en Java pour la plateforme SiePA.',
          'Integração batch e big data em Java para a plataforma SiePA.') },
        { n: 'MQTT', where: T('20K+ messages/sec of industrial telemetry at Siemens.',
          'Más de 20K mensajes/s de telemetría industrial en Siemens.',
          '20K+ Nachrichten/s industrielle Telemetrie bei Siemens.',
          '20K+ messages/s de télémétrie industrielle chez Siemens.',
          'Mais de 20K mensagens/s de telemetria industrial na Siemens.') },
        { n: 'ClickHouse', where: T('OLAP for analytics without loading production OLTP.',
          'OLAP para analítica sin cargar el OLTP de producción.',
          'OLAP für Analytik, ohne das produktive OLTP zu belasten.',
          'OLAP pour l’analytique sans charger l’OLTP de production.',
          'OLAP para analítica sem carregar o OLTP de produção.') },
        { n: 'PostgreSQL · MongoDB · Redis · DynamoDB', where: T('OLTP for money, Redis for hot paths and locks, document stores where they fit.',
          'OLTP para dinero, Redis para rutas críticas y bloqueos, documentales donde encajan.',
          'OLTP für Geld, Redis für Hot Paths und Locks, Dokumenten-DBs wo sie passen.',
          'OLTP pour l’argent, Redis pour les chemins critiques et les verrous, documentaires là où c’est pertinent.',
          'OLTP para dinheiro, Redis para caminhos críticos e locks, documentais onde fazem sentido.') }
      ]
    },
    {
      key: 'cloud',
      label: T('cloud & platform', 'cloud y plataforma', 'Cloud & Plattform', 'cloud et plateforme', 'cloud e plataforma'),
      items: [
        { n: 'Kubernetes', where: T('Deployments, autoscaling, rightsizing — the main lever behind the 40% cut.',
          'Despliegues, autoscaling y rightsizing: la palanca principal del recorte del 40%.',
          'Deployments, Autoscaling, Rightsizing — der Haupthebel für die 40 % Einsparung.',
          'Déploiements, autoscaling, rightsizing — le principal levier des −40 %.',
          'Deployments, autoscaling e rightsizing — a principal alavanca dos −40%.') },
        { n: 'Terraform · Helm · Ansible', where: T('Infrastructure as code, reviewable and reproducible.',
          'Infraestructura como código, revisable y reproducible.',
          'Infrastructure as Code, reviewbar und reproduzierbar.',
          'Infrastructure as code, révisable et reproductible.',
          'Infraestrutura como código, revisível e reproduzível.') },
        { n: 'ArgoCD · GitLab CI', where: T('GitOps delivery with progressive rollout and instant rollback.',
          'Entrega GitOps con despliegue progresivo y rollback instantáneo.',
          'GitOps-Auslieferung mit progressivem Rollout und sofortigem Rollback.',
          'Livraison GitOps avec déploiement progressif et rollback instantané.',
          'Entrega GitOps com rollout progressivo e rollback instantâneo.') },
        { n: 'AWS · GCP', where: T('Managed streaming, storage and compute with cost-aware design.',
          'Streaming, almacenamiento y cómputo gestionados con diseño consciente del coste.',
          'Managed Streaming, Storage und Compute mit kostenbewusstem Design.',
          'Streaming, stockage et calcul managés avec un design soucieux des coûts.',
          'Streaming, armazenamento e computação geridos com desenho atento ao custo.') },
        { n: 'OpenTelemetry', where: T('Traces, metrics and OTLP pipelines for services and stream processors.',
          'Trazas, métricas y pipelines OTLP para servicios y procesadores de stream.',
          'Traces, Metriken und OTLP-Pipelines für Services und Stream-Prozessoren.',
          'Traces, métriques et pipelines OTLP pour services et processeurs de flux.',
          'Traces, métricas e pipelines OTLP para serviços e processadores de stream.') },
        { n: 'Istio · Prometheus · Grafana', where: T('Service mesh policy and SLO-driven observability.',
          'Políticas de service mesh y observabilidad guiada por SLO.',
          'Service-Mesh-Policy und SLO-getriebene Observability.',
          'Politiques de service mesh et observabilité pilotée par les SLO.',
          'Políticas de service mesh e observabilidade guiada por SLO.') }
      ]
    },
    {
      key: 'ai',
      label: T('ai & agents', 'IA y agentes', 'KI & Agenten', 'IA et agents', 'IA e agentes'),
      items: [
        { n: 'Agentic pipelines', where: T('Tool-using agents chained with retrieval and guardrails, wired into engineering workflows.',
          'Agentes que usan herramientas, encadenados con retrieval y guardrails, integrados en los flujos de ingeniería.',
          'Tool-nutzende Agenten, verkettet mit Retrieval und Guardrails, integriert in Engineering-Workflows.',
          'Agents utilisant des outils, chaînés avec retrieval et garde-fous, intégrés aux workflows d’ingénierie.',
          'Agentes que usam ferramentas, encadeados com retrieval e guardrails, integrados nos fluxos de engenharia.') },
        { n: 'Claude', where: T('Anthropic Claude driving agentic workflows and code/performance review automation.',
          'Anthropic Claude para flujos agénticos y automatización de revisión de código y rendimiento.',
          'Anthropic Claude für agentische Workflows und automatisierte Code-/Performance-Reviews.',
          'Anthropic Claude pour les workflows agentiques et l’automatisation des revues de code et de performance.',
          'Anthropic Claude para fluxos agênticos e automação de revisão de código e performance.') },
        { n: 'Harness', where: T('Agent harnesses: tool-calling loops, guardrails and evaluation wired into delivery.',
          'Harnesses de agentes: bucles de tool-calling, guardrails y evaluación integrados en la entrega.',
          'Agent-Harnesses: Tool-Calling-Loops, Guardrails und Evaluation im Delivery-Prozess.',
          'Harnais d’agents : boucles de tool-calling, garde-fous et évaluation intégrés à la livraison.',
          'Harnesses de agentes: ciclos de tool-calling, guardrails e avaliação integrados na entrega.') },
        { n: 'Agent Skills', where: T('Packaged, reusable agent skills — SKILL.md definitions and tool schemas.',
          'Skills de agente empaquetadas y reutilizables: definiciones SKILL.md y esquemas de herramientas.',
          'Gepackte, wiederverwendbare Agent-Skills — SKILL.md-Definitionen und Tool-Schemas.',
          'Skills d’agent packagés et réutilisables — définitions SKILL.md et schémas d’outils.',
          'Skills de agente empacotadas e reutilizáveis — definições SKILL.md e esquemas de ferramentas.') },
        { n: 'Ollama', where: T('Local model serving for private, offline-capable AI tooling.',
          'Servido local de modelos para herramientas de IA privadas y sin conexión.',
          'Lokales Model-Serving für private, offline-fähige KI-Tools.',
          'Service de modèles en local pour des outils IA privés et hors ligne.',
          'Serviço local de modelos para ferramentas de IA privadas e offline.') },
        { n: 'LLM integration', where: T('Review toolkit wired into the engineering workflow at Factorial.',
          'Toolkit de revisión integrado en el flujo de ingeniería en Factorial.',
          'Review-Toolkit, integriert in den Engineering-Workflow bei Factorial.',
          'Boîte à outils de revue intégrée au workflow d’ingénierie chez Factorial.',
          'Toolkit de revisão integrado no fluxo de engenharia na Factorial.') },
        { n: 'RAG', where: T('Retrieval over code and review history to ground model output.',
          'Retrieval sobre código e historial de revisión para fundamentar la salida del modelo.',
          'Retrieval über Code und Review-Historie, um Modellausgaben zu belegen.',
          'Retrieval sur le code et l’historique de revue pour ancrer les réponses du modèle.',
          'Retrieval sobre código e histórico de revisão para fundamentar a saída do modelo.') },
        { n: 'Qdrant · Weaviate', where: T('Embedding storage and hybrid search for code.',
          'Almacenamiento de embeddings y búsqueda híbrida para código.',
          'Embedding-Speicherung und hybride Suche für Code.',
          'Stockage d’embeddings et recherche hybride pour le code.',
          'Armazenamento de embeddings e pesquisa híbrida para código.') }
      ]
    },
    {
      key: 'realtime',
      label: T('real-time', 'tiempo real', 'Echtzeit', 'temps réel', 'tempo real'),
      items: [
        { n: 'WebSocket', where: T('Authoritative real-time sessions in Orbital and industrial telemetry.',
          'Sesiones en tiempo real autoritativas en Orbital y telemetría industrial.',
          'Autoritative Echtzeit-Sessions in Orbital und industrielle Telemetrie.',
          'Sessions temps réel autoritaires dans Orbital et télémétrie industrielle.',
          'Sessões em tempo real autoritativas no Orbital e telemetria industrial.') },
        { n: 'Vert.x · Netty', where: T('Non-blocking I/O cores for game and financial workloads.',
          'Núcleos de I/O no bloqueante para cargas de juego y financieras.',
          'Nicht-blockierende I/O-Kerne für Game- und Finanzlasten.',
          'Cœurs d’I/O non bloquants pour charges de jeu et financières.',
          'Núcleos de I/O não bloqueante para cargas de jogo e financeiras.') },
        { n: 'Low-latency design', where: T('Allocation discipline, lock-free structures, cache-aware layout.',
          'Disciplina de asignación, estructuras lock-free y disposición cache-aware.',
          'Allokationsdisziplin, lock-freie Strukturen, cache-bewusstes Layout.',
          'Discipline d’allocation, structures sans verrou, agencement cache-aware.',
          'Disciplina de alocação, estruturas sem locks e disposição cache-aware.') }
      ]
    }
  ];

  SITE.toolboxLabel = T('also in the toolbox', 'también en la caja de herramientas', 'außerdem im Werkzeugkasten', 'aussi dans la boîte à outils', 'também na caixa de ferramentas');

  SITE.toolbox = ['Docker', 'RabbitMQ', 'Protobuf', 'Avro', 'AsyncAPI', 'OpenAPI', 'OIDC / OAuth2', 'Infinispan', 'Hazelcast', 'ElasticSearch', 'Lucene / JTS', 'GraalVM', 'Quarkus', 'Micronaut', 'Spring', 'React', 'Phaser 3', 'Camunda', 'BPMN', 'C4', 'Linux'];

  /* ---------------------------------------------------------------------------
     Open source, writing, recognition
     ------------------------------------------------------------------------ */
  SITE.work = [
    {
      title: 'Orbital',
      desc: T('Open-source real-time game server framework: rooms, matchmaking, spatial indices and monitoring for low-latency 2D/3D multiplayer in Java.',
        'Framework open source de servidores de juego en tiempo real: salas, matchmaking, índices espaciales y monitorización para multijugador 2D/3D de baja latencia en Java.',
        'Open-Source-Echtzeit-Game-Server-Framework: Räume, Matchmaking, räumliche Indizes und Monitoring für latenzarmes 2D/3D-Multiplayer in Java.',
        'Framework open source de serveurs de jeu temps réel : salles, matchmaking, index spatiaux et monitoring pour du multijoueur 2D/3D à faible latence en Java.',
        'Framework open source de servidores de jogos em tempo real: salas, matchmaking, índices espaciais e monitorização para multijogador 2D/3D de baixa latência em Java.'),
      meta: 'Java · Vert.x · Netty · WebSocket · MIT',
      img: null,
      links: [
        { t: 'GitHub', href: 'https://github.com/tfkfan/orbital' },
        { t: T('Docs', 'Documentación', 'Doku', 'Documentation', 'Documentação'), href: 'https://tfkfan.github.io/orbital' }
      ]
    },
    {
      title: 'Tanks',
      desc: T('A playable multiplayer browser game built on Orbital: authoritative server, client prediction, matchmaking under real network conditions.',
        'Un juego de navegador multijugador jugable construido sobre Orbital: servidor autoritativo, predicción en cliente y matchmaking en condiciones de red reales.',
        'Ein spielbares Multiplayer-Browsergame auf Orbital: autoritativer Server, Client-Prediction, Matchmaking unter realen Netzwerkbedingungen.',
        'Un jeu navigateur multijoueur jouable construit sur Orbital : serveur autoritaire, prédiction client, matchmaking en conditions réseau réelles.',
        'Um jogo de navegador multijogador jogável construído sobre o Orbital: servidor autoritativo, predição no cliente e matchmaking em condições de rede reais.'),
      meta: 'TypeScript · Phaser 3 · Java · Vert.X · Orbital · WebSocket',
      img: 'assets/preview-tanks-1.webp',
      links: []
    }
  ];

})();
