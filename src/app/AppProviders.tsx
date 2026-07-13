import type { ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface AppProvidersProps {
  children: ReactNode;
  queryClient: QueryClient;
  helmetContext?: Record<string, unknown>;
}

export const AppProviders = ({ children, queryClient, helmetContext }: AppProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider context={helmetContext}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
