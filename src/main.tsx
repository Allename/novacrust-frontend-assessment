import { ErrorComponent, RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { routeTree } from "./routeTree.gen.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { SelectedUserProvider } from "./context/SelectedUserContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      // cacheTime: 0,
      staleTime: 0,
      retry: false,
    },
  },
});

const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <>
      <SelectedUserProvider>
        <RouterProvider router={router} />
      </SelectedUserProvider>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Toaster richColors position="top-right" />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
