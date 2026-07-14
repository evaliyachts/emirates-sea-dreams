import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

interface AppProvidersProps {
  children: ReactNode;
  helmetContext?: Record<string, unknown>;
}

export const AppProviders = ({ children, helmetContext }: AppProvidersProps) => (
  <HelmetProvider context={helmetContext}>
    {children}
  </HelmetProvider>
);
