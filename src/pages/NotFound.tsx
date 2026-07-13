import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Dubai Yacht</title>
        <meta name="description" content="The requested Dubai Yacht page could not be found." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main className="flex min-h-screen items-center justify-center bg-muted px-6">
        <div className="max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Dubai Yacht</p>
          <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The page you requested is unavailable. Continue with one of the currently published sections.
          </p>
          <nav aria-label="Published pages" className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-primary underline underline-offset-4">Home</Link>
            <Link to="/yachts" className="text-primary underline underline-offset-4">Yachts</Link>
            <Link to="/services" className="text-primary underline underline-offset-4">Services</Link>
            <Link to="/occasions" className="text-primary underline underline-offset-4">Occasions</Link>
          </nav>
        </div>
      </main>
    </>
  );
};

export default NotFound;
