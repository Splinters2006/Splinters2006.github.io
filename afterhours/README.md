# MetwoVT — Le petit labo

Page de liens statique, en français, sans installation de dépendances ni compilation.

## Publier sur GitHub Pages

1. Créer un dépôt GitHub et y déposer **le contenu de ce dossier** : `dist/`, `scripts/`, `.github/`, `.gitignore` et `README.md` doivent être à la racine du dépôt. Le dossier caché `.github/` contient le déploiement automatique ; ne pas l'oublier.
2. Dans le dépôt, ouvrir **Settings → Pages → Build and deployment → Source** et choisir **GitHub Actions**.
3. Pousser les fichiers sur la branche par défaut. Si les fichiers ont été poussés avant l'activation de Pages, ouvrir **Actions → Deploy to GitHub Pages → Run workflow**, sur cette même branche.
4. Le workflow publie le site et affiche son URL dans le déploiement `github-pages`. Les modifications suivantes de la branche par défaut sont publiées automatiquement.

Procédure officielle : [déployer avec GitHub Actions](https://docs.github.com/fr/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Le workflow suit la branche par défaut du dépôt, quel que soit son nom. Les chemins relatifs fonctionnent aussi bien sur `https://UTILISATEUR.github.io/DEPOT/` que sur un domaine personnalisé. L'URL canonique et l'image de partage sont générées automatiquement à partir de l'URL réelle fournie par GitHub Pages. Aucun secret à créer, aucune installation npm et aucun service Sites nécessaire.

Pour utiliser un domaine personnalisé, le configurer dans **Settings → Pages → Custom domain**, puis relancer le workflow pour actualiser les métadonnées.

## Aperçu local

Depuis ce dossier : `python3 -m http.server 4173 --directory dist`

Ouvrir http://localhost:4173.

Pour vérifier la version préparée pour Pages, avec Node.js installé :

```sh
node scripts/prepare-pages.mjs https://UTILISATEUR.github.io/DEPOT/
python3 -m http.server 4173 --directory _site
```

Le dossier `_site/` est généré et exclu de Git. Modifier les fichiers de `dist/`, puis relancer la préparation si nécessaire.

## Personnalisation

- Liens : `dist/profile.js`. Les liens HTML servent aussi de repli sans JavaScript.
- Textes : `dist/index.html`.
- Couleurs : variables CSS au début de `dist/styles.css`. Rose `#e367a2`, brun `#8f574d`, doré `#de9f50`.
- Images : `dist/assets/`.

Le bouton de partage utilise le partage natif, le presse-papiers, ou une boîte de dialogue avec le lien sélectionnable. Aucun suivi publicitaire, cookie ou compte requis par la page. Les polices Google Fonts disposent de polices système de repli.

Sur ordinateur, **Voir sur mobile** ouvre un QR code à scanner avec l’appareil photo du téléphone. Le code est généré dans le navigateur à partir de l’adresse courante, sans l’ancre de navigation : il suit automatiquement l’URL GitHub Pages, son sous-dossier ou un domaine personnalisé. Aucun service QR externe n’est appelé. La fenêtre se ferme avec son bouton, Échap ou un clic à l’extérieur.

La bibliothèque [QRCode.js 1.0.0](https://github.com/davidshimjs/qrcodejs) est fournie localement dans `dist/vendor/`, avec sa licence MIT dans `qrcode.LICENSE.txt`.

## Provenance

Palette et liens publics relevés le 16 octobre 2026 sur https://bacharu.io/vtuber/metwovt. Twitch : https://www.twitch.tv/metwovt. Compte Bluesky vérifié par son API publique : https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=metwovt.bsky.social ; sa bio confirme Twitch et TikTok. Avatar public de sa chaîne Twitch, téléchargé depuis le cache public Bācharu. Le planning renvoie vers le planning Twitch : aucun horaire ou statut en direct n’est inventé.

La copie éditoriale est une proposition pour son site. Le titre « Baronne de la Chimie » vient de sa présentation publique. Les visuels restent ceux de leur créatrice ou de leurs ayants droit.
