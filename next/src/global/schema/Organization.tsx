import sanityFetch from '@/utils/sanity.fetch';
import { DEFAULT_DESCRIPTION, DOMAIN, LOGO_URL } from '@/global/constants';

type QueryTypes = {
  global: {
    OrganizationSchema: {
      name?: string;
      description?: string;
    };
    email?: string;
    tel?: string;
    socials?: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      tiktok?: string;
      linkedin?: string;
    };
  };
  workshops?: {
    tel: string;
    email: string;
    address: {
      city: string;
      street: string;
    };
  }[];
};

const SchemaOrganization = async () => {
  const {
    global: {
      OrganizationSchema: { name, description },
      email,
      tel,
      socials,
    },
    workshops,
  } = await query();

  const socialMediaUrls = socials
    ? [socials.facebook, socials.instagram, socials.linkedin, socials.tiktok, socials.youtube].filter(Boolean)
    : [];

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          url: DOMAIN,
          ...(email && { email }),
          ...(tel && { telephone: tel }),
          ...(name && { name }),
          description: description || DEFAULT_DESCRIPTION,
          logo: LOGO_URL,
          image: LOGO_URL,
          OpeningHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '00:00',
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              email: email,
              ...(tel && { telephone: tel }),
            },
          ],
          ...(socials && { sameAs: [socialMediaUrls] }),
          ...(workshops &&
            workshops.length > 0 && {
              department: workshops.map(workshop => ({
                '@type': 'AutomotiveBusiness',
                ...(name && { name }),
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: workshop.address.street,
                  addressLocality: workshop.address.city,
                  addressCountry: 'PL',
                },
                telephone: workshop.tel,
                email: workshop.email,
              })),
            }),
        }),
      }}
    />
  );
};

export default SchemaOrganization;

const query = async (): Promise<QueryTypes> => {
  const query = `
   {
     "global": *[_id == "global"][0] {
       OrganizationSchema {
         name,
         description,
       },
       email,
       tel,
       socials { facebook, instagram, youtube, tiktok, linkedin }
     },
     "workshops": *[_type == "Workshop_Collection"]{
       tel,
       email,
       address {
         street,
         city
       }
     }
   }
  `;

  return await sanityFetch<QueryTypes>({ query, tags: ['global', 'Workshop_Collection'] });
};
