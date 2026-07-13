import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { AppProviders } from "@/app/AppProviders";
import { createAppQueryClient } from "@/app/query-client";
import { AppRoutes } from "@/app/AppRoutes";

HelmetProvider.canUseDOM = false;

interface HelmetValue { toString(): string }
interface HelmetState {
  title?: HelmetValue;
  meta?: HelmetValue;
  link?: HelmetValue;
  script?: HelmetValue;
}

export interface StaticRenderResult {
  html: string;
  head: string;
}

export const renderStaticRoute = (url: string, forceNotFound = false): StaticRenderResult => {
  const helmetContext: { helmet?: HelmetState } = {};
  const queryClient = createAppQueryClient();
  const html = renderToString(
    <AppProviders queryClient={queryClient} helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes forceNotFound={forceNotFound} />
      </StaticRouter>
    </AppProviders>,
  );
  const helmet = helmetContext.helmet;
  const head = [helmet?.title, helmet?.meta, helmet?.link, helmet?.script]
    .map((value) => value?.toString() ?? "")
    .filter(Boolean)
    .join("\n");
  return { html, head };
};
