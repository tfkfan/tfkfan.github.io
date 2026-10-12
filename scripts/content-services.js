/* =============================================================================
   content-services.js — the five services.
   T(en, es, de, fr, pt)
   ========================================================================== */

(function () {
  var T = SITE.T;

  SITE.services = [
    {
      n: '01',
      title: T('Go backend engineering', 'Backend en Go', 'Go-Backend-Entwicklung', 'Backend en Go', 'Backend em Go'),
      one: T(
        'Production Go services, from first commit to steady load.',
        'Servicios Go en producción: del primer commit a la carga estable.',
        'Produktionsreife Go-Services — vom ersten Commit bis zur stabilen Last.',
        'Services Go en production, du premier commit à la charge stable.',
        'Serviços Go em produção: do primeiro commit à carga estável.'
      ),
      bullets: [
        T('APIs and workers designed around explicit SLOs, budgets and failure modes.',
          'APIs y workers diseñados con SLOs explícitos, presupuestos y modos de fallo.',
          'APIs und Worker mit expliziten SLOs, Budgets und Fehlerszenarien.',
          'API et workers conçus autour de SLO explicites, budgets et modes de défaillance.',
          'APIs e workers desenhados com SLOs explícitos, orçamentos e modos de falha.'),
        T('Performance work on the hot path: pprof, allocation budgets, connection pooling.',
          'Rendimiento en el camino crítico: pprof, presupuestos de asignación, pooling de conexiones.',
          'Performance am Hot Path: pprof, Allokationsbudgets, Connection Pooling.',
          'Performance sur le chemin critique : pprof, budgets d’allocation, pooling.',
          'Performance no caminho crítico: pprof, orçamentos de alocação, pooling.'),
        T('Observability and tests by default — metrics, traces, load tests in CI.',
          'Observabilidad y tests por defecto: métricas, trazas y pruebas de carga en CI.',
          'Observability und Tests standardmäßig — Metriken, Traces, Lasttests in der CI.',
          'Observabilité et tests par défaut — métriques, traces, tests de charge en CI.',
          'Observabilidade e testes por padrão — métricas, traces e testes de carga no CI.')
      ],
      chips: ['Go', 'gRPC', 'REST', 'WebSocket', 'PostgreSQL', 'Redis', 'Prometheus', 'Kubernetes']
    },
    {
      n: '02',
      title: T('Apache Kafka, Apache Flink, Data & Streaming platforms', 'Apache Kafka, Apache Flink, datos y plataformas de streaming', 'Apache Kafka, Apache Flink, Daten- & Streaming-Plattformen', 'Apache Kafka, Apache Flink, données et plateformes de streaming', 'Apache Kafka, Apache Flink, dados e plataformas de streaming'),
      one: T('Event-driven platforms at half a million messages per second.',
        'Plataformas event-driven a medio millón de mensajes por segundo.',
        'Event-getriebene Plattformen mit einer halben Million Nachrichten pro Sekunde.',
        'Plateformes événementielles à un demi-million de messages par seconde.',
        'Plataformas orientadas a eventos a meio milhão de mensagens por segundo.'),
      bullets: [
        T('Cluster and topic design: partitioning, retention, ordering, capacity model.',
          'Diseño de clúster y topics: particionado, retención, orden y modelo de capacidad.',
          'Cluster- und Topic-Design: Partitionierung, Retention, Reihenfolge, Kapazitätsmodell.',
          'Conception cluster et topics : partitionnement, rétention, ordre, modèle de capacité.',
          'Desenho de cluster e tópicos: particionamento, retenção, ordem e modelo de capacidade.'),
        T('Kubernetes-native platforms with the Strimzi operator: declarative Kafka clusters, rolling upgrades, GitOps-managed topics.',
          'Plataformas nativas de Kubernetes con el operador Strimzi: clústeres Kafka declarativos, upgrades sin caída y topics gestionados por GitOps.',
          'Kubernetes-native Plattformen mit dem Strimzi-Operator: deklarative Kafka-Cluster, Rolling Upgrades, GitOps-verwaltete Topics.',
          'Plateformes natives Kubernetes avec l’opérateur Strimzi : clusters Kafka déclaratifs, mises à jour progressives, topics gérés en GitOps.',
          'Plataformas nativas de Kubernetes com o operador Strimzi: clusters Kafka declarativos, upgrades progressivos e tópicos geridos por GitOps.'),
        T('CDC with Debezium so you stream from systems you will never rewrite.',
          'CDC con Debezium para hacer streaming desde sistemas que nunca reescribirás.',
          'CDC mit Debezium — Streaming aus Systemen, die Sie nie neu schreiben werden.',
          'CDC avec Debezium pour streamer depuis des systèmes que vous ne réécrirez jamais.',
          'CDC com Debezium para fazer streaming de sistemas que nunca vai reescrever.'),
        T('Flink jobs with checkpointing, schema governance and honest delivery guarantees.',
          'Jobs de Flink con checkpointing, gobierno de esquemas y garantías de entrega honestas.',
          'Flink-Jobs mit Checkpointing, Schema-Governance und ehrlichen Zustellgarantien.',
          'Jobs Flink avec checkpointing, gouvernance des schémas et garanties de livraison honnêtes.',
          'Jobs Flink com checkpointing, governança de esquemas e garantias de entrega honestas.')
      ],
      chips: ['Kafka', 'Kafka Streams', 'Flink', 'Spark', 'Debezium', 'Avro', 'ClickHouse', 'Java']
    },
    {
      n: '03',
      title: T('Realtime, games, multiplayers', 'Tiempo real, juegos y multijugador', 'Realtime, Games, Multiplayer', 'Temps réel, jeux, multijoueur', 'Tempo real, jogos e multijogador'),
      one: T('Authoritative servers where the clock is the enemy.',
        'Servidores autoritativos donde el reloj es el enemigo.',
        'Autoritative Server, bei denen die Uhr der Gegner ist.',
        'Serveurs autoritaires où l’horloge est l’ennemi.',
        'Servidores autoritativos onde o relógio é o inimigo.'),
      bullets: [
        T('Non-blocking cores with allocation discipline and lock-free hot paths.',
          'Núcleos no bloqueantes con disciplina de asignación y rutas críticas lock-free.',
          'Nicht-blockierende Kerne mit Allokationsdisziplin und lock-freien Hot Paths.',
          'Cœurs non bloquants avec discipline d’allocation et chemins critiques sans verrou.',
          'Núcleos não bloqueantes com disciplina de alocação e caminhos críticos sem locks.'),
        T('Matchmaking, room lifecycle, reconnect and state resynchronisation.',
          'Matchmaking, ciclo de vida de salas, reconexión y resincronización de estado.',
          'Matchmaking, Raum-Lebenszyklus, Reconnect und State-Resynchronisation.',
          'Matchmaking, cycle de vie des salles, reconnexion et resynchronisation d’état.',
          'Matchmaking, ciclo de vida de salas, reconexão e ressincronização de estado.'),
        T('Client prediction and reconciliation, so it feels instant without trusting the client.',
          'Predicción y reconciliación en el cliente: se siente instantáneo sin confiar en él.',
          'Client-Prediction und Reconciliation — fühlt sich sofort an, ohne dem Client zu trauen.',
          'Prédiction et réconciliation côté client : instantané sans faire confiance au client.',
          'Predição e reconciliação no cliente: parece instantâneo sem confiar no cliente.')
      ],
      chips: ['Java', 'Vert.x', 'Netty', 'WebSocket', 'MQTT', 'Phaser 3', 'TypeScript']
    },
    {
      n: '04',
      title: T('Fintech & payments', 'Fintech y pagos', 'Fintech & Payments', 'Fintech et paiements', 'Fintech e pagamentos'),
      one: T('Money-grade backends: correctness first, throughput second.',
        'Backends de nivel financiero: primero la corrección, después el rendimiento.',
        'Backends in Geldqualität: erst Korrektheit, dann Durchsatz.',
        'Backends de qualité bancaire : la correction d’abord, le débit ensuite.',
        'Backends de nível financeiro: primeiro a correção, depois o throughput.'),
      bullets: [
        T('Sagas with compensating actions, idempotency keys and an auditable ledger.',
          'Sagas con acciones compensatorias, claves de idempotencia y libro auditable.',
          'Sagas mit Kompensationen, Idempotenzschlüsseln und prüfbarem Ledger.',
          'Sagas avec actions compensatoires, clés d’idempotence et registre auditable.',
          'Sagas com ações compensatórias, chaves de idempotência e ledger auditável.'),
        T('Reconciliation, retries and dead-letter handling you can operate at 03:00.',
          'Reconciliación, reintentos y colas de error que se pueden operar a las 03:00.',
          'Reconciliation, Retries und Dead-Letter-Handling, das auch um 3 Uhr nachts funktioniert.',
          'Réconciliation, reprises et files d’erreur gérables à 3 h du matin.',
          'Reconciliação, retries e dead-letter que se conseguem operar às 3 da manhã.'),
        T('Audit trails, PII boundaries and least-privilege access by design.',
          'Trazas de auditoría, límites de PII y acceso de mínimo privilegio por diseño.',
          'Audit-Trails, PII-Grenzen und Least-Privilege-Zugriff by Design.',
          'Pistes d’audit, périmètres PII et accès au moindre privilège par conception.',
          'Trilhas de auditoria, limites de PII e acesso de menor privilégio por desenho.')
      ],
      chips: ['Go', 'Java', 'Kafka', 'Saga', 'PostgreSQL', 'gRPC', 'OIDC']
    },
    {
      n: '05',
      title: T('Ai engineering, integrations and art', 'Ingeniería, integraciones y arte con IA', 'KI-Engineering, Integrationen und Art', 'Ingénierie, intégrations et art IA', 'Engenharia, integrações e arte com IA'),
      one: T('Agentic pipelines and generative art, end to end.',
        'Pipelines agénticos y arte generativo, de principio a fin.',
        'Agentische Pipelines und generative Art, end to end.',
        'Pipelines agentiques et art génératif, de bout en bout.',
        'Pipelines agênticos e arte generativa, de ponta a ponta.'),
      bullets: [
        T('Agentic pipelines that chain tools, retrieval and models into one reliable flow.',
          'Pipelines agénticos que encadenan herramientas, retrieval y modelos en un flujo fiable.',
          'Agentische Pipelines, die Tools, Retrieval und Modelle zu einem verlässlichen Ablauf verbinden.',
          'Pipelines agentiques qui enchaînent outils, retrieval et modèles en un flux fiable.',
          'Pipelines agênticos que encadeiam ferramentas, retrieval e modelos num fluxo fiável.'),
        T('RAG over your real corpus: code, review history, runbooks — with citations.',
          'RAG sobre tu corpus real: código, historial de revisión, runbooks, con citas.',
          'RAG über Ihren echten Korpus: Code, Review-Historie, Runbooks — mit Quellenangaben.',
          'RAG sur votre corpus réel : code, historique de revue, runbooks — avec citations.',
          'RAG sobre o seu corpus real: código, histórico de revisão, runbooks — com citações.'),
        T('Guardrails, evaluation sets, cost and latency budgets, sane fallbacks.',
          'Guardrails, conjuntos de evaluación, presupuestos de coste y latencia, fallbacks sensatos.',
          'Guardrails, Evaluationssets, Kosten- und Latenzbudgets, sinnvolle Fallbacks.',
          'Garde-fous, jeux d’évaluation, budgets de coût et de latence, replis raisonnables.',
          'Guardrails, conjuntos de avaliação, orçamentos de custo e latência, fallbacks sensatos.'),
        T('Concept art, sprites, textures and backgrounds generated to a consistent style guide.',
          'Arte conceptual, sprites, texturas y fondos generados con una guía de estilo coherente.',
          'Concept Art, Sprites, Texturen und Hintergründe nach einem konsistenten Style Guide.',
          'Concept art, sprites, textures et décors générés selon une charte graphique cohérente.',
          'Arte conceptual, sprites, texturas e fundos gerados com um guia de estilo coerente.'),
        T('Cartoons, characters and short animated clips from a prompt, a sketch or a reference photo.',
          'Dibujos, personajes y clips animados cortos a partir de un prompt, un boceto o una foto de referencia.',
          'Cartoons, Charaktere und kurze Animationsclips aus Prompt, Skizze oder Referenzfoto.',
          'Cartoons, personnages et courts clips animés à partir d’un prompt, d’un croquis ou d’une photo de référence.',
          'Cartoons, personagens e clipes animados curtos a partir de um prompt, esboço ou foto de referência.'),
        T('Game-ready exports wired into real pipelines — sprite atlases, loops, WebGL and Phaser builds.',
          'Exportaciones listas para juego integradas en pipelines reales: atlas de sprites, bucles, builds WebGL y Phaser.',
          'Game-fertige Exporte für echte Pipelines — Sprite-Atlanten, Loops, WebGL- und Phaser-Builds.',
          'Exports prêts pour le jeu intégrés à de vrais pipelines — atlas de sprites, boucles, builds WebGL et Phaser.',
          'Exportações prontas para jogo integradas em pipelines reais — atlas de sprites, loops, builds WebGL e Phaser.')
      ],
      chips: ['LLM APIs', 'RAG', 'Agents', 'Qdrant', 'Weaviate', 'Python', 'Go', 'Kafka', 'Higgsfield', 'Seedance', 'Syntx', 'Phaser 3', 'Concept art', 'Style guides']
    }
  ];
})();
