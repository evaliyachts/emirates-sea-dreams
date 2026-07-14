import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SitemapSection from "./SitemapSection";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="fixed left-4 top-2 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:translate-y-0">Skip to main content</a>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1"
      >
        {children}
      </main>
      <Footer />
      <SitemapSection />
    </div>
  );
};

export default Layout;
