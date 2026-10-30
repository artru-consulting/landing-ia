// Génère les pages statiques du site à partir de src/content.mjs.
// Usage : node src/build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as C from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { config: cfg, legal, packs, home, homeB, faq, about, partner, financement, references, guarantees } = C;
const PACKS = [packs.audit, packs.formation, packs.agents];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ext = (url, label, cls = '') => `<a href="${url}" target="_blank" rel="noopener"${cls ? ` class="${cls}"` : ''}>${label}</a>`;
const cta = (cls = 'btn btn-primary') => ext(cfg.calendly, cfg.ctaLabel, `${cls} js-cta`);

// ------------------------------------------------------------------ layout
function layout({ path, title, description, body, jsonld = [], noindex = false, out: outFile, base = false }) {
  const depth = path === '' || base ? 0 : path.split('/').filter(Boolean).length;
  const r = depth ? '../'.repeat(depth) : './';
  const url = cfg.siteUrl + path;
  const nav = [
    ['audit/', 'Audit'], ['formation/', 'Formation'], ['agents/', 'Agents'], ['tarifs/', 'Tarifs'], ['a-propos/', 'À propos'],
  ];
  const navHtml = nav.map(([p, l]) => `<li><a href="${r}${p}"${path === p ? ' aria-current="page"' : ''}>${l}</a></li>`).join('');
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${base ? `<base href="${cfg.siteUrl}">` : ''}
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="fr_FR">
<link rel="icon" href="${r}assets/logo-artru-consulting-96.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:wght@700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/site.css">
${ld}
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="header">
  <div class="container header-inner">
    <a class="logo" href="${r}"><img src="${r}assets/logo-artru-consulting.png" alt="Artru Consulting, accueil" width="44" height="44"><span class="logo-text">PACk IA PME</span></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav id="nav" class="nav" aria-label="Navigation principale">
      <ul>${navHtml}</ul>
      ${cta('btn btn-primary btn-sm')}
    </nav>
  </div>
</header>
<main id="contenu">
${body(r)}
</main>
${footer(r)}
<script src="${r}assets/site.js" defer></script>
</body>
</html>
`;
  const out = outFile ? join(ROOT, outFile) : join(ROOT, path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

function footer(r) {
  return `<footer class="footer">
  <div class="container footer-main">
    <div class="footer-col footer-brand">
      <img src="${r}assets/logo-artru-consulting.png" alt="Artru Consulting" width="40" height="40" loading="lazy">
      <p><strong>PACk IA PME</strong>, l’offre IA d’Artru Consulting.<br>Basé à ${cfg.region === 'Lyon et AuRA' ? 'Lyon, interventions en Auvergne-Rhône-Alpes et en visio' : cfg.region}.</p>
      <a class="footer-qualiopi" href="${r}${legal.qualiopiPdf}" target="_blank" rel="noopener">
        <img src="${r}assets/qualiopi.svg" alt="Certification Qualiopi, voir le certificat" width="190" height="58" loading="lazy">
      </a>
      <p class="footer-small">La certification qualité a été délivrée au titre de la catégorie d’actions suivante : actions de formation.<br>Déclaration d’activité n° ${legal.nda}. Certificat n° ${legal.qualiopiNumero}.</p>
    </div>
    <div class="footer-col">
      <h2 class="footer-title">L’offre</h2>
      <ul class="footer-links">
        <li><a href="${r}audit/">PACk Audit</a></li>
        <li><a href="${r}formation/">PACk Formation</a></li>
        <li><a href="${r}agents/">PACk Agents</a></li>
        <li><a href="${r}tarifs/">Tarifs</a></li>
        <li><a href="${r}financement/">Financement</a></li>
        <li><a href="${r}faq/">Questions fréquentes</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h2 class="footer-title">Contact</h2>
      <ul class="footer-links">
        <li><a href="mailto:${cfg.email}">${cfg.email}</a></li>
        <li><a href="${cfg.phoneHref}">${cfg.phone}</a></li>
        <li>${ext(cfg.linkedin, 'LinkedIn')}</li>
        <li><a href="${r}a-propos/">À propos</a></li>
        <li><a href="${r}contact/">Prendre rendez-vous</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h2 class="footer-title">Informations</h2>
      <ul class="footer-links">
        <li><a href="${r}mentions-legales/">Mentions légales</a></li>
        <li><a href="${r}confidentialite/">Confidentialité</a></li>
        <li>${ext(legal.cgvUrl, 'Conditions générales')}</li>
        <li><a href="${r}references-et-sources/">Références et sources</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© 2026 Artru Consulting. Humain × Technologie = Valeur. Process Communication Model® est une marque déposée.</p>
  </div>
</footer>`;
}

// ------------------------------------------------------------------ blocs
const pageHead = (kicker, title, intro) => `<section class="page-head"><div class="container narrow">
  ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
  <h1 class="page-title">${title}</h1>
  ${intro ? `<p class="lead">${intro}</p>` : ''}
</div></section>`;

const packCards = (r) => `<div class="pack-grid">${PACKS.map((p) => `
  <article class="pack-card">
    <p class="pack-duration">${p.duration}</p>
    <h3 class="pack-name">${p.name}</h3>
    <p class="pack-tagline">${p.tagline}</p>
    <p class="pack-deliverable"><strong>Vous recevez :</strong> ${p.deliverable}</p>
    <p class="pack-price">${p.priceCard.prefix ? `<span class="pack-price-prefix">${p.priceCard.prefix}</span> ` : ''}<span class="pack-price-amount">${p.priceCard.amount}</span> <span class="pack-price-unit">${p.priceCard.unit}</span></p>
    <p class="pack-price-detail">${p.priceCard.detail}</p>
    <a class="btn btn-outline" href="${r}${p.slug}/">Découvrir le ${p.name}</a>
  </article>`).join('')}</div>`;

const methodBlock = (r) => `<ol class="steps">${home.method.map((m) => `
  <li class="step">
    <span class="step-n" aria-hidden="true">${m.n}</span>
    <h3>${m.title}</h3>
    <p>${m.text}</p>
    <a class="step-link" href="${r}${m.pack}/">${packs[m.pack].name}</a>
  </li>`).join('')}</ol>
  <p class="note center">Les packs s’achètent séparément.</p>`;

const guaranteesBlock = () => `<ul class="guarantees">${guarantees.map((g) => `<li><h3>${g.title}</h3><p>${g.text}</p></li>`).join('')}</ul>`;

const partnerBlock = () => cfg.showPartner ? `<aside class="partner">
  <h3>${partner.title}</h3>
  <p>${partner.text}</p>
</aside>` : '';

const finalCta = (title = home.finalTitle, text = home.finalText) => `<section class="section section-cta"><div class="container narrow center">
  <h2 class="cta-title">${title}</h2>
  <p class="cta-text">${text}</p>
  ${cta('btn btn-primary btn-lg')}
</div></section>`;

const deliverablesPreview = () => `<div class="preview-grid">
  <figure class="mock">
    <span class="mock-tag">Exemple</span>
    <figcaption class="mock-title">Fiche métier : Administration des ventes</figcaption>
    <table class="mock-table">
      <thead><tr><th scope="col">Tâche</th><th scope="col">Temps actuel</th><th scope="col">Gain estimé</th></tr></thead>
      <tbody>
        <tr><td>Saisie des commandes reçues par e-mail</td><td>6 h / sem.</td><td>4 h / sem.</td></tr>
        <tr><td>Relances de devis</td><td>3 h / sem.</td><td>2 h / sem.</td></tr>
        <tr><td>Réponses aux questions de suivi</td><td>4 h / sem.</td><td>2 h / sem.</td></tr>
      </tbody>
    </table>
    <dl class="mock-meta">
      <div><dt>Outils et données</dt><dd>CRM à jour à 70 %, messagerie partagée</dd></div>
      <div><dt>Prérequis</dt><dd>Nettoyer les fiches clients en doublon</dd></div>
      <div><dt>Indicateur de départ</dt><dd>Délai moyen de traitement d’une commande : 26 h</dd></div>
    </dl>
  </figure>
  <figure class="mock mock-dark">
    <span class="mock-tag">Exemple</span>
    <figcaption class="mock-title">Synthèse direction</figcaption>
    <p class="mock-big">≈ 14 h <span>par semaine</span></p>
    <p class="mock-sub">Gain consolidé estimé sur trois métiers</p>
    <ol class="mock-roadmap">
      <li><strong>Jours 1 à 30</strong> Agent de saisie des commandes</li>
      <li><strong>Jours 31 à 60</strong> Relances de devis assistées</li>
      <li><strong>Jours 61 à 90</strong> Mesure et ajustements</li>
    </ol>
  </figure>
</div>`;

const calculator = () => `<form class="calc" id="calc" aria-describedby="calc-note" onsubmit="return false">
  <div class="calc-fields">
    <label>Heures automatisables par personne et par semaine
      <input type="number" name="hours" min="0" max="40" step="0.5" value="${home.calculator.hours}" inputmode="decimal"></label>
    <label>Coût horaire chargé (€)
      <input type="number" name="cost" min="0" max="500" step="1" value="${home.calculator.cost}" inputmode="decimal"></label>
    <label>Nombre de collaborateurs concernés
      <input type="number" name="people" min="1" max="500" step="1" value="${home.calculator.people}" inputmode="numeric"></label>
  </div>
  <div class="calc-result" aria-live="polite">
    <p>Chaque mois d’attente représente environ</p>
    <p class="calc-amount"><output name="month">3 900 €</output></p>
    <p class="calc-sub">soit <output name="hoursMonth">87 h</output> de travail par mois</p>
  </div>
  <p class="note" id="calc-note">Valeurs par défaut : exemple. Calcul : heures × coût horaire × collaborateurs × 4,33 semaines. Une estimation, pas une promesse : seul l’audit mesure vos gains réels.</p>
</form>`;

const faqBlock = (items) => `<div class="faq">${items.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div>`;

// ------------------------------------------------------------------ JSON-LD
const orgLd = {
  '@context': 'https://schema.org', '@type': 'Organization', name: legal.raisonSociale,
  url: cfg.siteUrl, logo: cfg.siteUrl + 'assets/logo-artru-consulting.png', email: cfg.email,
  areaServed: 'Auvergne-Rhône-Alpes, France', founder: { '@type': 'Person', name: 'Pierre Artru', sameAs: [cfg.linkedin] },
  sameAs: [cfg.linkedin], hasCredential: { '@type': 'EducationalOccupationalCredential', name: `Certification Qualiopi n° ${legal.qualiopiNumero} (actions de formation)` },
};
const serviceLd = (p, price, unit) => ({
  '@context': 'https://schema.org', '@type': 'Service', name: p.name, description: p.tagline,
  provider: { '@type': 'Organization', name: legal.raisonSociale }, areaServed: 'France',
  offers: { '@type': 'Offer', priceCurrency: 'EUR', price, description: `${p.priceShort}${unit ? ` (${unit})` : ''}` },
});
const faqLd = (items) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

// ------------------------------------------------------------------ pages
const heroImg = (r) => `<picture>
  <source type="image/webp" srcset="${r}assets/home-equipe-480.webp 480w, ${r}assets/home-equipe-767.webp 767w" sizes="(max-width: 960px) 100vw, 520px">
  <img class="hero-img" src="${r}assets/home-equipe-767.webp" alt="${home.heroImageAlt}" width="767" height="486" fetchpriority="high">
</picture>`;

const pierreImg = (r, cls = 'founder-img', lazy = true) => `<img class="${cls}" src="${r}assets/pierre-artru-747.webp" srcset="${r}assets/pierre-artru-480.webp 480w, ${r}assets/pierre-artru-747.webp 747w" sizes="(max-width: 960px) 80vw, 380px" alt="${about.photoAlt}" width="747" height="934"${lazy ? ' loading="lazy"' : ''}>`;

function homePage(variant) {
  const isB = variant === 'b';
  const h = isB ? { ...home, ...homeB } : home;
  layout({
    path: isB ? 'b/' : '',
    noindex: isB,
    title: isB ? 'Audit IA métier par métier pour PME | Artru Consulting' : 'PACk IA PME : audit, formation et agents IA pour PME | Artru Consulting',
    description: isB ? 'Audit IA métier par métier à 450 € HT par métier : où l’IA fait gagner du temps à votre PME, avec des indicateurs de départ et un objectif de mesure à 90 jours.'
      : 'Audit IA métier par métier, formation certifiée Qualiopi et agents IA hébergés en France pour les PME. Prix annoncés, délais tenus. Lyon et Auvergne-Rhône-Alpes.',
    jsonld: [orgLd, faqLd(faq.slice(0, 6))],
    body: (r) => `
<section class="hero">
  <div class="container hero-layout">
    <div class="hero-content">
      <p class="badge">${h.badge}</p>
      <h1 class="hero-title">${h.title}</h1>
      <p class="hero-subtitle">${h.subtitle}</p>
      <div class="btn-row">
        ${cta('btn btn-primary btn-lg')}
        <a class="btn btn-ghost btn-lg" href="${isB ? `${r}audit/` : '#packs'}">${isB ? 'Voir le déroulé de l’audit' : h.secondaryCta}</a>
      </div>
    </div>
    <div class="hero-media">${heroImg(r)}</div>
  </div>
</section>
<section class="qualiopi-band" aria-label="Certification">
  <div class="container band-inner">
    <img src="${r}assets/qualiopi.svg" alt="Qualiopi, processus certifié" width="150" height="46">
    <p>Organisme de formation certifié Qualiopi pour les <strong>actions de formation</strong>. Déclaration d’activité n° ${legal.nda}. <a href="${r}${legal.qualiopiPdf}" target="_blank" rel="noopener">Voir le certificat</a></p>
  </div>
</section>
<section class="section section-light">
  <div class="container">
    <h2 class="section-title center">${home.painTitle}</h2>
    <ul class="pains">${home.pains.map((p) => `<li><h3>${p.title}</h3><p>${p.text}</p></li>`).join('')}</ul>
  </div>
</section>
${isB ? `
<section class="section" id="packs">
  <div class="container">
    <h2 class="section-title center">Comment se passe l’audit</h2>
    <ol class="timeline">${packs.audit.weeks.map((w) => `<li><span class="timeline-label">${w.label}</span><h3>${w.title}</h3><p>${w.text}</p></li>`).join('')}</ol>
    <div class="price-banner"><p><span class="pack-price-amount">450</span> <span class="pack-price-unit">€ HT par métier</span></p><p>${packs.audit.priceCard.detail}. ${packs.audit.example}</p>${cta('btn btn-primary')}</div>
  </div>
</section>` : `
<section class="section" id="packs">
  <div class="container">
    <h2 class="section-title center">${home.packsTitle}</h2>
    <p class="section-intro center">${home.packsIntro}</p>
    ${packCards(r)}
    <p class="note center">Prix hors taxes. <a href="${r}tarifs/">Voir la grille complète</a>.</p>
  </div>
</section>`}
<section class="section section-light">
  <div class="container">
    <h2 class="section-title center">${home.methodTitle}</h2>
    ${methodBlock(r)}
  </div>
</section>
<section class="section">
  <div class="container">
    <h2 class="section-title center">${home.deliverablesTitle}</h2>
    <p class="section-intro center">${home.deliverablesIntro}</p>
    ${deliverablesPreview()}
  </div>
</section>
<section class="section section-light">
  <div class="container narrow">
    <h2 class="section-title center">${home.waitTitle}</h2>
    <p class="section-intro center">${home.waitIntro}</p>
    ${calculator()}
  </div>
</section>
<section class="section">
  <div class="container">
    <h2 class="section-title center">${home.guaranteesTitle}</h2>
    ${guaranteesBlock()}
    <p class="note center">Ces engagements sont écrits dans chaque devis.</p>
  </div>
</section>
${isB ? `<section class="section section-light"><div class="container narrow center"><h2 class="section-title">${homeB.nextTitle}</h2><p class="section-intro">${homeB.nextText}</p><p><a href="${r}formation/">PACk Formation</a> · <a href="${r}agents/">PACk Agents</a> · <a href="${r}tarifs/">Tarifs</a></p></div></section>` : ''}
<section class="section section-dark">
  <div class="container why">
    <div class="why-photo">${pierreImg(r, 'why-img')}</div>
    <div>
      <h2 class="section-title light">${home.whyTitle}</h2>
      <ul class="why-list">${home.why.map((w) => `<li>${w}</li>`).join('')}</ul>
      <p><a class="link-light" href="${r}a-propos/">Découvrir le parcours de Pierre Artru</a></p>
      ${partnerBlock()}
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <h2 class="section-title center">${home.dataTitle}</h2>
    <ul class="cards-4">${home.data.map((d) => `<li><h3>${d.title}</h3><p>${d.text}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section section-light">
  <div class="container narrow">
    <h2 class="section-title center">Questions fréquentes</h2>
    ${faqBlock(faq.slice(0, 6))}
    <p class="note center"><a href="${r}faq/">Toutes les questions</a></p>
  </div>
</section>
${finalCta()}`,
  });
}

function packPage(p, inner, ld) {
  layout({
    path: `${p.slug}/`,
    title: `${p.name} : ${p.tagline.replace(/\.$/, '')} | Artru Consulting`,
    description: `${p.tagline} ${p.duration}. ${p.priceShort}. ${p.deliverable}`,
    jsonld: [orgLd, ld],
    body: (r) => `${pageHead(p.duration, p.name, p.tagline)}
<section class="section section-light">
  <div class="container pack-layout">
    <div class="pack-main">${inner(r)}</div>
    <aside class="price-card">
      <p class="price-label">Investissement</p>
      <p class="price-amount">${p.priceCard.prefix ? `<span class="price-prefix">${p.priceCard.prefix}</span>` : ''}${p.priceCard.amount} <span class="price-currency">${p.priceCard.unit}</span></p>
      <p class="price-detail">${p.priceCard.detail}</p>
      <p class="price-detail">${p.example}</p>
      ${cta('btn btn-primary btn-full')}
      <p class="price-funding">${p.funding}</p>
    </aside>
  </div>
</section>
<section class="section">
  <div class="container">
    <h2 class="section-title center">Nos engagements</h2>
    ${guaranteesBlock()}
  </div>
</section>
${finalCta()}`,
  });
}

// ------------------------------------------------------------------ build
homePage('a');
homePage('b');

packPage(packs.audit, () => `
  <h2 class="h2">Le déroulé en 4 semaines</h2>
  <ol class="timeline">${packs.audit.weeks.map((w) => `<li><span class="timeline-label">${w.label}</span><h3>${w.title}</h3><p>${w.text}</p></li>`).join('')}</ol>
  <h2 class="h2">Ce que vous recevez</h2>
  <ul class="cards-2">${packs.audit.deliverables.map((d) => `<li><h3>${d.title}</h3><p>${d.text}</p></li>`).join('')}</ul>
  ${deliverablesPreview()}
  <h2 class="h2">Une mesure, pas une promesse</h2>
  <p>L’audit mesure votre situation de départ et fixe des indicateurs. L’objectif de mesure à 90 jours est écrit dans le devis : on sait ce qu’on regardera, et quand.</p>`,
  serviceLd(packs.audit, '450', 'par métier'));

packPage(packs.formation, () => `
  <h2 class="h2">Le programme</h2>
  <ol class="timeline">${packs.formation.days.map((d) => `<li><span class="timeline-label">${d.label}</span><h3>${d.title}</h3><p>${d.text}</p></li>`).join('')}</ol>
  <h2 class="h2">Ce que vos équipes repartent avec</h2>
  <ul class="cards-3">${packs.formation.deliverables.map((d) => `<li><h3>${d.title}</h3><p>${d.text}</p></li>`).join('')}</ul>
  <h2 class="h2">En pratique</h2>
  <ul class="checklist">${packs.formation.practical.map((x) => `<li>${x}</li>`).join('')}</ul>
  <p class="note">La formation sert à repérer et prioriser vos cas d’usage. Les agents sont ensuite installés et maintenus par Artru Consulting (<a href="../agents/">PACk Agents</a>).</p>
  <p><a class="btn btn-outline" href="mailto:${cfg.email}?subject=${encodeURIComponent('Demande de devis PACk Formation')}">Demander un devis de formation</a></p>`,
  serviceLd(packs.formation, '1900', 'par jour'));

packPage(packs.agents, () => `
  <h2 class="h2">Exemples d’agents</h2>
  <ul class="checklist">${packs.agents.examples.map((x) => `<li>${x}</li>`).join('')}</ul>
  <h2 class="h2">Avant d’installer : les prérequis</h2>
  <ul class="checklist">${packs.agents.prerequisites.map((x) => `<li>${x}</li>`).join('')}</ul>
  <h2 class="h2">L’installation</h2>
  <p>${packs.agents.installation}</p>
  <h2 class="h2">Ce que couvre l’abonnement</h2>
  <ul class="checklist">${packs.agents.subscription.map((x) => `<li>${x}</li>`).join('')}</ul>
  <p class="note">Non inclus : ${packs.agents.notIncluded.map((x) => x.charAt(0).toLowerCase() + x.slice(1).replace(/\.$/, '')).join(' ; ')}.</p>
  <h2 class="h2">Vos données</h2>
  <ul class="cards-2">${home.data.map((d) => `<li><h3>${d.title}</h3><p>${d.text}</p></li>`).join('')}</ul>`,
  serviceLd(packs.agents, '139', 'par agent et par mois, après installation'));

// Tarifs
layout({
  path: 'tarifs/',
  title: 'Tarifs PACk IA PME : audit, formation, agents | Artru Consulting',
  description: 'Tous les prix HT de l’offre PACk IA PME : audit 450 € par métier, formation 1 900 € par jour, agents à partir de 139 € par mois.',
  jsonld: [orgLd],
  body: (r) => `${pageHead('Tarifs', 'Des prix annoncés d’avance', 'Tous les prix sont hors taxes. Le devis fixe le livrable, le délai et le prix ferme.')}
<section class="section section-light"><div class="container">
  <div class="table-wrap"><table class="price-table">
    <caption class="sr-only">Grille des prix PACk IA PME</caption>
    <thead><tr><th scope="col">Pack</th><th scope="col">Durée</th><th scope="col">Ce que vous recevez</th><th scope="col">Prix HT</th></tr></thead>
    <tbody>
      <tr><th scope="row"><a href="${r}audit/">PACk Audit</a></th><td>${packs.audit.duration}</td><td>${packs.audit.deliverable}</td><td><strong>450 €</strong> par métier, synthèse et restitution incluses<br><span class="note">${packs.audit.example}</span></td></tr>
      <tr><th scope="row"><a href="${r}formation/">PACk Formation</a></th><td>${packs.formation.duration}</td><td>${packs.formation.deliverable}</td><td><strong>1 900 €</strong> par jour, groupe jusqu’à 10 personnes<br><span class="note">${packs.formation.example}</span></td></tr>
      <tr><th scope="row"><a href="${r}agents/">PACk Agents</a></th><td>${packs.agents.duration}</td><td>${packs.agents.deliverable}</td><td>Installation à partir de <strong>1 600 €</strong>, puis à partir de <strong>139 €</strong> par agent et par mois<br><span class="note">${packs.agents.example}</span></td></tr>
    </tbody>
  </table></div>
  <p class="note">Licences des outils d’IA à la charge du client. Nouvelles fonctions et connexions sur devis. Financement OPCO possible pour la formation uniquement : <a href="${r}financement/">voir le financement</a>.</p>
</div></section>
${finalCta()}`,
});

// Financement
layout({
  path: 'financement/',
  title: 'Financement OPCO et Qualiopi | Artru Consulting',
  description: 'Artru Consulting est certifié Qualiopi pour les actions de formation. Ce que votre OPCO peut financer, et ce qu’il ne finance pas.',
  jsonld: [orgLd],
  body: (r) => `${pageHead('Financement', financement.title, financement.intro)}
<section class="section section-light"><div class="container narrow">
  <ul class="cards-1">${financement.blocks.map((b) => `<li><h2 class="h3">${b.title}</h2><p>${b.text}</p></li>`).join('')}</ul>
  <h2 class="h2">Comment on vous aide</h2>
  <ol class="numbered">${financement.steps.map((s) => `<li>${s}</li>`).join('')}</ol>
  <div class="qualiopi-box">
    <img src="${r}assets/qualiopi.svg" alt="Qualiopi, processus certifié" width="190" height="58" loading="lazy">
    <p>La certification qualité a été délivrée au titre de la catégorie d’actions suivante : <strong>actions de formation</strong>.<br>Certificat n° ${legal.qualiopiNumero}, délivré par ${legal.qualiopiCertificateur}, valable ${legal.qualiopiValidite}.<br>Déclaration d’activité n° ${legal.nda}.</p>
    <a class="btn btn-outline" href="${r}${legal.qualiopiPdf}" target="_blank" rel="noopener">Voir le certificat (PDF)</a>
  </div>
</div></section>
${finalCta()}`,
});

// À propos
layout({
  path: 'a-propos/',
  title: 'À propos : Pierre Artru, fondateur d’Artru Consulting',
  description: 'Pierre Artru, plus de vingt ans de direction d’entreprise, formateur certifié PCM®, accompagne les PME dans l’adoption de l’IA. Lyon et Auvergne-Rhône-Alpes.',
  jsonld: [orgLd, { '@context': 'https://schema.org', '@type': 'Person', name: 'Pierre Artru', jobTitle: 'Fondateur', worksFor: { '@type': 'Organization', name: legal.raisonSociale }, sameAs: [cfg.linkedin] }],
  body: (r) => `${pageHead(about.kicker, about.title, about.intro)}
<section class="section section-light"><div class="container founder">
  <div class="founder-photo">${pierreImg(r, 'founder-img', false)}<span class="founder-badge"><strong>${about.badge.value}</strong> ${about.badge.label}</span></div>
  <div class="founder-text">
    <h2 class="founder-name">${about.name}</h2>
    <p class="founder-role">${about.role}</p>
    ${about.bio.map((p) => `<p>${p}</p>`).join('')}
    <p class="conviction">Ma conviction tient en une ligne : <strong>${about.conviction}</strong></p>
    <div class="btn-row">${ext(cfg.linkedin, 'LinkedIn', 'btn btn-outline')}${cta('btn btn-primary')}</div>
  </div>
</div></section>
<section class="section"><div class="container">
  <ul class="figures">${about.figures.map((f) => `<li><strong>${f.value}</strong><span>${f.label}</span></li>`).join('')}</ul>
  <p class="note center"><a href="${r}${legal.qualiopiPdf}" target="_blank" rel="noopener">Voir le certificat Qualiopi</a> (actions de formation, déclaration d’activité n° ${legal.nda}).</p>
</div></section>
<section class="section section-light"><div class="container narrow">
  <h2 class="h2">${about.whyTitle}</h2>
  ${about.why.map((p) => `<p>${p}</p>`).join('')}
  <div class="cards-2 do-dont">
    <div><h3>${about.doTitle}</h3><ul class="checklist">${about.do.map((x) => `<li>${x}</li>`).join('')}</ul></div>
    <div><h3>${about.dontTitle}</h3><ul class="crosslist">${about.dont.map((x) => `<li>${x}</li>`).join('')}</ul></div>
  </div>
</div></section>
<section class="section"><div class="container">
  <h2 class="section-title center">${home.methodTitle}</h2>
  ${methodBlock(r)}
  <p class="section-intro center">${about.principles}</p>
</div></section>
<section class="section section-light"><div class="container narrow">
  <h2 class="h2">${about.trustTitle}</h2>
  <ul class="checklist">${about.trust.map((x) => `<li>${x}</li>`).join('')}</ul>
  ${partnerBlock()}
</div></section>
${finalCta()}`,
});

// FAQ
layout({
  path: 'faq/',
  title: 'Questions fréquentes sur le PACk IA PME | Artru Consulting',
  description: 'Par quel pack commencer, financement OPCO, outils, hébergement des données, engagement : les réponses aux questions fréquentes.',
  jsonld: [orgLd, faqLd(faq)],
  body: () => `${pageHead('FAQ', 'Questions fréquentes', '')}
<section class="section section-light"><div class="container narrow">${faqBlock(faq)}</div></section>
${finalCta()}`,
});

// Contact
layout({
  path: 'contact/',
  title: 'Réserver 30 minutes avec Pierre Artru | Artru Consulting',
  description: 'Un échange de 30 minutes, offert, pour regarder votre situation et savoir quel pack a du sens, ou aucun.',
  jsonld: [orgLd],
  body: () => `${pageHead('Contact', home.finalTitle, home.finalText)}
<section class="section section-light"><div class="container narrow center">
  <p>${cta('btn btn-primary btn-lg')}</p>
  <p class="note">La prise de rendez-vous se fait sur Calendly, dans un nouvel onglet.</p>
  <ul class="contact-list">
    <li>E-mail : <a href="mailto:${cfg.email}">${cfg.email}</a></li>
    <li>Téléphone : <a href="${cfg.phoneHref}">${cfg.phone}</a></li>
    <li>${ext(cfg.linkedin, 'Pierre Artru sur LinkedIn')}</li>
    <li>Basé à Lyon, interventions en Auvergne-Rhône-Alpes et en visio.</li>
  </ul>
</div></section>`,
});

// Références et sources (page factuelle)
layout({
  path: 'references-et-sources/',
  title: 'Références et sources : offre PACk IA PME d’Artru Consulting',
  description: references.intro,
  jsonld: [orgLd, ...PACKS.map((p) => serviceLd(p, p.priceCard.amount.replace(/\s/g, ''), p.priceCard.detail))],
  body: (r) => `${pageHead('Fiche factuelle', references.title, references.intro)}
<section class="section section-light"><div class="container narrow facts">
  <h2 class="h2">L’entreprise</h2>
  <ul>
    <li>${legal.raisonSociale}, ${legal.forme}, ${legal.rcs}. Président : ${legal.president}.</li>
    <li>Fondée en 2023. Basée à Lyon, interventions en Auvergne-Rhône-Alpes et en visio.</li>
    <li>Organisme de formation certifié Qualiopi pour les actions de formation : certificat n° ${legal.qualiopiNumero} (${legal.qualiopiCertificateur}), valable ${legal.qualiopiValidite}. Déclaration d’activité n° ${legal.nda}. <a href="${r}${legal.qualiopiPdf}">Certificat (PDF)</a>.</li>
    <li>Fondateur : Pierre Artru, plus de vingt ans de direction d’agences au sein du groupe Altavia, formateur certifié PCM®. ${ext(cfg.linkedin, 'Profil LinkedIn')}.</li>
  </ul>
  <h2 class="h2">L’offre et les prix (HT)</h2>
  <ul>${PACKS.map((p) => `<li><strong>${p.name}</strong> (${p.duration}) : ${p.priceShort}. ${p.deliverable}</li>`).join('')}</ul>
  <h2 class="h2">Ce que nous ne promettons pas</h2>
  <ul>
    <li>Aucun retour sur investissement garanti : l’audit fixe des indicateurs de départ et un objectif de mesure à 90 jours.</li>
    <li>Aucune prise en charge OPCO garantie : seule la formation est éligible, selon la situation du client.</li>
    <li>L’audit et les agents ne sont pas des actions de formation.</li>
  </ul>
  <h2 class="h2">Politique de données</h2>
  <ul>${home.data.map((d) => `<li><strong>${d.title}</strong> : ${d.text}</li>`).join('')}</ul>
  <p class="note">Dernière mise à jour : 30 octobre 2026.</p>
</div></section>`,
});

// Mentions légales
layout({
  path: 'mentions-legales/',
  title: 'Mentions légales | Artru Consulting',
  description: 'Mentions légales du site PACk IA PME d’Artru Consulting.',
  body: () => `${pageHead('', 'Mentions légales', '')}
<section class="section section-light"><div class="container narrow legal">
  <h2 class="h3">Éditeur du site</h2>
  <p>${legal.raisonSociale}, ${legal.forme} au capital de ${legal.capital}<br>
  Siège social : ${legal.siege}<br>
  ${legal.rcs} (EUID ${legal.euid})<br>
  ${legal.tva ? `TVA intracommunautaire : ${legal.tva}<br>` : '<!-- TVA intracommunautaire : à compléter -->'}
  Président et directeur de la publication : ${legal.directeurPublication}<br>
  Contact : <a href="mailto:${cfg.email}">${cfg.email}</a>, ${cfg.phone}</p>
  <h2 class="h3">Organisme de formation</h2>
  <p>Déclaration d’activité enregistrée sous le n° ${legal.nda} auprès du préfet de la région Auvergne-Rhône-Alpes. Cet enregistrement ne vaut pas agrément de l’État.<br>
  Certification Qualiopi n° ${legal.qualiopiNumero}, délivrée par ${legal.qualiopiCertificateur} au titre de la catégorie : actions de formation.</p>
  <h2 class="h3">Hébergement</h2>
  <p>${legal.hebergeur}</p>
  <h2 class="h3">Propriété intellectuelle</h2>
  <p>Les textes, visuels et logos de ce site appartiennent à ${legal.raisonSociale}, sauf mention contraire. Process Communication Model® est une marque déposée. Les noms d’outils cités (ChatGPT, Gemini, Claude, Mistral) appartiennent à leurs éditeurs respectifs ; leur mention n’implique aucun partenariat.</p>
  <h2 class="h3">Données personnelles</h2>
  <p>Voir la <a href="../confidentialite/">politique de confidentialité</a>.</p>
</div></section>`,
});

// Confidentialité
layout({
  path: 'confidentialite/',
  title: 'Politique de confidentialité | Artru Consulting',
  description: 'Ce site ne dépose aucun cookie et n’utilise aucun traceur. Ce que deviennent les données que vous nous transmettez.',
  body: () => `${pageHead('', 'Politique de confidentialité', 'Ce site ne dépose aucun cookie et n’utilise aucun traceur publicitaire ou de mesure d’audience.')}
<section class="section section-light"><div class="container narrow legal">
  <h2 class="h3">Responsable du traitement</h2>
  <p>${legal.raisonSociale}, ${legal.siege}. Contact : <a href="mailto:${cfg.email}">${cfg.email}</a>.</p>
  <h2 class="h3">Données collectées</h2>
  <p>Ce site ne collecte aucune donnée par lui-même. Si vous nous écrivez par e-mail, nous utilisons vos coordonnées pour vous répondre, et les conservons au plus trois ans après notre dernier échange.</p>
  <h2 class="h3">Prise de rendez-vous</h2>
  <p>Les boutons « Réserver 30 minutes » ouvrent Calendly, un service édité par Calendly LLC (États-Unis). Les informations saisies (nom, e-mail, réponses) sont traitées par Calendly selon sa propre politique de confidentialité, puis utilisées par ${legal.raisonSociale} uniquement pour préparer et tenir le rendez-vous.</p>
  <h2 class="h3">Polices de caractères</h2>
  <p>Les polices du site sont chargées depuis Google Fonts, ce qui transmet votre adresse IP à Google lors du chargement de la page.</p>
  <h2 class="h3">Vos droits</h2>
  <p>Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de limitation sur vos données. Écrivez-nous à <a href="mailto:${cfg.email}">${cfg.email}</a>. Vous pouvez aussi saisir la CNIL (cnil.fr).</p>
</div></section>`,
});

// 404
layout({
  path: '404/',
  out: '404.html',
  base: true,
  noindex: true,
  title: 'Page introuvable | Artru Consulting',
  description: 'Cette page n’existe pas.',
  body: (r) => `${pageHead('Erreur 404', 'Cette page n’existe pas.', `<a href="${r}">Revenir à l’accueil</a>`)}`,
});

// ------------------------------------------------------------------ fichiers techniques
const pages = ['', 'audit/', 'formation/', 'agents/', 'tarifs/', 'financement/', 'a-propos/', 'faq/', 'contact/', 'references-et-sources/', 'mentions-legales/', 'confidentialite/'];
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${cfg.siteUrl}${p}</loc><lastmod>${cfg.updated}</lastmod></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /b/\nSitemap: ${cfg.siteUrl}sitemap.xml\n`);
writeFileSync(join(ROOT, 'llms.txt'), `# PACk IA PME — Artru Consulting

> Offre IA pour PME de 10 à 250 salariés : audit métier par métier, formation certifiée Qualiopi, agents IA hébergés en France. Lyon et Auvergne-Rhône-Alpes. Mise à jour : ${cfg.updated}.

## Offre et prix (HT)
${PACKS.map((p) => `- ${p.name} (${p.duration}) : ${p.priceShort}. ${p.deliverable}`).join('\n')}

## Points importants
- Certification Qualiopi n° ${legal.qualiopiNumero} pour les actions de formation uniquement. Déclaration d’activité n° ${legal.nda}.
- L’audit et les agents ne sont pas finançables par les OPCO.
- Aucun retour sur investissement garanti : indicateurs de départ et objectif de mesure à 90 jours écrits au devis.

## Pages
- [Fiche factuelle](${cfg.siteUrl}references-et-sources/)
- [Tarifs](${cfg.siteUrl}tarifs/)
- [À propos de Pierre Artru](${cfg.siteUrl}a-propos/)
- [Questions fréquentes](${cfg.siteUrl}faq/)
`);
console.log(`OK : ${pages.length + 2} pages générées.`);
