import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "@/app/AppProviders";
import { LazyAppRoutes } from "@/app/LazyAppRoutes";

const App = ({ forceNotFound = false }: { forceNotFound?: boolean }) => (
  <AppProviders>
    <BrowserRouter>
      <LazyAppRoutes forceNotFound={forceNotFound} />
    </BrowserRouter>
  </AppProviders>
);

export default App;
