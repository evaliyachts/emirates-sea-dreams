import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";
import { PHONE_NUMBER } from "@/lib/constants";

const sections = [
  ["1. What this notice covers", "This notice explains how information is handled when you use the Dubai Yacht website or choose to contact the approved business recipient through WhatsApp or phone."],
  ["2. Browser-prepared enquiry form", "The website form prepares a message locally in your browser. It does not submit the form values to this website, Netlify, email, a form-submission database or an internal API. Website-generated form values are not retained by the website after the browser session."],
  ["3. WhatsApp and phone communications", "If you choose WhatsApp, you decide to send the prepared information to WhatsApp/Meta and the approved business recipient. If you call, your device and telephone provider process the call. Information may then be received through WhatsApp or phone and retained as reasonably necessary for the enquiry and applicable business or legal obligations."],
  ["4. Hosting and media requests", "Netlify may process technical request, diagnostic and security logs while hosting the website. Approved production image hosts receive ordinary technical requests, which may include an IP address, browser information and the requested resource, in order to deliver images."],
  ["5. Analytics and cookies", "Analytics and advertising tracking are disabled. In this release, the site does not intentionally set analytics or advertising cookies and does not use GA4, Google Tag Manager, Meta Pixel, conversion events or consent mode."],
  ["6. How information may be used", "Information received after you choose to contact the business may be used to respond, prepare availability or pricing, arrange the requested service, prevent misuse and meet applicable obligations."],
  ["7. Sharing and providers", "Information may be shared with yacht or optional-service providers only as needed to answer or fulfil your request. WhatsApp/Meta, telephone, hosting, media and service providers process information under their own terms. Third-party providers may process information outside the UAE."],
  ["8. Retention and security", "Website-generated form values are not stored by the website after the browser session. Communications sent through WhatsApp or phone may be retained as reasonably necessary for the enquiry and applicable business or legal obligations. Reasonable measures may be used, but absolute security cannot be guaranteed."],
  ["9. Privacy requests", `Privacy requests may be made through the approved WhatsApp number associated with ${PHONE_NUMBER}. Requests are handled subject to applicable law. Identity or request details may need to be confirmed before action is taken.`],
  ["10. Children", "The service is not intended for children to submit enquiries independently. A parent or guardian should make an enquiry concerning a child or a group that includes children."],
  ["11. Updates", "This notice may be updated when the website’s actual practices or applicable requirements change. The effective date below identifies this version."],
] as const;

const Privacy = () => (
  <Layout>
    <SEOHead title="Privacy Notice | Dubai Yacht" description="How Dubai Yacht handles browser-prepared enquiries, WhatsApp and phone communications, hosting logs, media requests and privacy requests." path="/privacy" jsonLd={buildBreadcrumbSchema("/privacy", [{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
    <div className="pt-28 pb-20" data-support-content="privacy">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Privacy Notice</h1>
          <p className="text-sm text-muted-foreground mb-10">Effective date: 14 July 2026</p>
          <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
            {sections.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-display font-semibold text-foreground mb-3">{heading}</h2><p>{body}</p></section>)}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </Layout>
);

export default Privacy;
