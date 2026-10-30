# PACk IA PME — site d'Artru Consulting

Site statique (HTML, CSS, JS sans framework), publié par GitHub Pages.

## Modifier un texte, un prix ou un lien

1. Tout est dans `src/content.mjs` (prix, garanties, FAQ, textes, liens Calendly et LinkedIn, interrupteur du bloc partenaire).
2. Régénérer les pages : `node src/build.mjs` (Node 18 ou plus, aucune dépendance).
3. Les fichiers `index.html` de chaque dossier sont générés : ne pas les modifier à la main.

## Pages

`/` (variante A), `/b/` (variante B, non indexée), `/audit/`, `/formation/`, `/agents/`, `/tarifs/`, `/financement/`, `/a-propos/`, `/faq/`, `/contact/`, `/references-et-sources/`, `/mentions-legales/`, `/confidentialite/`, `404.html`, plus `sitemap.xml`, `robots.txt`, `llms.txt`.

Aucun cookie, aucun traceur.
