import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { buildBreadcrumbSchema } from "@/lib/entity-schema";
import { LEGAL_PUBLICATION_DATE, PHONE_NUMBER, RESPONSIBLE_PERSON } from "@/lib/constants";

const dataCategories = [
  "WhatsApp or telephone identifier",
  "Requested date and start time",
  "Requested duration",
  "Guest count",
  "Yacht interest",
  "Occasion or optional-service requests",
  "Notes and communication history",
  "IP address",
  "Browser and device information",
  "Requested resource or page",
  "Timestamp and security-log information",
] as const;

const privacyRights = [
  "Access to and a copy of your information",
  "Correction of inaccurate information",
  "Deletion of information",
  "Restriction or cessation of processing",
  "Transfer or portability where applicable",
  "Withdrawal of consent where processing relies on consent",
  "A complaint to the competent UAE authority",
] as const;

const Privacy = () => (
  <Layout>
    <SEOHead title="Privacy Notice | Dubai Yacht" description="How Dubai Yacht handles browser-prepared enquiries, WhatsApp and phone communications, hosting logs, media requests and privacy requests." path="/privacy" jsonLd={buildBreadcrumbSchema("/privacy", [{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
    <div className="pt-28 pb-20" data-support-content="privacy">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Privacy Notice</h1>
          <p className="text-sm text-muted-foreground mb-10">Effective date: {LEGAL_PUBLICATION_DATE ?? "Pending production publication"}</p>
          <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">1. Responsible person and scope</h2>
              <p>Dubai Yacht is the public brand of an online private-yacht comparison and request-planning service. {RESPONSIBLE_PERSON} is the responsible business recipient and controller for the enquiry information described in this notice. This notice explains how information is handled when you use the website or choose to contact {RESPONSIBLE_PERSON} through WhatsApp or phone.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">2. Browser-prepared enquiry form</h2>
              <p>The website form prepares a message locally in your browser. It does not submit the form values to this website, Netlify, email, a form-submission database or an internal API. Website-generated form values are not retained by the website after the browser session.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">3. Information that may be processed</h2>
              <p className="mb-3">Depending on how you use the website and what you choose to communicate, information may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                {dataCategories.map((category) => <li key={category}>{category}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">4. WhatsApp and telephone communications</h2>
              <p>If you choose WhatsApp, you decide to send the prepared information to WhatsApp/Meta and {RESPONSIBLE_PERSON}. If you call, your device and telephone-network provider process the call. {RESPONSIBLE_PERSON} may then receive the information you choose to communicate.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">5. Hosting and production media</h2>
              <p>Netlify may process technical request, diagnostic and security logs while hosting the website. Approved production image hosts receive ordinary technical requests, which may include an IP address, browser or device information, requested resource or page, timestamp and security-log information, to deliver images and protect their services.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">6. Purposes and processing basis</h2>
              <p>Information may be used to respond, prepare availability or pricing, administer a confirmed service, prevent misuse, protect legal rights and meet applicable obligations. Information is processed only where permitted by applicable law, including to take steps requested by you before a possible booking, administer a confirmed service, comply with legal obligations, protect legal rights or where you have provided valid consent.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">7. Providers and international processing</h2>
              <p>Information may be processed by WhatsApp/Meta, the applicable telephone-network provider, Netlify, approved production image hosts, yacht providers and approved optional-service providers, as relevant to your use of the website or request. Information is shared with yacht or optional-service providers only as needed to answer or fulfil your request. Some processing may occur outside the UAE. Cross-border processing remains subject to applicable legal requirements and relevant provider arrangements.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">8. Retention</h2>
              <p>Website-generated form values are not stored by the website after the browser session. WhatsApp and phone communications are retained while an enquiry is active and afterwards only as needed to administer a confirmed booking, address questions or disputes, and meet applicable business, accounting or legal obligations. Information should be deleted or anonymised when it is no longer required for those purposes.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">9. Privacy rights and requests</h2>
              <p className="mb-3">Subject to applicable law, you may request:</p>
              <ul className="list-disc pl-6 space-y-2 mb-3">
                {privacyRights.map((right) => <li key={right}>{right}</li>)}
              </ul>
              <p>Privacy requests may be made through the approved WhatsApp number associated with {PHONE_NUMBER}. Requests are handled subject to applicable law. Identity or request details may need to be confirmed before action is taken.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">10. Analytics, cookies and technical storage</h2>
              <p>Analytics and advertising tracking are disabled in this release. The website does not use GA4, Google Tag Manager, Meta Pixel, advertising tags, conversion events, consent mode, analytics cookies or advertising cookies. The website application does not set other browser cookies or local storage in this release. Netlify, WhatsApp/Meta, telephone-network providers and approved production image hosts may use essential technical or provider-set technologies when their services are requested, under their own policies.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">11. Security</h2>
              <p>Reasonable technical and organisational measures are used to protect information, but no internet transmission or storage method can be guaranteed to be completely secure.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">12. Children</h2>
              <p>The service is not intended for children to submit enquiries independently. A parent or guardian should make an enquiry concerning a child or a group that includes children.</p>
            </section>
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">13. Updates</h2>
              <p>This notice may be updated when the website’s actual practices or applicable requirements change. The effective date above identifies the published version.</p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </Layout>
);

export default Privacy;
