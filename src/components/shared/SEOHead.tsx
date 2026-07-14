import { Helmet } from "react-helmet-async";
import { BRAND_NAME, DOMAIN } from "@/lib/constants";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
  socialImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  preloadImages?: readonly {
    url: string;
    media?: string;
    type?: string;
    referrerPolicy?: "no-referrer";
  }[];
}

const SEOHead = ({ title, description, path, jsonLd, socialImage, preloadImages = [] }: SEOHeadProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={`${DOMAIN}${path}`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${DOMAIN}${path}`} />
    <meta property="og:site_name" content={BRAND_NAME} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {preloadImages.map((image) => (
      <link
        key={`${image.url}-${image.media ?? "all"}`}
        rel="preload"
        as="image"
        href={image.url}
        media={image.media}
        type={image.type}
        referrerPolicy={image.referrerPolicy}
        {...{ fetchpriority: "high" }}
      />
    ))}
    {socialImage && <meta property="og:image" content={socialImage.url} />}
    {socialImage && <meta property="og:image:alt" content={socialImage.alt} />}
    {socialImage && <meta property="og:image:width" content={`${socialImage.width}`} />}
    {socialImage && <meta property="og:image:height" content={`${socialImage.height}`} />}
    {socialImage && <meta name="twitter:image" content={socialImage.url} />}
    {socialImage && <meta name="twitter:image:alt" content={socialImage.alt} />}
    {jsonLd && (
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    )}
  </Helmet>
);

export default SEOHead;
