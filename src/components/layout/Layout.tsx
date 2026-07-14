import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SitemapSection from "./SitemapSection";

interface LayoutProps {
  children: ReactNode;
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="fixed left-4 top-2 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:translate-y-0">Skip to main content</a>
      <Header />
      <motion.main
        id="main-content"
        tabIndex={-1}
        key={location.pathname}
        initial={reduceMotion ? false : pageTransition.initial}
        animate={pageTransition.animate}
        transition={reduceMotion ? { duration: 0 } : pageTransition.transition}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
      <SitemapSection />
    </div>
  );
};

export default Layout;
