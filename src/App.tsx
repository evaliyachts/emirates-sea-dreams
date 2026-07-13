import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "@/app/AppProviders";
import { createAppQueryClient } from "@/app/query-client";
import { AppRoutes } from "@/app/AppRoutes";

const browserQueryClient = createAppQueryClient();

const App = ({ forceNotFound = false }: { forceNotFound?: boolean }) => (
  <AppProviders queryClient={browserQueryClient}>
    <BrowserRouter>
      <AppRoutes forceNotFound={forceNotFound} />
    </BrowserRouter>
  </AppProviders>
);

export default App;
