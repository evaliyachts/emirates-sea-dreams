import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SitemapSection from "./SitemapSection";
import BookingActions from "@/components/shared/BookingActions";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col pb-24 lg:pb-0">
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
      <aside aria-label="Contact Dubai Yacht" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">
        <BookingActions compact />
      </aside>
    </div>
  );
};

export default Layout;
