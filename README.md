# 🎓 BDE Events — Full Stack

Plateforme web de gestion des événements étudiants développée en **Full Stack** avec une architecture séparant une API backend Laravel et une application frontend React.

L'application permet aux administrateurs du BDE de créer et gérer les événements, suivre les réservations et les capacités, tandis que les étudiants peuvent consulter les événements, réserver leur place et accéder à leurs tickets numériques.

---

## 📌 Table des matières

* [Présentation](#-présentation)
* [Fonctionnalités](#-fonctionnalités)
* [Architecture](#-architecture)
* [Technologies](#-technologies)
* [Structure du projet](#-structure-du-projet)
* [Installation](#-installation)
* [Configuration Backend](#-configuration-backend)
* [Configuration Frontend](#-configuration-frontend)
* [Authentification](#-authentification)
* [API](#-api)
* [Rôles et permissions](#-rôles-et-permissions)
* [Réservations](#-réservations)
* [Tickets](#-tickets)
* [Docker](#-docker)
* [DockerHub](#-dockerhub)
* [Sécurité](#-sécurité)
* [Tests](#-tests)
* [Développement](#-développement)
* [Auteur](#-auteur)

---

# 🎯 Présentation

**BDE Events** est une plateforme destinée à faciliter la gestion des événements organisés par un Bureau des Étudiants (BDE).

Le projet repose sur une architecture **Frontend / Backend séparée** :

```text
                    ┌─────────────────────┐
                    │      Étudiant       │
                    │       React         │
                    └──────────┬──────────┘
                               │
                               │ HTTP / Axios
                               ▼
                    ┌─────────────────────┐
                    │    Laravel API      │
                    │    Backend          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘

                    ┌─────────────────────┐
                    │ Administrateur BDE  │
                    │ React Dashboard     │
                    └──────────┬──────────┘
                               │
                               ▼
                         Laravel API
```

---

# ✨ Fonctionnalités

## 👨‍💼 Administrateur BDE

L'administrateur peut :

* Se connecter à la plateforme.
* Accéder au Dashboard Admin.
* Créer un événement.
* Modifier un événement.
* Supprimer un événement.
* Consulter les événements.
* Consulter le nombre de réservations.
* Suivre les capacités disponibles.
* Visualiser les places restantes.
* Consulter les statistiques des événements.

### Exemple

```text
Capacité maximale : 100
Réservations      : 65
Places restantes  : 35
```

---

## 🎓 Étudiant

L'étudiant peut :

* Créer un compte.
* Se connecter.
* Consulter les événements.
* Consulter les détails d'un événement.
* S'inscrire à un événement gratuit.
* Consulter ses réservations.
* Consulter ses tickets numériques.
* Voir son Pass étudiant.

---

# 🏗️ Architecture

Le projet utilise une architecture séparée :

```text
BDE-Events/
│
├── backend/
│   └── Laravel API
│
├── frontend/
│   └── React SPA
│
├── docker-compose.yml
│
└── README.md
```

### Backend

```text
React
   │
   │ HTTP Request
   ▼
Laravel API
   │
   ├── Routes
   ├── Middleware
   ├── Controllers
   ├── Models
   └── Database
```

### Frontend

```text
React
 │
 ├── Components
 ├── Pages
 ├── Services
 ├── Authentication
 └── Dashboard
```

---

# 🛠️ Technologies

## Backend

* PHP
* Laravel
* Laravel Sanctum
* MySQL
* REST API
* Eloquent ORM
* Middleware
* Validation
* Policies

## Frontend

* React
* JavaScript
* React Router
* Axios
* HTML
* CSS
* Tailwind CSS

## DevOps

* Docker
* Docker Compose
* DockerHub
* Nginx

## Outils

* Git
* GitHub
* VS Code
* Postman
* Jira

---

# 📂 Structure du projet

## Backend Laravel

```text
backend/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   │
│   ├── Models/
│   └── Policies/
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── routes/
│   └── api.php
│
├── config/
├── public/
├── resources/
├── storage/
├── tests/
├── .env
└── artisan
```

## Frontend React

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── layouts/
│   ├── hooks/
│   ├── context/
│   └── App.jsx
│
├── public/
├── package.json
└── vite.config.js
```

---

# 🚀 Installation

## 1. Cloner le projet

```bash
git clone https://github.com/USERNAME/bde-events.git

cd bde-events
```

---

# ⚙️ Installation Backend

Accéder au dossier Laravel :

```bash
cd backend
```

Installer les dépendances :

```bash
composer install
```

Copier le fichier `.env` :

```bash
cp .env.example .env
```

Générer la clé Laravel :

```bash
php artisan key:generate
```

---

# 🗄️ Configuration MySQL

Dans le fichier `.env` :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bde_events
DB_USERNAME=root
DB_PASSWORD=
```

Créer ensuite la base de données :

```sql
CREATE DATABASE bde_events;
```

Lancer les migrations :

```bash
php artisan migrate
```

Pour utiliser les données de test :

```bash
php artisan db:seed
```

Ou :

```bash
php artisan migrate:fresh --seed
```

---

# 🔐 Authentification

L'API utilise une authentification basée sur **Laravel Sanctum**.

Le flux est :

```text
Utilisateur
     │
     ▼
   React
     │
     │ POST /api/login
     ▼
 Laravel API
     │
     ▼
 Vérification utilisateur
     │
     ▼
 Génération du Token
     │
     ▼
 React
     │
     │ Stockage du Token
     ▼
 Requêtes protégées
```

Pour accéder à une route protégée :

```http
Authorization: Bearer TOKEN
```

Exemple :

```http
GET /api/user/tickets

Authorization: Bearer 8|abc123xyz...
```

---

# 🌐 API

## 🔑 Authentication

### Register

```http
POST /api/register
```

### Login

```http
POST /api/login
```

### Logout

```http
POST /api/logout
```

### Current User

```http
GET /api/user
```

---

# 📅 Events

### Liste des événements

```http
GET /api/events
```

### Détails d'un événement

```http
GET /api/events/{id}
```

### Créer un événement

```http
POST /api/events
```

Route réservée aux administrateurs.

### Modifier un événement

```http
PUT /api/events/{id}
```

### Supprimer un événement

```http
DELETE /api/events/{id}
```

---

# 📊 Dashboard Admin

Pour récupérer les statistiques :

```http
GET /api/admin/events/stats
```

Exemple de données :

```json
{
    "event": "Soirée BDE",
    "max_capacity": 100,
    "bookings_count": 65,
    "places_remaining": 35
}
```

Le frontend calcule et affiche :

```text
Places restantes =
max_capacity - bookings_count
```

---

# 🎟️ Réservations

Un étudiant connecté peut réserver une place avec :

```http
POST /api/events/{id}/book
```

L'API vérifie :

1. L'utilisateur est authentifié.
2. L'événement existe.
3. L'étudiant n'a pas déjà réservé.
4. La capacité maximale n'est pas atteinte.

Si toutes les conditions sont respectées :

```text
Réservation créée
       │
       ▼
Ticket généré
       │
       ▼
Code unique
       │
       ▼
Pass étudiant
```

---

# 🎫 Tickets

Les tickets de l'étudiant sont accessibles avec :

```http
GET /api/user/tickets
```

Chaque ticket possède un code unique.

Exemple :

```text
BDE-2026-X7K92P
```

Le Pass contient :

```text
┌──────────────────────────────┐
│         BDE EVENTS           │
│                              │
│       🎟️ PASS ÉTUDIANT       │
│                              │
│ Événement : Soirée BDE      │
│ Date       : 20/08/2026     │
│ Heure      : 20:00          │
│ Lieu       : Salle BDE      │
│                              │
│ Étudiant : Othmane          │
│                              │
│ CODE : BDE-2026-X7K92P      │
└──────────────────────────────┘
```

---

# 👥 Rôles et permissions

Le système possède principalement deux rôles :

| Rôle     | Permissions                                 |
| -------- | ------------------------------------------- |
| Admin    | Gestion complète des événements + Dashboard |
| Étudiant | Consultation + réservation + tickets        |

Les routes administrateur sont protégées par un middleware :

```text
IsAdmin
```

Un étudiant qui tente d'accéder à une route administrateur reçoit :

```http
403 Forbidden
```

---

# 🔒 Sécurité

Le projet met en place plusieurs mécanismes de sécurité :

* Authentification avec Laravel Sanctum.
* Tokens Bearer.
* Middleware d'authentification.
* Middleware `IsAdmin`.
* Validation des données côté API.
* Protection des routes sensibles.
* Vérification des permissions.
* Protection contre les doubles réservations.
* Vérification de la capacité des événements.
* Codes de tickets uniques et non prévisibles.

---

# ⚛️ Frontend React

Le frontend communique avec Laravel grâce à **Axios**.

Exemple :

```javascript
axios.get('/api/events');
```

Pour une route protégée :

```javascript
axios.get('/api/user/tickets', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

Les routes React principales sont :

```text
/login
/register

/events
/events/:id

/admin/events
/admin/events/create

/profile
/profile/tickets
```

---

# 🐳 Docker

Le projet peut être exécuté avec Docker.

Architecture :

```text
                 Docker Compose
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
     React + Nginx             Laravel API
       Port 8080                  Port 8000
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
                    MySQL
```

Lancer l'application :

```bash
docker compose up
```

En arrière-plan :

```bash
docker compose up -d
```

Arrêter les conteneurs :

```bash
docker compose down
```

---

# 🐳 Images DockerHub

Deux images Docker sont utilisées :

```text
USERNAME/bde-events-api:v1
```

```text
USERNAME/bde-events-react:v1
```

Pour construire les images :

```bash
docker build -t USERNAME/bde-events-api:v1 ./backend
```

```bash
docker build -t USERNAME/bde-events-react:v1 ./frontend
```

Connexion à DockerHub :

```bash
docker login
```

Push des images :

```bash
docker push USERNAME/bde-events-api:v1
```

```bash
docker push USERNAME/bde-events-react:v1
```

---

# 🧪 Tests

Les tests backend peuvent être exécutés avec :

```bash
php artisan test
```

Ou :

```bash
php artisan test --filter=EventTest
```

Les tests peuvent couvrir notamment :

* Authentification.
* Création d'événements.
* Permissions administrateur.
* Réservations.
* Gestion des capacités.
* Génération des tickets.
* Accès aux routes protégées.

---

# 🔄 Workflow Git

Exemple de workflow :

```text
main
 │
 ├── develop
 │     │
 │     ├── feature/authentication
 │     ├── feature/events
 │     ├── feature/reservations
 │     ├── feature/tickets
 │     └── feature/docker
```

Exemples de commits :

```bash
git commit -m "feat: add event creation API"
```

```bash
git commit -m "feat: add admin dashboard"
```

```bash
git commit -m "feat: add event reservation"
```

```bash
git commit -m "feat: add student tickets"
```

```bash
git commit -m "chore: dockerize application"
```

---

# 📋 User Stories

## Epic 1 — Gestion des événements

### US 1.1

Création d'un événement par un administrateur.

### US 1.2

Suivi des capacités et réservations depuis le Dashboard Admin.

---

## Epic 2 — Réservation

### US 2.1

Inscription en un clic à un événement gratuit.

---

## Epic 3 — Tickets

### US 3.1

Génération et consultation du ticket numérique.

---

## Epic 4 — Déploiement

### US 4.1

Dockerisation et publication des images sur DockerHub.

---

# 📈 Roadmap

* [x] Authentification
* [x] Gestion des utilisateurs
* [x] Gestion des événements
* [x] Gestion des réservations
* [x] Génération des tickets
* [x] Dashboard administrateur
* [x] API REST
* [x] Frontend React
* [x] Dockerisation
* [ ] Déploiement en production
* [ ] Notifications email
* [ ] QR Code pour les tickets
* [ ] Système de paiement pour les événements payants
* [ ] Statistiques avancées

---

# 🎯 Objectif du projet

L'objectif de **BDE Events** est de fournir une solution moderne permettant de centraliser la gestion des événements étudiants et de simplifier le processus de réservation.

Le projet met également en pratique plusieurs compétences **Full Stack** :

```text
Frontend React
      +
REST API Laravel
      +
Authentication
      +
Authorization
      +
MySQL
      +
Docker
      +
DockerHub
```

---

# 👨‍💻 Auteur

**Othmane Hamadellah**

Développeur Web Full Stack

Technologies principales :

```text
React • Laravel • PHP • MySQL • REST API • Docker
```

---

# 📄 Licence

Ce projet est développé dans un cadre pédagogique et professionnel pour la mise en pratique du développement Full Stack et de la containerisation Docker.
