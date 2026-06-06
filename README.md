# Jewellery App

A full-stack jewellery storefront built with a Spring Boot backend and a React + TypeScript frontend.

## Overview

This project supports two user profiles:
- **User**: browse products, manage cart, save wishlist items, sign up and log in.
- **Admin (Owner)**: manage products and view application data.

The backend is implemented in Java with Spring Boot and includes:
- REST APIs for authentication, product, cart, wishlist, and user operations
- JWT-based security and Spring Security configuration
- MySQL persistence via Spring Data JPA
- OpenAPI documentation support

The frontend is implemented with React, TypeScript, Redux, and Material UI.

## Repository Structure

- `backend/` - Spring Boot application
    - `src/main/java/com/jewellary/app/` - controllers, services, repositories, DTOs, entity models, security, configuration
    - `src/main/resources/` - application properties and SQL table scripts
    - `pom.xml` - Maven build definition and dependencies
- `frontend/` - React application
    - `src/` - React components, Redux store, actions, reducers, and type definitions
    - `public/` - static assets and HTML template
    - `package.json` - frontend dependencies and scripts

## Tech Stack

- Backend: Java 17, Spring Boot, Spring Data JPA, Spring Security, JWT, MySQL, AWS S3 SDK, OpenAPI
- Frontend: React, TypeScript, Redux, React Router, Material UI

## Requirements

- Java 17
- Maven (or use the included Maven wrapper)
- Node.js / npm
- MySQL database

## Setup Instructions

### Backend

1. Open a terminal in `backend/`
2. Configure your database connection in `backend/src/main/resources/application.properties`
3. Run the application:
    - Windows: `.
      backend\mvnw.cmd spring-boot:run`
    - macOS/Linux: `./mvnw spring-boot:run`

The backend typically runs on `http://localhost:8080`.

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
    - `npm install`
3. Start the app:
    - `npm start`

The frontend typically runs on `http://localhost:3000`.

## Notes

- If you use a proxy or connect the frontend to the backend, update any API base URLs in the frontend actions or environment configuration.
- API docs may be available via the backend OpenAPI endpoint when the backend is running.

## Useful Commands

### Backend
- `./mvnw spring-boot:run` - start backend server
- `./mvnw test` - run backend tests

### Frontend
- `npm start` - run development server
- `npm run build` - create production build
- `npm test` - run frontend tests

## Docker

Build and run the full stack with Docker Compose (recommended). From the project root:

```bash
# build images and tag as configured in docker-compose.yml
docker compose build

# start services (MySQL, backend, frontend)
docker compose up

# run in background
docker compose up -d
```

Manual image build and tag (optional):

```bash
# build backend image (tags image `jewellery-app`)
docker build -t jewellery-app ./backend

# build frontend image (tags image `react-app`)
docker build -t react-app ./frontend

# then start compose (will use already-tagged images)
docker compose up
```

Notes:
- The backend `Dockerfile` performs a Maven build inside the image; the first build may take longer while dependencies download.
- The frontend `Dockerfile` builds a production bundle and serves it via `nginx` (mapped to host port `3000` → container `80`).

## Contribution

Feel free to extend this application by adding:
- product management for admin users
- improved authentication flows
- payment and order checkout flows
- responsive UI enhancements

---

Enjoy building and improving the jewellery storefront!