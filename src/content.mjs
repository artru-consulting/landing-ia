// =====================================================================
// PACk IA PME — fichier de données unique
// Tous les textes, prix, garanties et liens du site sont ici.
// Après modification : `node src/build.mjs` régénère les pages.
// =====================================================================

export const config = {
  // Adresse publique du site (sert au sitemap, aux balises canoniques et au JSON-LD).
  // À remplacer par le nom de domaine définitif.
  siteUrl: 'https://artru-consulting.github.io/landing-ia/',
  updated: '2026-10-30',
  calendly: 'https://calendly.com/pierre-1qet/30-minutes-ia-avec-pack',
  linkedin: 'https://www.linkedin.com/in/pierre-artru-4628a413/',
  email: 'pierre@artruconsulting.com',
  phone: '+33 6 10 25 74 18',
  phoneHref: 'tel:+33610257418',
  region: 'Lyon et AuRA',
  ctaLabel: 'Réserver 30 minutes',
  // Interrupteur du bloc « Votre partenaire technique » (accord écrit obtenu le 30/10/2026).
  showPartner: true,
};

export const legal = {
  raisonSociale: 'Artru Consulting',
  forme: 'SAS à associé unique',
  capital: '2 000 €',
  rcs: 'RCS Lyon 979 223 013',
  siren: '979 223 013',
  euid: 'FR6901.979223013',
  siege: '6 rue Maxime Lalouette, 69410 Champagne-au-Mont-d’Or',
  president: 'Pierre Artru',
  directeurPublication: 'Pierre Artru',
  tva: null, // À compléter : numéro de TVA intracommunautaire
  nda: '84 69 25063 69',
  qualiopiNumero: '25FOR01091.2',
  qualiopiCertificateur: 'QUALITIA Certification',
  qualiopiValidite: 'du 21/08/2025 au 20/08/2028, sous réserve de l’audit de surveillance',
  qualiopiPdf: 'assets/certificat_qualiopi_25FOR01091.2.pdf',
  hebergeur: 'GitHub, Inc. (GitHub Pages), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis',
  cgvUrl: 'https://artruconsulting.com/conditions-generales',
};

// ---------------------------------------------------------------------
// Les trois packs : prix HT, à valider par Pierre
// ---------------------------------------------------------------------
export const packs = {
  audit: {
    slug: 'audit',
    name: 'PACk Audit',
    tagline: 'Savoir où l’IA vous fait gagner du temps, métier par métier.',
    duration: '4 semaines',
    priceShort: '450 € HT par métier',
    priceCard: { amount: '450', unit: '€ HT', detail: 'par métier audité, synthèse et restitution incluses' },
    example: 'Exemple : trois métiers audités = 1 350 € HT.',
    deliverable: 'Une fiche par métier, une synthèse direction, une feuille de route à 90 jours.',
    weeks: [
      { label: 'Semaine 1', title: 'Cadrage avec la direction', text: 'On choisit ensemble les métiers à auditer et ce que vous voulez améliorer.' },
      { label: 'Semaines 2 et 3', title: 'Un atelier de 2 heures par métier', text: 'Avec les personnes qui font le travail. Puis analyse des processus et des outils (CRM, bases de données) et mesure de la situation de départ.' },
      { label: 'Semaine 4', title: 'Restitution à la direction', text: 'Les gains estimés, les priorités chiffrées et la feuille de route à 90 jours.' },
    ],
    deliverables: [
      { title: 'Une fiche par métier', text: 'Les tâches automatisables avec les gains estimés, l’état des outils et des données, les prérequis, les indicateurs de départ.' },
      { title: 'Une synthèse direction', text: 'Le gain consolidé, les priorités chiffrées et une feuille de route à 90 jours.' },
    ],
    funding: 'L’audit n’est pas une action de formation : il n’est pas finançable par votre OPCO.',
  },
  formation: {
    slug: 'formation',
    name: 'PACk Formation',
    tagline: 'Deux jours pour que vos équipes repèrent leurs cas d’usage.',
    duration: '2 jours (14 h)',
    priceShort: '1 900 € HT par jour',
    priceCard: { amount: '1 900', unit: '€ HT', detail: 'par jour, pour un groupe jusqu’à 10 personnes' },
    example: 'Soit 3 800 € HT les deux jours, dans vos locaux ou en visio.',
    deliverable: 'Des cas d’usage priorisés, une bibliothèque de prompts, un plan d’action.',
    days: [
      { label: 'Jour 1', title: 'Comprendre et pratiquer', text: 'Ce que l’IA générative sait faire, ce qu’elle ne sait pas faire, et la prise en main sur vos vrais sujets.' },
      { label: 'Jour 2', title: 'Repérer et prioriser vos cas d’usage', text: 'Ateliers par métier, démonstrations d’agents réels, choix de trois cas prioritaires.' },
    ],
    deliverables: [
      { title: 'Des cas d’usage priorisés', text: 'Trois cas prioritaires choisis par vos équipes, avec ce qu’il faut pour les lancer.' },
      { title: 'Une bibliothèque de prompts', text: 'Des consignes prêtes à l’emploi, adaptées à vos métiers.' },
      { title: 'Un plan d’action', text: 'Qui fait quoi, dans quel ordre, dans les semaines qui suivent.' },
    ],
    practical: [
      'Aucun prérequis technique.',
      'Groupe jusqu’à 10 personnes, en intra-entreprise.',
      'Dans vos locaux ou en visio.',
      'Outils : vos licences, ou un poste équipé fourni.',
      'Approche agnostique : ChatGPT, Gemini, Claude, Mistral, selon vos outils.',
    ],
    funding: 'Action de formation réalisée par un organisme certifié Qualiopi : prise en charge possible par votre OPCO selon votre situation. Nous vous aidons à monter le dossier.',
  },
  agents: {
    slug: 'agents',
    name: 'PACk Agents',
    tagline: 'Des agents IA installés dans vos outils, hébergés en France et maintenus.',
    duration: '4 à 6 semaines',
    priceShort: 'Installation à partir de 1 600 € HT, puis à partir de 139 € HT par mois',
    priceCard: { amount: '139', unit: '€ HT / mois', prefix: 'à partir de', detail: 'par agent, après une installation à partir de 1 600 € HT' },
    example: 'Sans engagement au-delà du mois en cours.',
    deliverable: 'Un agent installé dans vos outils, hébergé en France et maintenu.',
    prerequisites: [
      'Des outils et des données exploitables (CRM, bases de données, messagerie), vérifiés par l’audit.',
      'Un audit technique avant toute installation.',
      'Une personne référente de votre côté pour valider l’agent.',
    ],
    installation: 'L’installation coûte à partir de 1 600 € HT, selon la connexion à vos outils. Le prix est fixé au devis, après audit technique.',
    subscription: [
      'L’hébergement en France.',
      'La surveillance et les mises à jour.',
      'La correction des anomalies.',
      'Un support par e-mail, avec réponse sous 2 jours ouvrés.',
      'Les appels aux modèles d’IA, jusqu’à un volume fixé au devis.',
    ],
    notIncluded: [
      'Les licences de vos outils d’IA, à votre charge.',
      'Les nouvelles fonctions et les nouvelles connexions, sur devis.',
    ],
    examples: [
      'Préparer les rendez-vous commerciaux et les relances.',
      'Trier et répondre aux demandes entrantes.',
      'Synthétiser les réunions et le reporting.',
      'Assister l’administratif et les RH sur les tâches répétitives.',
    ],
    funding: 'L’installation et l’abonnement ne sont pas des actions de formation : ils ne sont pas finançables par votre OPCO.',
  },
};

// ---------------------------------------------------------------------
// Garanties : propositions à valider
// ---------------------------------------------------------------------
export const guarantees = [
  { title: 'Le livrable défini avant signature', text: 'Vous savez ce que vous recevez avant de vous engager.' },
  { title: 'Le délai tenu', text: 'Le calendrier est écrit dans le devis.' },
  { title: 'Le prix ferme', text: 'Pas de dépassement sans votre accord écrit.' },
  { title: 'La reprise sans frais', text: 'Si le livrable n’est pas conforme au devis, on le reprend.' },
  { title: 'Une mesure écrite', text: 'Des indicateurs de départ et un objectif de mesure à 90 jours, écrits au devis.' },
];

// ---------------------------------------------------------------------
// Accueil
// ---------------------------------------------------------------------
export const home = {
  badge: 'Offre IA pour PME · certifié Qualiopi pour la formation',
  title: 'L’IA qui travaille vraiment dans votre PME.',
  subtitle: 'Un audit chiffré, une formation qui fait repérer vos cas d’usage, des agents hébergés en France. Par un dirigeant qui parle votre langue.',
  secondaryCta: 'Voir les 3 packs',
  heroImageAlt: 'Une équipe de PME travaille ensemble autour d’un ordinateur',
  painTitle: 'Ça vous parle ?',
  pains: [
    { title: 'Vous ne savez pas par où commencer', text: 'Tout le monde parle d’IA, mais personne ne vous dit où elle vous fera gagner du temps chez vous.' },
    { title: 'Vos équipes testent chacune dans leur coin', text: 'Des comptes gratuits, des usages dispersés, et aucune idée de ce que ça rapporte.' },
    { title: 'Un projet IA n’a jamais dépassé la démonstration', text: 'C’était impressionnant en réunion. Trois mois plus tard, plus personne ne s’en sert.' },
  ],
  packsTitle: 'Trois packs, des prix annoncés',
  packsIntro: 'Chaque pack s’achète séparément. Vous commencez où vous en êtes.',
  methodTitle: 'Notre manière de travailler, en trois temps',
  method: [
    { n: '01', title: 'Diagnostic et découverte', text: 'Comprendre l’IA sans jargon, repérer les tâches à automatiser, évaluer les gains possibles.', pack: 'audit' },
    { n: '02', title: 'Ateliers « Et si l’IA pouvait… »', text: 'Par métier, vos équipes imaginent, construisent et testent des cas d’usage. On repère vos ambassadeurs.', pack: 'formation' },
    { n: '03', title: 'Mise en action et quick wins', text: 'Un cas d’usage pilote déployé, des ambassadeurs formés, l’impact mesuré.', pack: 'agents' },
  ],
  deliverablesTitle: 'À quoi ressemble ce que vous recevez',
  deliverablesIntro: 'Aperçu d’une fiche par métier et de la synthèse direction. Les données ci-dessous sont des exemples.',
  waitTitle: 'Combien vous coûte l’attente ?',
  waitIntro: 'Un calcul simple, avec vos hypothèses. Ce n’est pas une promesse de gain : c’est un ordre de grandeur pour décider s’il vaut la peine de regarder de plus près.',
  calculator: { hours: 2, cost: 45, people: 10 },
  guaranteesTitle: 'Ce qu’on s’engage à tenir',
  whyTitle: 'Pourquoi Artru Consulting',
  why: [
    'Plus de vingt ans à diriger des entreprises : je connais vos arbitrages.',
    'Un passeur entre la stratégie et le terrain, sans jargon.',
    'Une conviction : Humain × Technologie = Valeur.',
  ],
  dataTitle: 'Vos données',
  data: [
    { title: 'Hébergement en France', text: 'Les agents que nous installons sont hébergés en France.' },
    { title: 'RGPD', text: 'Un contrat de sous-traitance des données est signé avec vous avant toute installation.' },
    { title: 'Validation humaine', text: 'Aucune action sensible sans validation par une personne de votre équipe. L’historique des actions est conservé.' },
    { title: 'Le bon modèle pour vos données', text: 'Le choix du modèle d’IA dépend de la sensibilité de vos données. On en parle avant, pas après.' },
  ],
  finalTitle: 'Parlons de votre PME, 30 minutes.',
  finalText: 'On regarde votre situation et on vous dit quel pack a du sens, ou aucun.',
};

// Variante B de l'accueil (/b) : l'audit en vedette
export const homeB = {
  badge: 'Audit IA pour PME',
  title: 'Audit métier par métier : savoir où l’IA vous fait gagner du temps et de l’argent.',
  subtitle: '450 € HT par métier. Des indicateurs de départ mesurés, un objectif de mesure à 90 jours écrit au devis. Par un dirigeant qui parle votre langue.',
  nextTitle: 'Et après l’audit ?',
  nextText: 'Si l’audit le justifie, vos équipes se forment pour repérer et prioriser leurs cas d’usage (PACk Formation), puis nous installons les agents utiles dans vos outils (PACk Agents).',
};

// ---------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------
export const faq = [
  { q: 'Par quel pack commencer ?', a: 'Le plus souvent par l’audit : il dit où l’IA vous fait gagner du temps, et ce qu’il faut pour y arriver. Si vos équipes partent de zéro, la formation est un bon point de départ. L’échange de 30 minutes sert à choisir.' },
  { q: 'Faut-il des compétences techniques ?', a: 'Non. La formation est sans prérequis. Pour les agents, il faut des outils et des données exploitables : l’audit le vérifie avant.' },
  { q: 'Mon OPCO peut-il financer ?', a: 'La formation peut être prise en charge par votre OPCO selon votre situation : Artru Consulting est certifié Qualiopi pour les actions de formation. Nous vous aidons à monter le dossier. L’audit et les agents ne sont pas finançables par l’OPCO.' },
  { q: 'Quels outils d’IA utilisez-vous ?', a: 'Ceux qui conviennent à votre entreprise : ChatGPT, Gemini, Claude, Mistral ou d’autres. Nous ne vendons pas de licences et ne sommes liés à aucun éditeur.' },
  { q: 'Où sont hébergées nos données ?', a: 'Les agents que nous installons sont hébergés en France. Le choix du modèle d’IA dépend de la sensibilité de vos données, et un contrat de sous-traitance des données est signé avant toute installation.' },
  { q: 'Que se passe-t-il si nous arrêtons l’abonnement d’un agent ?', a: 'Il n’y a pas d’engagement au-delà du mois en cours. Nous convenons avec vous de la restitution de vos données et de la configuration.' },
  { q: 'Pouvez-vous garantir un retour sur investissement ?', a: 'Non, et méfiez-vous de ceux qui le promettent. Nous mesurons la situation de départ, fixons un objectif de mesure à 90 jours dans le devis, et mesurons ensemble.' },
  { q: 'Intervenez-vous hors de Lyon ?', a: 'Oui. Nous sommes basés à Lyon et intervenons en Auvergne-Rhône-Alpes, et partout en visio.' },
];

// ---------------------------------------------------------------------
// À propos
// ---------------------------------------------------------------------
export const about = {
  kicker: 'Depuis 2023 · Lyon',
  title: 'L’IA au service de vos équipes, pas l’inverse.',
  intro: 'Pierre Artru accompagne les dirigeants de PME : un audit chiffré, une formation qui fait repérer les cas d’usage, des agents hébergés en France. Du concret, du mesurable, de l’humain.',
  badge: { value: '20+ ans', label: 'à la direction d’agences' },
  name: 'Pierre Artru',
  role: 'Fondateur d’Artru Consulting',
  photoAlt: 'Pierre Artru, fondateur d’Artru Consulting',
  bio: [
    'J’ai dirigé pendant plus de vingt ans des agences au sein du groupe Altavia. Croissance, rentabilité, management, transformation : j’ai connu les arbitrages d’un dirigeant, avec leurs doutes.',
    'En 2023, j’ai fondé Artru Consulting pour aider les entreprises à adopter l’IA sans perdre ce qui fait leur force : leurs équipes.',
    'Je suis formateur certifié PCM®. Comprendre comment chacun communique et se motive change la façon d’embarquer une équipe dans un changement. L’IA ne réussit que si les gens la prennent en main.',
    // Phrase proposée, à valider par Pierre :
    'Avant les affaires, il y a eu le terrain : cinq fois champion de France de hockey sur gazon avec le Football Club de Lyon. Le sport d’équipe m’a appris qu’on gagne avec un collectif, un entraînement régulier et un plan de jeu partagé. Je l’applique aujourd’hui avec les équipes que j’accompagne.',
  ],
  conviction: 'Humain × Technologie = Valeur.',
  figures: [
    { value: '20+ ans', label: 'de direction d’entreprise' },
    { value: '2023', label: 'création d’Artru Consulting' },
    { value: 'Qualiopi', label: 'organisme de formation certifié depuis août 2025' },
    { value: '5 titres', label: 'de champion de France de hockey sur gazon avec le Football Club de Lyon' },
    { value: 'Lyon et AuRA', label: 'Auvergne-Rhône-Alpes' },
  ],
  whyTitle: 'Pourquoi Artru Consulting',
  why: [
    'L’IA est souvent mal comprise. On voit de belles démonstrations, puis plus rien. Dans une PME, ce qui compte, c’est ce qui sert vraiment, ce que les équipes adoptent, et ce qu’on peut mesurer.',
    'Mon rôle : relier la décision du dirigeant à l’usage de tous les jours, sans jargon et sans promesse magique.',
  ],
  doTitle: 'Ce que nous faisons',
  do: [
    'Un audit qui chiffre ce que l’IA peut vous rendre, métier par métier.',
    'Des formations certifiées Qualiopi où vos équipes repèrent et priorisent leurs cas d’usage.',
    'Des agents installés dans vos outils, hébergés en France, maintenus pour vous.',
  ],
  dontTitle: 'Ce que nous ne faisons pas',
  dont: [
    'Vendre des démonstrations sans suite.',
    'Annoncer des gains sans méthode pour les mesurer.',
    'Installer un agent sans validation humaine.',
    'Remplacer vos équipes par des machines.',
  ],
  principles: 'Trois principes portent cette méthode : l’IA au service de l’humain et non l’inverse, des gains mesurables dès le premier mois, une adoption durable avec des équipes engagées. Avec un angle propre : IA et intelligence émotionnelle.',
  trustTitle: 'Cadre de confiance',
  trust: [
    'Organisme de formation certifié Qualiopi (actions de formation).',
    'Hébergement en France, respect du RGPD.',
    'Validation humaine avant toute action sensible, historique des actions conservé.',
    'Prix, livrables et délais écrits dans le devis.',
  ],
};

export const partner = {
  title: 'Votre partenaire technique',
  text: 'Spécialiste de l’IA générative et de l’automatisation en entreprise, avec six ans d’expérience au croisement du marketing, de la donnée et de la technique. Il conçoit et met en production des agents IA reliés aux outils métier (CRM, automatisations, tableaux de bord de suivi) et accompagne les équipes de direction dans l’adoption de l’IA. Certifié sur plusieurs outils d’IA et de marketing technologique.',
};

// ---------------------------------------------------------------------
// Financement
// ---------------------------------------------------------------------
export const financement = {
  title: 'Financer votre projet IA',
  intro: 'Ce qui peut être financé, ce qui ne peut pas l’être, et comment on vous aide. Sans promesse intenable.',
  blocks: [
    { title: 'La formation : finançable selon votre situation', text: 'Artru Consulting est un organisme de formation certifié Qualiopi pour les actions de formation. Le PACk Formation peut être pris en charge par votre OPCO, selon votre situation, votre branche et vos fonds disponibles. Nous vous aidons à monter le dossier.' },
    { title: 'L’audit et les agents : non finançables par l’OPCO', text: 'Ce ne sont pas des actions de formation. Ils sont facturés directement à votre entreprise.' },
    { title: 'Ce que nous ne vous dirons jamais', text: 'Qu’il n’y a « aucun reste à charge ». La prise en charge dépend de votre OPCO : seul lui peut vous la confirmer.' },
  ],
  steps: [
    'Nous vous envoyons le programme et le devis de formation.',
    'Vous déposez la demande auprès de votre OPCO avant le début de la formation.',
    'Nous fournissons les documents demandés : convention, programme, feuilles d’émargement, attestations.',
  ],
};

// ---------------------------------------------------------------------
// Page de référence pour les moteurs d'IA
// ---------------------------------------------------------------------
export const references = {
  title: 'Références et sources',
  intro: 'Page factuelle sur l’offre PACk IA PME d’Artru Consulting : ce que nous proposons, à quel prix, avec quelles preuves. Mise à jour le 30 octobre 2026.',
};
