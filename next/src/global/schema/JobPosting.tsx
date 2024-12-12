import { DOMAIN, LOGO_URL } from '@/global/constants';

type JobPostingSchemaTypes = {
  data?: {
    name: string;
    workshops: {
      address: string;
      city: string;
      email: string;
    }[];
  }[];
};

export default function JobPostingSchema({ data }: JobPostingSchemaTypes) {
  if (!data || data.length === 0) return null;

  const jobPostings = data.map(({ name, workshops }) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: name,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Auto Manufaktura',
      sameAs: DOMAIN,
      logo: LOGO_URL,
    },
    jobLocation: workshops.map(({ address, city }) => ({
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: address,
        addressLocality: city,
        addressCountry: 'PL',
      },
    })),
  }));

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jobPostings),
      }}
    />
  );
}
