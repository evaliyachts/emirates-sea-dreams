import { Link } from "react-router-dom";
import { approvedServices } from "@/data/approved-services";
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
          every published yacht record and approved service owner. Unpublished routes are not listed.
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
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Dubai Yacht</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">Yacht rental FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Prepare an enquiry</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Website and request terms</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy notice</Link></li>
            </ul>
          </div>

          {/* Approved services */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">
              Approved Services ({approvedServices.length})
            </h3>
            <ul className="space-y-2">
              {approvedServices.map((service) => (
                <li key={service.id}>
                  <Link to={service.path} className="text-muted-foreground hover:text-primary transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yachts */}
          <div>
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
