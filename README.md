# Mini-blog DevOps

**Équipe :** Najma
**Groupe / promo :** B3 Cyber
**Dépôt :** https://github.com/najma-xxx/devops-fil-rouge-miniblog

## Description
Application de mini-blog permettant de créer, lire, modifier et supprimer des articles.
Stack : Node.js/Express + PostgreSQL + frontend HTML statique.

## Stack technique
| Composant | Choix | Justification |
|-----------|-------|---------------|
| Backend / API | Node.js + Express | Léger, adapté aux APIs REST |
| Base de données | PostgreSQL 15 | Relationnel, persistance fiable |
| Frontend | HTML/JS statique | Simple, focus sur le DevOps |
| Orchestration | Docker Compose puis K8s | Progression séance par séance |

## Rôles
| Membre | Rôle | Responsabilité |
|--------|------|----------------|
| Najma | Lead Dev + Ops | Code API, Dockerfile, Compose |

## Objectifs fil rouge
1. API conteneurisée avec healthcheck fonctionnel d'ici S2
2. Pipeline CI qui build et push l'image sur chaque merge main (S3)
3. Déploiement sur cluster kind avec 2 replicas d'ici S4

## Jalons
| Séance | Livrable | Statut |
|--------|----------|--------|
| S1 | README cadrage | ☑ |
| S2 | Dockerfile(s) + DB en container | ☑ |
| S3 | docker-compose + CI vert | ☐ |
| S4 | Manifests K8s | ☐ |
| S5 | Monitoring + post-mortem | ☐ |
| S6 | Soutenance | ☐ |

## Démarrage local
\`\`\`bash
git clone https://github.com/najma-xxx/devops-fil-rouge-miniblog.git
cd devops-fil-rouge-miniblog
cp .env.example .env  # remplis les valeurs
docker compose up -d
\`\`\`

## Communication
Canal : Discord / Teams

# Ouvre README.md dans VSCode et change la ligne :
# **Dépôt :** https://github.com/najma-xxx/...
# par :
# **Dépôt :** https://github.com/Diarmur/fil-rouge-dev-ops-BERNARD-DIAKHITE-SILOTIA-ADAM_AKBAR-SABINOTTO_NZIGOU