# Projet avec Docker Compose

Ce projet utilise Docker Compose pour gérer un environnement multi-conteneurs. Ce guide vous explique comment configurer et exécuter le projet.

---

## Prérequis

- **Docker** : Assurez-vous que Docker est installé. Vous pouvez le télécharger depuis [le site officiel de Docker](https://www.docker.com/get-started).
- **Docker Compose** : Docker Compose est inclus dans les versions récentes de Docker. Vérifiez son installation en exécutant :
  ```bash
  docker-compose --version
  ```

## Étapes pour lancer le projet

1. **Cloner le dépôt**
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_PROJET>
   ```

2. **Configurer les variables d'environnement (optionnel)**
   Si le projet utilise un fichier `.env`, copiez le fichier exemple et personnalisez-le :
   ```bash
   cp .env.example .env
   ```
   Modifiez les variables dans le fichier `.env` selon vos besoins.

3. **Construire les services**
   
   ```bash
   docker-compose build
   ```

4. **Démarrer les services**
   Pour lancer le projet :
   ```bash
   docker-compose up --build
   ```
   Ajoutez `-d` pour exécuter les services en arrière-plan :
   ```bash
   docker-compose up -d
   ```

 **Vérifier l'état des conteneurs**
   Pour lister tous les conteneurs (en cours d'exécution ou arrêtés) :
   ```bash
   docker ps -a
   ```


5. **Arrêter les services**
   Pour arrêter les services sans les supprimer :
   ```bash
   docker-compose stop
   ```

6. **Supprimer les services et les volumes**
   Si vous souhaitez nettoyer complètement l'environnement :
   ```bash
   docker-compose down -v
   ```

---

## Utilisation

- Accédez à l'application en ouvrant [http://localhost:8000](http://localhost:8000) (ou un autre port configuré dans `docker-compose.yml`).
- Pour afficher les journaux des conteneurs :
  ```bash
  docker-compose logs
  ```
- Pour interagir avec un conteneur en ligne de commande :
  ```bash
  docker exec -it <NOM_DU_CONTENEUR> bash
  ```

---

## Ressources utiles

- Documentation Docker : [https://docs.docker.com](https://docs.docker.com)
- Documentation Docker Compose : [https://docs.docker.com/compose](https://docs.docker.com/compose)
