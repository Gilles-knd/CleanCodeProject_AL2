# Leitner System Backend

Ce projet est une implémentation backend du système Leitner, réalisé dans le cadre du cours de Clean Code. Il met en pratique l'architecture hexagonale et les principes SOLID.

## Installation

```bash
npm install
```

## Scripts disponibles

```bash
# Lancer l'application en mode développement
npm run start:dev

# Compiler le projet
npm run build

# Lancer les tests
npm run test

# Lancer les tests en mode watch
npm run test:watch
```

## Architecture

Le projet suit une architecture hexagonale (Ports & Adapters) avec trois couches principales :
- Domain : entités et règles métier
- Application : cas d'utilisation
- Infrastructure : controllers, repositories et adapteurs

## Fonctionnalités

- Création et gestion de cartes de révision
- Système de révision espacée (Leitner)
- Suivi des réponses et progression

## Technologies

- TypeScript
- Express.js
- Prisma (ORM)
- Jest (Tests)

## Base de données

```bash
# Créer une migration
npx prisma migrate dev

# Mettre à jour le client Prisma
npx prisma generate
```

---

Projet réalisé dans le cadre du cours de Clean Code à ESGI Paris, mettant en pratique l'architecture hexagonale et les principes SOLID.