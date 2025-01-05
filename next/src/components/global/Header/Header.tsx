import sanityFetch from '@/utils/sanity.fetch';
import TopBar, { TopBarQuery } from '../TopBar';
import _Header from './_Header';
import { ImgDataQuery } from '@/components/ui/Img';
import type { HeaderQueryTypes } from './Header.types';
import styles from './Header.module.scss';

export default async function Header() {
  const { topBar, nav } = await query();

  return (
    <>
      <a
        href='#main'
        className={styles.skipLink}
      >
        Przejdź do głównej treści
      </a>
      <TopBar {...topBar} />
      <_Header
        logo={<AutoManufakturaLogo />}
        dropdownIcon={<DropdownIcon />}
        nav={nav}
      />
    </>
  );
}

const query = async (): Promise<HeaderQueryTypes> => {
  return await sanityFetch<HeaderQueryTypes>({
    query: `
      {
        "topBar": ${TopBarQuery},
        "nav": {
          "services": coalesce(
            *[_type == "global"][0].footer.services[]->{
              name,
              "path": slug.current,
              ${ImgDataQuery('image')},
              "list": *[_type == "Service_Collection" && isSubPage && parentPage._ref == ^._id] | order(_createdAt asc){
                name,
                "path": slug.current,
                ${ImgDataQuery('image')}
              } 
            },
            *[_type == "Service_Collection" && (!defined(isSubPage) || !isSubPage)] | order(_createdAt asc) [0...2]{
              name,
              "path": slug.current,
              ${ImgDataQuery('image')},
              "list": *[_type == "Service_Collection" && isSubPage && parentPage._ref == ^._id] | order(_createdAt asc){
                name,
                "path": slug.current,
                ${ImgDataQuery('image')}
              } 
            }
          ),
          "carBrands": coalesce(
            *[_type == "global"][0].footer.carBrands[]->{
              name,
              "path": slug.current,
              ${ImgDataQuery('image')}
            },
            *[_type == "CarBrand_Collection"] | order(_createdAt desc) {
              name,
              "path": slug.current,
              ${ImgDataQuery('image')}
            }
          ),
          "pricingPage": *[_type == "Pricing_Page"][0]{
            name,
            "path": slug.current
          },
          "aboutPage": *[_type == "About_Page"][0]{
            "name": "Zespół",
            "path": slug.current
          },
          "careerPage": *[_type == "Career_Page"][0]{
            "name": "Kariera",
            "path": slug.current,
          },
          "blogPage": *[_type == "Blog_Page"][0]{
            name,
            "path": slug.current
          },
          "contactPage": *[_type == "Contact_Page"][0]{
            name,
            "path": slug.current
          },
        }
      }
    `,
    tags: [
      'global',
      'Service_Collection',
      'CarBrand_Collection',
      'Pricing_Page',
      'About_Page',
      'Career_Page',
      'Blog_Page',
      'Contact_Page',
    ],
  });
};

const DropdownIcon = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={12}
    height={13}
    viewBox='0 0 12 13'
    fill='none'
    {...props}
  >
    <path
      stroke='#CBD0D0'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9.5 8 6 5 2.5 8'
    />
  </svg>
);

const AutoManufakturaLogo = ({ ...props }) => (
  <svg
    width={91}
    height={37}
    viewBox='0 0 91 37'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...props}
  >
    <rect
      y={0.5}
      width={90.9474}
      height={36}
      fill='url(#pattern0_8928_132210)'
    />
    <defs>
      <pattern
        id='pattern0_8928_132210'
        patternContentUnits='objectBoundingBox'
        width={1}
        height={1}
      >
        <use
          xlinkHref='#image0_8928_132210'
          transform='matrix(0.00595238 0 0 0.0150376 0 -0.00375938)'
        />
      </pattern>
      <image
        id='image0_8928_132210'
        width={168}
        height={67}
        xlinkHref='data:image/png;base64,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'
      />
    </defs>
  </svg>
);
