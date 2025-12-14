# Lema Frontend Assessment

A React + TypeScript + Tailwind CSS frontend for the Lema assessment.

The app talks to the backend API and provides:

* A paginated users table
* A user posts page with create and delete actions
* Proper loading and error states
* At least one unit test using Vitest

### Cross-cutting Requirements

* React Query used for data fetching, caching, and syncing
* Tailwind CSS for responsive styling
* Clean, modular code
* Reused logic through custom hooks or utilities
* Clear loading, and error states on all data views


## Tech Stack

* **Framework**

  * React
  * TypeScript
  * Vite

* **Routing**

  * `@tanstack/react-router`

* **Data fetching**

  * `@tanstack/react-query`
  * `axios`

* **Styling**

  * Tailwind CSS

* **Testing**

  * Vitest
  * React Testing Library

## Folder Structure

```txt
.
├── src/
│   ├── assets/
│   ├── components/      # Reusable UI components
│   ├── context/         # Shared React context providers
│   ├── hooks/           # Custom hooks (data + UI logic)
│   ├── lib/             # Utilities, helpers, config
│   ├── pages/           # Page-level components
│   ├── routes/          # Route definitions (TanStack Router)
│   ├── services/        # API services (axios clients, queries)
│   ├── styles/ 
```

## Environment Variables

Frontend uses Vite env variables.

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://lema-backend-assessment-production-url.com
```

* `VITE_API_BASE_URL`

  * Base URL of the backend API
  * All requests in services use this value

Keep `.env` out of git. The file is already included in `.gitignore`.


## Getting Started

### Prerequisites

* Node.js 18+
* yarn

### Clone the repo

```bash
git clone https://github.com/Allename/lema-frontend-assessment.git
cd lema-frontend-assessment
```

### Install dependencies

```bash
yarn install
```

### Run in development

```bash
yarn dev
```

Open the URL printed in the terminal, usually:

```text
http://localhost:3001
```

## Available Scripts

From the project root:

* **Start dev server**

```bash
yarn dev
```

* **Run tests**

```bash
yarn test
```

* **Build for production**

```bash
yarn build
```

* **Preview production build**

```bash
yarn preview
```

Run:

```bash
yarn test
```