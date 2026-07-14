import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "@/app/AppProviders";
import { AppRoutes } from "@/app/AppRoutes";

const App = ({ forceNotFound = false }: { forceNotFound?: boolean }) => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes forceNotFound={forceNotFound} />
    </BrowserRouter>
  </AppProviders>
);

export default App;
