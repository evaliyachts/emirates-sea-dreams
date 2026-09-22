import { Helmet } from "react-helmet-async";

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
            The page you requested is unavailable. Browse yachts or return to the homepage.
          </p>
          <nav aria-label="Published pages" className="flex flex-wrap justify-center gap-4">
            <a href="/" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Home</a>
            <a href="/yachts" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Yachts</a>
            <a href="/services" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Services</a>
            <a href="/occasions" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Occasions</a>
          </nav>
        </div>
      </main>
    </>
  );
};

export default NotFound;
