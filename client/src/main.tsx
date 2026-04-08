import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";
import { registerServiceWorker } from "./lib/registerSW";
import { WhiteLabelProvider } from "@/contexts/WhiteLabelContext";
queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const isDev = window.location.hostname === "localhost";

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: isDev
        ? "http://localhost:3002/api/trpc"
        : "/api/trpc",
      fetch(input, init) {
        return fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <WhiteLabelProvider>
        <App />
      </WhiteLabelProvider>
    </QueryClientProvider>
  </trpc.Provider>
);

registerServiceWorker();
