# Projet Clean Clode Système de Leitner

## Sommaire
- [Backend](#backend)
- [Frontend](#Fontend)

### Backend  `/bakend`
Ce projet est une implémentation backend du système Leitner, réalisé dans le cadre du cours de Clean Code. Il met en pratique l'architecture hexagonale et les principes SOLID.

#### Getting Started

1. Cloner le projet
```bash
git clone [url-du-projet]
cd leitner-system-backend
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env
```

4. Ajouter des infos pour la base de donnée dans le `.env`
```bash
POSTGRES_USER=_____
POSTGRES_PASSWORD=_____
POSTGRES_DB=_____
```

5. Lancer la base de données PostgreSQL avec Docker
```bash
docker compose up -d
```

6. Initialiser la base de données avec `Prisma`
```bash
# Créer les tables
npx prisma migrate dev

# Générer le client Prisma
npx prisma generate
```

7. Lancer l'application
```bash
npm run start:dev
```

L'API est maintenant accessible sur `http://localhost:8080`

#### Scripts disponibles

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

#### Technologies

- TypeScript
- Express.js
- Prisma (ORM)
- PostgreSQL
- Jest (Tests)
- Docker

#### Structure du projet

Le projet suit une architecture hexagonale :
```
src/
├── domain/         # Entités et règles métier
├── application/    # Cas d'utilisation
└── infrastructure/ # Controllers, repositories
```

---

Projet réalisé dans le cadre du cours de Clean Code, mettant en pratique l'architecture hexagonale et les principes SOLID. ```

#### Architecture

Le projet suit une architecture hexagonale (Ports & Adapters) avec trois couches principales :
- Domain : entités et règles métier
- Application : cas d'utilisation
- Infrastructure : controllers, repositories et adapteurs

#### Fonctionnalités

- Création et gestion de cartes de révision
- Système de révision espacée (Leitner)
- Suivi des réponses et progression

#### Technologies

- TypeScript
- Express.js
- Prisma (ORM)
- Jest (Tests)

### Frontend
Le back doit être lancé avant le front.

#### Intaller les dépendances
```bash
npm install
```

Créer un fichier `.env` avec pour valeur `NEXT_PUBLIC_API_URL=http://localhost:8080`.

#### Lancer l'appli
```bash
  npm run dev
```

### Lancer les test end-2-end (bonus-2)
1. Placez-vous sur la branche du bonus
```bash
 git checkout -b bonus-2
 ```

2. Installer les dépendances 
```bash
npm i
```

Remarque: le backend doit être lancé avant de lancé les test

3. Lancer l'application
```bash
npm run dev
```

4. Lancer les tests
```bash
npm run test
```
