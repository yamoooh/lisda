export default function SchemaOrg() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "LISDA ONG (Local Initiatives for a Sustainable Development in Africa)",
    "url": "https://lisda-site.org",
    "logo": "https://lisda-site.org/logo.png",
    "description": "Association humanitaire et de développement durable basée à Kribi (Cameroun), œuvrant pour la biodiversité du Bassin du Congo et la dignité des peuples autochtones Bagyeli.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dombe",
      "addressLocality": "Kribi",
      "addressRegion": "Sud",
      "addressCountry": "CM"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+237677593239",
      "contactType": "customer service",
      "email": "Patrice_segbe@yahoo.fr"
    },
    "founder": {
      "@type": "Person",
      "name": "NSEGBE Patrice"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
