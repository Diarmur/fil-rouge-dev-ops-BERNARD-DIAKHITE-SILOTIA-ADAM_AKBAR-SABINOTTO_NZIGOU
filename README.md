# README — Projet fil rouge DevOps


---

# Projet fil rouge DevOps (Mini-Blog)

**Équipe :** Najm Adam AKBAR, Mathis SILOTIA, Claude SABINOTO, Mariama DIAKHITE, Ugo BERNARD

Groupe : 3 

**Dépôt :** [https://github.com/](https://github.com/Diarmur/fil-rouge-dev-ops-BERNARD-DIAKHITE-SILOTIA-ADAM_AKBAR-SABINOTTO_NZIGOU.git)

---

## Description du sujet


Cette application permet aux utilisateurs de publier, consulter, modifier et supprimer des articles de blog. Les données sont enregistrées dans une base de données afin de conserver les publications. L'objectif du projet est de mettre en pratique les concepts DevOps tels que la conteneurisation, l'intégration continue et le déploiement. L'utilisateur cible est toute personne souhaitant partager et gérer du contenu de manière simple.
---

## Stack technique prévu

| Composant | Choix | Justification (1 phrase) |
| --------- | ----- | -------------------------- |
| Backend / API | JavaScript Express | Framework léger et populaire permettant de développer rapidement une API web. |
| Base de données | PostgreSQL | Base de données relationnelle robuste, fiable et largement utilisée dans les environnements professionnels. |
| Front | Vue | Framework moderne permettant de développer une interface utilisateur dynamique et facile à maintenir. |
| Orchestration cible | Compose puis K8s | Correspond aux technologies étudiées dans le module et aux livrables attendus. |

---

## Rôles dans l'équipe

| Membre | Rôle | Responsabilité principale |
| ------ | ---- | ------------------------- |
| Mathis | Lead Dev | Développement de l'application |
| Najm & Ugo | Lead Ops | Déploiement, Docker et supervision |
| Claude | Lead Qualité / CI | Tests automatisés et pipeline CI/CD |
| Mariama  | Lead Doc / Produit | Documentation et suivi du projet |

---

## Objectifs du fil rouge (3 minimum)

1. Conteneuriser l'application et la base de données avec Docker.
2. Mettre en place un pipeline CI pour automatiser les tests et les vérifications du projet.
3. Déployer l'application sur Kubernetes et assurer son bon fonctionnement à l'aide d'outils de supervision

---

## Jalons — état d'avancement

| Séance | Livrable | Statut (à cocher) |
| ------ | -------- | ----------------- |
| S1 | README cadrage | ☑  |
| S2 | Dockerfile(s) + DB en container | ☑ |
| S3 | docker-compose + CI vert | ☑ |
| S4 | Manifests K8s appliqués | ☐ |
| S5 | Monitoring + post-mortem | ☐ |
| S6 | Soutenance prête | ☑ |

---

## Démarrage local 

```bash
git clone https://github.com/Diarmur/fil-rouge-dev-ops-BERNARD-DIAKHITE-SILOTIA-ADAM_AKBAR-SABINOTTO_NZIGOU.git
cd fil-rouge-dev-ops-BERNARD-DIAKHITE-SILOTIA-ADAM_AKBAR-SABINOTTO_NZIGOU/client

npm install
npm run dev

Démarrage Docker

docker compose up --build

```

L'application sera accessible sur :

http://localhost:5173

Pour plus de détails :

- [README Client](./client/readme.md)
- [README Server](./server/readme.md)

## Communication d'équipe

```

Canal utilisé: teams

```
