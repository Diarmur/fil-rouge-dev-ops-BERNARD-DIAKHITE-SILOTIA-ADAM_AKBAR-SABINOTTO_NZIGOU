# Projet fil rouge DevOps — Mini-blog

## 1. Présentation générale

Ce projet est réalisé dans le cadre du fil rouge DevOps.

L'objectif est de construire une application web simple, puis de la faire évoluer progressivement vers une démarche DevOps complète :

- gestion du code avec Git et GitHub ;
- développement d'une application web avec frontend, backend et base de données ;
- conteneurisation avec Docker ;
- orchestration locale avec Docker Compose ;
- préparation d'une pipeline d'intégration continue ;
- préparation d'un futur déploiement Kubernetes ;
- documentation technique et documentation d'exploitation ;
- préparation d'une soutenance avec explication de l'architecture.

Le sujet retenu est un **mini-blog**.

L'application permet actuellement de :

- consulter la liste des articles publiés ;
- créer un nouvel article avec un titre et un contenu ;
- supprimer un article existant ;
- vérifier l'état du backend avec une route `/health`.

La fonctionnalité de modification d'article pourra être ajoutée dans une future version.

---

## 2. Équipe projet

**Groupe :** 3

| Membre | Rôle | Responsabilité principale |
|---|---|---|
| Mathis NZIGOU | Lead Dev | Développement de l'application |
| Claude SABINOTO | Lead Ops | Déploiement, Docker, supervision |
| Najm Adam AKBAR | Lead Qualité / CI | Tests automatisés et pipeline CI/CD |
| Ugo BERNARD | Lead Qualité / CI | Tests, pipeline CI/CD, documentation technique |
| Mariama DIAKHITE | Lead Doc / Produit | Documentation, suivi du projet, besoin fonctionnel |

Les rôles peuvent évoluer pendant le projet. Chaque membre peut intervenir sur plusieurs parties selon l'avancement et les besoins du groupe.

---

## 3. Dépôt GitHub

Dépôt du projet :

```text
https://github.com/Diarmur/fil-rouge-dev-ops-BERNARD-DIAKHITE-SILOTIA-ADAM_AKBAR-SABINOTTO_NZIGOU
```

Le dépôt contient :

- le code source du frontend ;
- le code source du backend ;
- les fichiers Docker ;
- le fichier Docker Compose ;
- le script d'initialisation PostgreSQL ;
- la documentation du projet.

---

## 4. Description du sujet

Le projet est une application de type **mini-blog**.

Un utilisateur peut publier un article composé :

- d'un titre ;
- d'un contenu ;
- d'une date de création automatique.

Les articles sont stockés dans une base de données PostgreSQL afin de conserver les publications même après un redémarrage des conteneurs.

Ce sujet a été choisi car il permet de travailler sur une architecture simple mais réaliste :

- une interface web ;
- une API REST ;
- une base de données ;
- une communication entre plusieurs services ;
- une persistance des données ;
- un déploiement reproductible.

Le but principal n'est pas de produire une application très complexe, mais de disposer d'un support clair pour mettre en pratique les concepts DevOps.

---

## 5. Objectifs du fil rouge

### Objectif 1 — Conteneuriser l'application

Le premier objectif est de rendre l'application exécutable dans des conteneurs Docker.

Chaque partie de l'application dispose de son propre conteneur :

- un conteneur pour le frontend ;
- un conteneur pour le backend ;
- un conteneur pour la base de données.

Cela permet de ne pas dépendre directement de l'environnement de la machine hôte.

---

### Objectif 2 — Orchestrer les services avec Docker Compose

Le deuxième objectif est de lancer toute l'application avec une seule commande :

```bash
docker compose up -d --build
```

Docker Compose permet de décrire toute l'architecture dans un seul fichier :

```text
docker-compose.yml
```

Ce fichier définit :

- les images utilisées ;
- les services à lancer ;
- les ports exposés ;
- les variables d'environnement ;
- les volumes ;
- le réseau interne ;
- les dépendances entre services.

---

### Objectif 3 — Préparer une démarche DevOps complète

Le troisième objectif est de préparer les étapes suivantes du projet :

- ajout d'une pipeline CI ;
- automatisation des tests ;
- vérification automatique du build Docker ;
- déploiement Kubernetes ;
- monitoring ;
- scan de sécurité ;
- documentation d'exploitation ;
- post-mortem en cas d'incident.

---

## 6. Stack technique

| Composant | Technologie | Rôle |
|---|---|---|
| Frontend | Vue.js / Vite | Interface utilisateur du mini-blog |
| Backend | Node.js / Express | API REST |
| Base de données | PostgreSQL | Stockage persistant des articles |
| Serveur web frontend | Nginx | Service du frontend compilé |
| Conteneurisation | Docker | Création des images applicatives |
| Orchestration locale | Docker Compose | Lancement multi-services |
| Système de déploiement | Debian 12 | VM utilisée pour le déploiement |
| Gestion de version | Git / GitHub | Suivi du code et collaboration |

---

## 7. Justification des choix techniques

### Vue.js

Vue.js a été choisi pour le frontend car c'est un framework moderne, simple à prendre en main et adapté aux petites applications web.

Dans ce projet, Vue permet :

- d'afficher dynamiquement les articles ;
- de gérer un formulaire de création ;
- de rafraîchir la liste des articles après une action utilisateur ;
- de communiquer avec l'API backend.

---

### Vite

Vite est utilisé avec Vue.js pour faciliter le développement et générer une version optimisée du frontend.

Lors du build Docker, Vite produit des fichiers statiques dans le dossier `dist`.

Ces fichiers sont ensuite servis par Nginx.

---

### Node.js / Express

Express.js a été choisi pour le backend car il permet de créer rapidement une API REST simple.

Dans ce projet, Express permet :

- de définir les routes de l'API ;
- de recevoir les requêtes HTTP ;
- de traiter les données envoyées par le frontend ;
- de communiquer avec PostgreSQL ;
- de renvoyer des réponses JSON.

---

### PostgreSQL

PostgreSQL a été choisi comme base de données car c'est une solution fiable, robuste et largement utilisée en entreprise.

Dans ce projet, PostgreSQL permet :

- de stocker les articles ;
- de conserver les données après redémarrage ;
- d'utiliser une vraie base relationnelle ;
- de préparer un cas d'usage réaliste pour Docker Compose et Kubernetes.

---

### Nginx

Nginx est utilisé pour servir le frontend compilé.

Il permet également de rediriger les appels API vers le backend grâce à une configuration de proxy.

Cela évite au navigateur d'appeler directement le backend sur un autre port.

---

### Docker

Docker permet d'encapsuler chaque partie de l'application dans une image.

Cela rend l'exécution du projet plus simple et plus reproductible.

Avec Docker, il n'est pas nécessaire d'installer manuellement Node.js, Nginx ou PostgreSQL sur la machine hôte.

---

### Docker Compose

Docker Compose est utilisé car l'application contient plusieurs services qui doivent fonctionner ensemble.

Il permet de démarrer toute l'architecture avec une seule commande.

---

## 8. Architecture globale

L'application est organisée en trois services principaux :

```text
+-------------------+
|   Navigateur web  |
+---------+---------+
          |
          | HTTP :8080
          v
+-------------------+
| client / Nginx    |
| Frontend Vue.js   |
+---------+---------+
          |
          | Requêtes /api/*
          v
+-------------------+
| server / Express  |
| API REST          |
+---------+---------+
          |
          | DATABASE_URL
          v
+-------------------+
| db / PostgreSQL   |
| Table posts       |
+-------------------+
```

### Explication simple

L'utilisateur ouvre l'application dans son navigateur avec l'adresse :

```text
http://IP_DE_LA_VM:8080
```

Le service `client` sert le frontend Vue.js grâce à Nginx.

Quand le frontend doit récupérer les articles, il appelle :

```text
/api/posts
```

Nginx redirige cette requête vers le backend Express :

```text
server:3000
```

Le backend interroge PostgreSQL avec une requête SQL.

PostgreSQL renvoie les articles au backend.

Le backend renvoie les données au frontend au format JSON.

Vue.js affiche ensuite les articles dans la page.

---

## 9. Description des services

## 9.1 Service `client`

Le service `client` correspond au frontend.

Il utilise un Dockerfile multi-stage.

### Étape 1 — Build Vue.js

La première étape utilise Node.js pour installer les dépendances et compiler l'application Vue.

Image utilisée :

```text
node:22-alpine
```

### Étape 2 — Serveur Nginx

La deuxième étape utilise Nginx pour servir les fichiers statiques générés.

Image utilisée :

```text
nginx:1.27-alpine
```

### Port exposé

Dans Docker Compose :

```yaml
ports:
  - "8080:80"
```

Cela signifie :

- port `8080` sur la VM ;
- port `80` dans le conteneur Nginx.

L'application est donc accessible avec :

```text
http://IP_DE_LA_VM:8080
```

---

## 9.2 Service `server`

Le service `server` correspond au backend.

Il utilise :

- Node.js ;
- Express ;
- le package `pg` pour communiquer avec PostgreSQL.

Image utilisée :

```text
node:22-alpine
```

Le backend expose le port :

```text
3000
```

Routes principales :

```text
GET    /health
GET    /api/posts
POST   /api/posts
DELETE /api/posts/:id
```

Le port `3000` est exposé dans le cadre du TP pour tester directement l'API avec `curl`.

---

## 9.3 Service `db`

Le service `db` correspond à PostgreSQL.

Image utilisée :

```text
postgres:16-alpine
```

La base est initialisée automatiquement au premier lancement grâce au fichier :

```text
db/init.sql
```

Le service utilise un volume nommé :

```text
postgres_data
```

Ce volume permet de conserver les données même si le conteneur PostgreSQL est supprimé ou recréé.

---

## 10. Docker Compose

Le fichier principal de déploiement est :

```text
docker-compose.yml
```

Il définit les trois services :

```text
client
server
db
```

### Rôle de Docker Compose

Docker Compose permet de :

- construire les images du frontend et du backend ;
- télécharger l'image PostgreSQL ;
- créer un réseau interne ;
- créer un volume pour PostgreSQL ;
- lancer les conteneurs ;
- gérer l'ordre de démarrage ;
- vérifier l'état de la base avec un healthcheck.

### Healthcheck PostgreSQL

Le service `db` possède un healthcheck :

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
  interval: 5s
  timeout: 5s
  retries: 10
```

Cela permet de vérifier que PostgreSQL est bien prêt avant de considérer le service comme disponible.

Le backend dépend de cette vérification :

```yaml
depends_on:
  db:
    condition: service_healthy
```

---

## 11. Réseau Docker

Docker Compose crée automatiquement un réseau interne.

Les conteneurs peuvent communiquer entre eux avec leur nom de service.

Exemples :

```text
server -> db:5432
client -> server:3000
```

Point important :

Dans un conteneur, `localhost` désigne le conteneur lui-même.

Le backend ne doit donc pas se connecter à :

```text
localhost:5432
```

Il doit se connecter au service PostgreSQL avec le nom Docker Compose :

```text
db:5432
```

C'est pour cela que la variable de connexion contient :

```text
postgres://app:app_password@db:5432/appdb
```

---

## 12. Variables d'environnement

Le backend utilise la variable suivante :

```text
DATABASE_URL=postgres://app:app_password@db:5432/appdb
```

Cette variable contient :

- le type de base : PostgreSQL ;
- l'utilisateur : `app` ;
- le mot de passe : `app_password` ;
- l'hôte : `db` ;
- le port : `5432` ;
- le nom de la base : `appdb`.

Dans le cadre du TP, ces informations sont présentes dans `docker-compose.yml`.

Dans un contexte de production, les secrets ne doivent pas être écrits directement dans le dépôt Git.

Il faudrait plutôt utiliser :

- un fichier `.env` ignoré par Git ;
- des variables d'environnement injectées par la plateforme ;
- Docker secrets ;
- Kubernetes secrets.

---

## 13. Modèle de données

La base contient une table principale : `posts`.

Création de la table :

```sql
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Description des champs

| Champ | Type | Description |
|---|---|---|
| id | SERIAL | Identifiant unique de l'article |
| title | VARCHAR(200) | Titre de l'article |
| content | TEXT | Contenu de l'article |
| created_at | TIMESTAMP | Date de création automatique |

Un article de test est inséré au premier lancement :

```sql
INSERT INTO posts (title, content)
SELECT 'Premier article', 'Bienvenue sur le mini-blog DevOps.'
WHERE NOT EXISTS (SELECT 1 FROM posts);
```

---

## 14. API REST

## 14.1 Vérifier l'état de l'API

Route :

```http
GET /health
```

Exemple :

```bash
curl http://localhost:3000/health
```

Réponse attendue :

```json
{
  "status": "ok",
  "service": "mini-blog-api"
}
```

Cette route sert à vérifier que le backend fonctionne.

---

## 14.2 Lister les articles

Route :

```http
GET /api/posts
```

Exemple :

```bash
curl http://localhost:3000/api/posts
```

Réponse attendue :

```json
[
  {
    "id": 1,
    "title": "Premier article",
    "content": "Bienvenue sur le mini-blog DevOps.",
    "created_at": "2026-06-04T08:10:00.000Z"
  }
]
```

---

## 14.3 Créer un article

Route :

```http
POST /api/posts
```

Corps JSON attendu :

```json
{
  "title": "Titre de l'article",
  "content": "Contenu de l'article"
}
```

Exemple :

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Article de test","content":"Contenu de test"}'
```

Réponse attendue :

```json
{
  "id": 2,
  "title": "Article de test",
  "content": "Contenu de test",
  "created_at": "2026-06-04T08:15:00.000Z"
}
```

---

## 14.4 Supprimer un article

Route :

```http
DELETE /api/posts/:id
```

Exemple :

```bash
curl -X DELETE http://localhost:3000/api/posts/2
```

Réponse attendue :

```text
HTTP 204 No Content
```

---

## 15. Structure du projet

```text
.
├── client
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── src
│   │   └── App.vue
│   └── .dockerignore
│
├── server
│   ├── Dockerfile
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   ├── routes
│   │   └── posts.js
│   └── .dockerignore
│
├── db
│   └── init.sql
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 16. Prérequis

Pour lancer le projet, il faut avoir :

- Git ;
- Docker ;
- Docker Compose ;
- une machine Linux ou une VM Linux.

Le projet a été testé sur une VM Debian 12.

Vérifier Docker :

```bash
docker --version
```

Vérifier Docker Compose :

```bash
docker compose version
```

---

## 17. Installation et lancement

Cloner le dépôt :

```bash
git clone https://github.com/Diarmur/fil-rouge-dev-ops-BERNARD-DIAKHITE-SILOTIA-ADAM_AKBAR-SABINOTTO_NZIGOU
```

Entrer dans le dossier :

```bash
cd fil-rouge-dev-ops-BERNARD-DIAKHITE-SILOTIA-ADAM_AKBAR-SABINOTTO_NZIGOU
```

Lancer l'application :

```bash
docker compose up -d --build
```

Si l'utilisateur n'a pas les droits Docker :

```bash
sudo docker compose up -d --build
```

---

## 18. Vérification du déploiement

Afficher les conteneurs :

```bash
docker compose ps
```

Résultat attendu :

```text
NAME               SERVICE   STATUS
filrouge-client    client    Up
filrouge-server    server    Up
filrouge-db        db        Up / healthy
```

Tester le backend :

```bash
curl http://localhost:3000/health
```

Tester l'API directement :

```bash
curl http://localhost:3000/api/posts
```

Tester l'API via Nginx :

```bash
curl http://localhost:8080/api/posts
```

Ouvrir l'application dans un navigateur :

```text
http://IP_DE_LA_VM:8080
```

---

## 19. Commandes utiles

### Lancer le projet

```bash
docker compose up -d --build
```

### Voir l'état des conteneurs

```bash
docker compose ps
```

### Voir les logs

```bash
docker compose logs -f
```

### Voir les logs du backend

```bash
docker compose logs -f server
```

### Voir les logs du frontend

```bash
docker compose logs -f client
```

### Voir les logs de PostgreSQL

```bash
docker compose logs -f db
```

### Redémarrer les services

```bash
docker compose restart
```

### Arrêter les services

```bash
docker compose down
```

### Arrêter et supprimer la base de données

```bash
docker compose down -v
```

Attention : `docker compose down -v` supprime le volume PostgreSQL et donc les articles enregistrés.

---

## 20. Persistance des données

PostgreSQL utilise un volume Docker :

```text
postgres_data
```

Ce volume est déclaré dans `docker-compose.yml`.

Il permet de conserver les données même si le conteneur PostgreSQL est supprimé.

Sans volume, les articles seraient perdus à chaque recréation du conteneur.

---

## 21. Sécurité

Bonnes pratiques déjà présentes ou prévues :

- utilisation d'images officielles ;
- utilisation de tags explicites au lieu de `latest` ;
- séparation frontend / backend / base de données ;
- base PostgreSQL non exposée directement sur la machine hôte ;
- utilisation d'un réseau Docker interne ;
- utilisation d'un fichier `.dockerignore` ;
- ajout d'un `.gitignore` pour éviter de versionner les fichiers inutiles ;
- route `/health` pour vérifier l'état du backend.

Limite actuelle :

Le mot de passe PostgreSQL est encore visible dans `docker-compose.yml` pour simplifier le TP.

Amélioration prévue :

Utiliser un fichier `.env` non versionné ou des secrets Docker/Kubernetes.

---

## 22. Explication du fonctionnement pour la soutenance

### Scénario : affichage des articles

1. L'utilisateur ouvre le navigateur.
2. Il accède à `http://IP_DE_LA_VM:8080`.
3. Nginx sert le frontend Vue.js.
4. Vue.js appelle `/api/posts`.
5. Nginx redirige `/api/posts` vers `server:3000`.
6. Express reçoit la requête.
7. Express interroge PostgreSQL.
8. PostgreSQL renvoie les articles.
9. Express renvoie les articles au format JSON.
10. Vue.js affiche les articles dans la page.

### Scénario : création d'un article

1. L'utilisateur remplit le formulaire.
2. Le frontend envoie une requête `POST /api/posts`.
3. Le backend vérifie que le titre et le contenu sont présents.
4. Le backend insère l'article dans PostgreSQL.
5. PostgreSQL renvoie l'article créé.
6. Le frontend recharge la liste des articles.

### Scénario : suppression d'un article

1. L'utilisateur clique sur le bouton supprimer.
2. Le frontend envoie une requête `DELETE /api/posts/:id`.
3. Le backend exécute une requête SQL `DELETE`.
4. Le frontend recharge la liste des articles.

---

## 23. Dépannage

### Erreur Docker permission denied

Erreur possible :

```text
permission denied while trying to connect to the docker API
```

Solution temporaire :

```bash
sudo docker compose up -d --build
```

Solution propre :

```bash
sudo usermod -aG docker $USER
```

Puis se déconnecter et se reconnecter.

---

### Port déjà utilisé

Erreur possible :

```text
port is already allocated
```

Vérifier les ports utilisés :

```bash
sudo ss -tulpn | grep :8080
```

Arrêter les conteneurs :

```bash
docker compose down
```

---

### La table PostgreSQL n'est pas mise à jour

Le fichier `init.sql` est exécuté seulement au premier démarrage de la base.

Si le volume existe déjà, PostgreSQL ne rejoue pas automatiquement le script.

Solution :

```bash
docker compose down -v
docker compose up -d --build
```

Attention : cela supprime les données existantes.

---

### Le frontend ne se met pas à jour

Rebuild du client :

```bash
docker compose build --no-cache client
docker compose up -d
```

---

## 24. Tests réalisés

| Test | Commande | Résultat attendu |
|---|---|---|
| Démarrage des services | `docker compose up -d --build` | Les conteneurs démarrent |
| État des services | `docker compose ps` | `client`, `server`, `db` sont `Up` |
| Santé API | `curl http://localhost:3000/health` | Réponse JSON avec `status: ok` |
| Liste des articles | `curl http://localhost:3000/api/posts` | Retour JSON des articles |
| Proxy Nginx | `curl http://localhost:8080/api/posts` | Retour JSON via Nginx |
| Navigateur | `http://IP_DE_LA_VM:8080` | Page mini-blog affichée |

---

## 26. Jalons du projet

| Séance | Livrable | Statut |
|---|---|---|
| S1 | README cadrage | Réalisé |
| S2 | Dockerfile(s) + DB en conteneur | Réalisé |
| S3 | Docker Compose + CI verte | Docker Compose réalisé, CI à faire |
| S4 | Manifests Kubernetes appliqués | À faire |
| S5 | Monitoring + scan + post-mortem | À faire |
| S6 | Soutenance prête | En préparation |

---

## 27. Limites actuelles

L'application est volontairement simple.

Limites actuelles :

- pas d'authentification ;
- pas de gestion des utilisateurs ;
- pas encore de modification d'article ;
- pas de pagination ;
- pas de tests unitaires avancés ;
- pas encore de pipeline CI complète ;
- pas encore de déploiement Kubernetes ;
- pas encore de monitoring.

Ces limites sont cohérentes avec l'objectif du fil rouge : construire progressivement une démarche DevOps autour d'une application simple.

---

## 28. Améliorations prévues

Améliorations possibles :

- ajouter la modification d'article ;
- ajouter une pipeline GitHub Actions ;
- ajouter des tests automatisés backend ;
- ajouter une vérification du build frontend ;
- ajouter un scan de vulnérabilités ;
- créer les manifests Kubernetes ;
- ajouter Prometheus et Grafana ;
- ajouter une procédure de sauvegarde PostgreSQL ;
- ajouter une procédure de restauration PostgreSQL ;
- ajouter une documentation d'exploitation ;
- ajouter un post-mortem d'incident.

---

## 29. Conclusion

Cette première version du projet met en place un mini-blog fonctionnel et conteneurisé.

L'application repose sur une architecture simple mais réaliste :

- un frontend Vue.js ;
- une API Express.js ;
- une base PostgreSQL ;
- un serveur Nginx ;
- une orchestration Docker Compose.

Cette base permet de répondre aux premiers objectifs du fil rouge DevOps et servira de support pour les prochaines étapes : pipeline CI, Kubernetes, monitoring, sécurité et soutenance.
