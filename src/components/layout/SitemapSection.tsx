import { Link } from "react-router-dom";
import { publishableYachts, yachtPath } from "@/data/yachts";

/**
 * Published-route directory rendered above the footer on every page.
 * It intentionally omits blocked routes until their phase-specific gates pass.
 */
const SitemapSection = () => {
  return (
    <section
      aria-label="Sitemap"
      className="border-t border-border/30 bg-background/50 py-12"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Published Page Directory
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
          Use these links to reach the current indexable commercial owners and
          every published yacht record. Unpublished routes are not listed.
        </p>

        <div className="grid gap-8 text-sm md:grid-cols-3">
          {/* Main pages */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">
              Main Pages
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Private yacht rental guide</Link></li>
              <li><Link to="/yachts" className="text-muted-foreground hover:text-primary transition-colors">Compare verified yachts and prices</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Optional service planning</Link></li>
              <li><Link to="/occasions" className="text-muted-foreground hover:text-primary transition-colors">Private occasion chooser</Link></li>
            </ul>
          </div>

          {/* Yachts */}
          <div className="md:col-span-2">
            <h3 className="font-display font-semibold text-foreground mb-3">
              Verified Yacht Records ({publishableYachts.length})
            </h3>
            <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2">
              {publishableYachts.map((yacht) => (
                <li key={yacht.id}>
                  <Link
                    to={yachtPath(yacht.slug)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {yacht.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SitemapSection;
