import { useQuery } from "@tanstack/react-query";
import type { HomeContent } from "@shared/homeContent";

export function useHomeContent() {
  return useQuery<HomeContent>({
    queryKey: ["/api/home-content"],
    staleTime: 60_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
