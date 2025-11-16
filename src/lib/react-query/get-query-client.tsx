import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClieont() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClieont();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClieont();
    return browserQueryClient;
  }
}
