# Novacrust Frontend Assessment

A **React + TypeScript + Tailwind CSS** frontend implementation for the Novacrust Frontend Take‑Home Assessment.

This project focuses on **UI accuracy, clean component structure, and predictable state handling**, following the assessment requirement to implement **only two screens** from the provided Figma design. All other tabs/screens are intentionally disabled.

---

## ✨ Overview

The application demonstrates:

* Conversion of Figma designs into clean, responsive UI
* Reusable and accessible components using **shadcn/ui**
* Predictable state handling with React hooks
* Clear loading and disabled states
* Production‑ready project structure

No backend integration was required for this assessment. Mocked/static data is used where applicable and is stored in `lib/config/data`, not in the services layer.

---

## 🧩 Implemented Screens

Out of the full Figma design, **2 screens were selected and implemented**, as requested:

* Crypto checkout flow (core payment screen)
* Bank recipient details/review screen

All other tabs are visually present but **disabled**, in line with the assessment scope.

---

## 🛠 Tech Stack

### Framework

* **React**
* **TypeScript**
* **Vite**

### Routing

* `@tanstack/react-router`

### UI & Styling

* **Tailwind CSS**
* **shadcn/ui** (Radix-based, accessible components)

### State & Logic

* React hooks
* Lightweight local state management (no backend)
* Mock data managed centrally in `lib/config/data`

---

## 📁 Folder Structure

```txt
.
├── src/
│   ├── assets/          # Static assets (icons, images)
│   ├── components/      # Reusable UI components
│   ├── context/         # Shared React context providers
│   ├── lib/             # Utilities, helpers, config
│   ├── pages/           # Page-level components
│   ├── routes/          # Route definitions (TanStack Router)
│   ├── services/        # Mock services / API abstractions
│   ├── styles/          # Global styles
```

This structure is optimized for **scalability and clarity**, keeping UI, logic, and routing concerns well separated.

---

## 🚀 Getting Started

### Prerequisites

* Node.js **18+**
* yarn

### Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### Install Dependencies

```bash
yarn install
```

### Run Development Server

```bash
yarn dev
```

The app will be available at:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

### Start Development Server

```bash
yarn dev
```

### Build for Production

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

---

## 🎯 Key Decisions & Trade‑offs

* **Only two screens implemented** to strictly follow assessment instructions
* Other tabs are disabled rather than removed, preserving layout integrity
* Mock data lives in `lib/config/data` to keep services clean and avoid fake API coupling
* Account number input **resolves before displaying the account name**, mirroring real‑world transfer flows
* **Next / Continue actions are disabled** until all required fields are completed, preventing invalid transfers
* shadcn/ui chosen for accessibility, composability, and clean defaults
* Avoided overengineering (no global state, no unnecessary abstractions)

---

## ♿ Accessibility & Responsiveness

* Semantic HTML and accessible Radix primitives via shadcn/ui
* Keyboard‑friendly components
* Fully responsive layout (desktop + mobile)

---

## 📎 Links

* **Figma Design**: [https://www.figma.com/design/FRfbMHys4JINX4V9qBxgbf/Frontend-Assessment?node-id=0-1](https://www.figma.com/design/FRfbMHys4JINX4V9qBxgbf/Frontend-Assessment?node-id=0-1)
* **Repository**: *Provided in submission*
* **Live Demo / Video**: *Provided in submission (Vercel / Netlify / Loom)*

---

## ✅ Final Notes

This project prioritizes **clarity, structure, and UI quality** over unnecessary complexity. The codebase is intentionally clean, readable, and easy to extend if additional screens or backend integration were required.