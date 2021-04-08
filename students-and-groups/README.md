# JSFS - L3S6 - Etudiants et Groupes 💡

* Il s'agit de réaliser une petite application qui permet de gérer des listes d'étudiants et leur répartition au sein de différents groupes. On supposera qu'il y a 6 groupes.

Vous devrez mettre en place le serveur web, le serveur de base de données ainsi que les scripts exécutés côté client.

## Overview ⚠️

### Les étudiants sont définis par un nom, une liste de prénoms et un numéro étudiant. Les contraintes suivantes s'appliquent à ces données et à leur modèle :

- numéro étudiant
le nom est une séquence de caractères, sa valeur est unique.
- nom
le nom est en majuscules, sans espace avant ni après. Cette donnée est requise.
- prénoms
chacun des prénoms de la liste est capitalisé (première lettre en majuscules, autres lettres en minuscules), sans espace avant ni après. Lors de l'accès à cette donnée, le modèle fournit une chaînes de caractères qui réunit les prénoms séparés par des virgules.
### Les groupes sont construits par des données qui lient un étudiant à un numéro de groupe.

- l'étudiant
est identifié par son id (type ObjectId), la donnée est requise.
- le groupe
est identifié par un nombre entre 1 et 6, la donnée est requise.
---
## Requirement 📝
* On doit disposer d'une page d'accueil qui point vers deux autres pages, la première pour gérer les étudiants, la seconde pour les groupes.

* La page de gestion des étudiants liste les étudiants existants. Une zone de saisie permet de créer un nouvel étudiant. Il est possible de supprimer un étudiant ou de mettre à jour les données le concernant. Dans le cas d'une mise à jour, le numéro étudiant ne peut pas être modifié.
Après chaque opération, la liste des étudiants affichée est mise à jour. Toutes ces opérations doivent se réaliser sans rechargement de la page.

* La page de gestion des groupes permet d'attribuer un groupe à un étudiant ou de visualiser la composition de chaque groupe. Cette page propose donc une liste qui permet de choisir parmi les 6 groupes ou aucun groupe. Lorsque l'on choisit l'un des 6 groupes, la page affiche alors la liste des étudiants présents dans ce groupes (leurs nom, prénoms et numéro). Il doit alors être possible de supprimer l'étudiant du groupe (mais l'étudiant n'est pas supprimé de la liste des étudiants). Si on ne choisit aucun groupe, c'est la liste des étudiants qui n'ont pas encore de groupe attribué qui est affichée. Il est alors possible d'attribuer un groupe à ces étudiants. Cette situation est celle que l'on trouve au chargement de la page.
Après chaque opération, la liste des étudiants affichée est mise à jour. Toutes ces opérations doivent se réaliser sans rechargement de la page.

* Pour les deux pages, une zone de message permet d'avoir un retour sur les opérations réalisées (création, suppression ou mise à jour d'un étudiant, ajout ou suppression dans un groupe).
Si une opération n'est pas possible, par exemple la création d'un étudiant avec un numéro existant ou sans qu'un nom ne soit fourni, alors l'utilisateur est également informé par un message affiché dans cette zone.

* La suppression des données définissant un étudiant implique nécessairement la suppression des données sur son appartenance à un groupe.

* Vous pouvez ajouter d'autres fonctionnalités si vous le souhaitez.
___
## Technologies Used 💻
1. [Node js](https://nodejs.org) (Express Framework)
2. [React](https://fr.reactjs.org/) (ReactJS)
3. [SCSS](https://sass-lang.com/) (SASS)
4. [Bulma](https://bulma.io/) (Bulma Styling library)
5. [MongoDB](https://www.mongodb.com/fr) (NoSQL Database)
6. [SwaggerUI](https://swagger.io/tools/swagger-ui/) (API Documentation)
___
***To Get Started Use:***

#### To start backend
* First (from root of this project)
```
cd server
```
* For development
```
npm install
npm run dev
```
* For production
```
npm install
npm start
```
#### To start frontend
* First (from root of this project) - Version React
```
cd client-react
```
* For development
```
npm install
npm start
```
* For production
```
npm install
npm run build
```

* Second (from root of this project) - Version Angular
```
cd client
```
* For development
```
npm install
npm start
```
* For production
```
npm install
npm run build
```

### Browser will automatically open at http://localhost:3000 - React default port and server will run at http://localhost:8080
___
## REST API Endpoints

### Tous de cela, vous pouvez accéder endpoint: http://localhost:8080/api-docs/ pour voir. 

- GET /api/groups: GET tous les groups
- GET /api/groups/students: GET tous les étudiants sans group
- GET /api/groups/:groupNumber/students/:studentId: GET tous les étudiants dans le :groupNumber
- POST /api/groups/:groupsNumber/students/:studentId: POST - créer le group avec identifiant de l'étudiant et nombre de la groupe
- PATCH /api/groups/students/:studentId: PATCH - supprimer l'étudiant de la groupe
- GET /api/students: GET tous le étudiants
- POST /api/students: POST - créer un nouveau étudiant
- PATCH /api/students: PATCH - mise à jour des informations du étudiant
- DELETE /api/students/:studentId: DELETE - supprimer l'étudiant
___
## What have we done ✔️
- [x] Comme sujet
---
## TODO ❓
- [ ] Ajouter animations
- [ ] Créer authentication
- [ ] Responsiveness
- [ ] Et plus je ne sais pas 😝
---
## Contributers 🔥
|Name|
|----|
|Quang Toan TRAN|
|Minh Quan NGUYEN|
