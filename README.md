# TaskFlow — Frontend

A clean, focused kanban board application built with React and TypeScript. Manage tasks across customisable boards with drag and drop, real-time UI updates, and a fully responsive design.

**Live Demo:** https://task-manager-murex-ten-82.vercel.app/
**Backend Repo:** https://github.com/NifemiSoneye/task-manager-backend

---

## Features

- JWT authentication with silent refresh token rotation and persistent login
- Dashboard with analytics (total boards, tasks done, in progress, to do)
- Paginated board list with debounced server-side search
- Favourite boards with dedicated view
- Kanban board with three columns (To Do, In Progress, Done)
- Drag and drop tasks between columns and reorder within columns (dnd-kit)
- Task modal — edit title, description, status, priority, and due date
- Mobile-first responsive design with tab switcher for kanban columns on mobile
- Fade-up animations and staggered card entrance transitions
- Toast notifications for all mutations

---

## Tech Stack

- **React 19** with TypeScript
- **Redux Toolkit** + **RTK Query** for state management and data fetching
- **React Router v7** for client-side routing
- **dnd-kit** for drag and drop
- **Tailwind CSS v4** for styling
- **Shadcn UI** (Nova preset) for component primitives
- **Vite** for bundling

---

## Project Structure

```
src/
├── app/               # Redux store
├── components/
│   ├── common/        # Shared components (Navbar, Sidebar, SearchBar)
│   └── ui/            # Shadcn UI primitives
├── features/
│   ├── auth/          # Auth slice, API slice, PersistLogin, RequireAuth
│   ├── boards/        # Board API slice
│   ├── tasks/         # Task API slice
│   ├── analytics/     # Analytics API slice
│   └── ui/            # UI slice (sidebar, search)
├── hooks/             # Custom hooks (useAuth, useLocalStorage)
├── lib/               # Types, utilities
└── pages/             # Route-level page components
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- The backend running locally or deployed

### Installation

```bash
git clone https://github.com/NifemiSoneye/task-manager-frontend
cd task-manager-frontend
npm install
```

### Environment

Update the `baseUrl` in `src/features/auth/apiSlice.ts` to point to your backend:

```typescript
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500", // or your deployed backend URL
  credentials: "include",
  ...
});
```

### Run

```bash
npm run dev
```

---

## Key Implementation Details

**Authentication** — Access tokens stored in memory (Redux state), refresh tokens in httpOnly cookies. `baseQueryWithReauth` automatically retries failed requests after refreshing the token. `PersistLogin` silently refreshes the token on page load.

**RTK Query** — All API calls use RTK Query with entity adapters for normalised caching. Tag-based invalidation keeps the UI in sync after mutations. `refetchOnMountOrArgChange` ensures analytics are always fresh on dashboard mount.

**Drag and Drop** — dnd-kit `useSortable` on task cards, `useDroppable` on columns, `DragOverlay` for the floating card visual. `onDragEnd` handles both cross-column status updates and same-column reordering.

**Pagination + Search** — Server-side pagination (6 boards per page) with debounced search. Page resets to 1 on search change. Pagination and search work together seamlessly.

---

## Deployment

Deployed on **Vercel** with a `vercel.json` rewrite rule to support client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
