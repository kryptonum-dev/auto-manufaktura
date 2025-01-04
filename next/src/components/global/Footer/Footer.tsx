import sanityFetch from '@/utils/sanity.fetch';
import Link from 'next/link';
import Light from '@/components/ui/Light';
import CookieButton from './_CookieButton';
import Navigation from './_Navigation';
import type { FooterQueryTypes } from './Footer.types';
import styles from './Footer.module.scss';

export default async function Footer() {
  const links = await query();

  return (
    <footer className={styles['Footer']}>
      <Navigation {...links} />
      <div className={`max-width ${styles.links}`}>
        <p className={`${styles.copyright} text-m light`}>
          <span>Stworzone przez</span>
          <a
            href='https://kryptonum.eu/pl'
            target='_blank'
            rel='noreferrer'
            aria-label='Przejdź do strony Kryptonum'
          >
            <KryptonumLogo />
          </a>
          <span>&</span>
          <a
            href='https://internetstars.pl/'
            target='_blank'
            rel='noreferrer'
            aria-label='Przejdź do strony Internet Stars'
          >
            <InternetStarsLogo />
          </a>
        </p>
        <p className={`${styles.date} text-m light`}>{new Date().getFullYear()}</p>
        <div>
          <Link
            href='/polityka-prywatnosci'
            target='_blank'
            rel='noreferrer'
            className='text-m light'
          >
            Polityka prywatności
          </Link>
          <CookieButton />
        </div>
      </div>
      <div className={styles.svgText}>
        <AutomanufakturaText />
      </div>
      <Light
        size='large-responsive'
        className={styles.light}
      />
    </footer>
  );
}

const query = async (): Promise<FooterQueryTypes> => {
  const footerQuery = `
    {
      "services": coalesce(
        *[_type == "global"][0].footer.services[]->{
          name,
          "path": slug.current,
          "list": *[_type == "Service_Collection" && isSubPage && parentPage._ref == ^._id] | order(_createdAt asc){
            name,
            "path": slug.current
          } 
        },
        *[_type == "Service_Collection" && (!defined(isSubPage) || !isSubPage)] | order(_createdAt asc) [0...2]{
          name,
          "path": slug.current,
          "list": *[_type == "Service_Collection" && isSubPage && parentPage._ref == ^._id] | order(_createdAt asc){
            name,
            "path": slug.current
          } 
        }
      ),
      "carBrands": coalesce(
        *[_type == "global"][0].footer.carBrands[]->{
          name,
          "path": slug.current
        },
        *[_type == "CarBrand_Collection"] | order(_createdAt desc) {
          name,
          "path": slug.current
        }
      ),
      "locations": *[_type == "Location_Collection"] | order(_createdAt desc){
        name,
        "path": slug.current
      },
      "blogPage": *[_type == "Blog_Page"][0]{
        name,
        "path": slug.current
      },
      "aboutPage": *[_type == "About_Page"][0]{
        "name": "Zespół",
        "path": slug.current
      },
      "contactPage": *[_type == "Contact_Page"][0]{
        name,
        "path": slug.current
      },
      "pricingPage": *[_type == "Pricing_Page"][0]{
        name,
        "path": slug.current
      },
      "careerPage": *[_type == "Career_Page"][0]{
        "name": "Kariera",
        "path": slug.current,
        "isHiring": isHiring && count(jobOffers) > 0
      }
    }
  `;

  return await sanityFetch<FooterQueryTypes>({
    query: footerQuery,
    tags: [
      'global',
      'Service_Collection',
      'CarBrand_Collection',
      'Location_Collection',
      'Blog_Page',
      'About_Page',
      'Contact_Page',
      'Pricing_Page',
      'Career_Page',
    ],
  });
};

const InternetStarsLogo = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={101}
    height={20}
    viewBox='0 0 101 20'
    {...props}
  >
    <path
      fill='#7E141D'
      d='M10.255 2.584c-.036.015-.099.104-.14.193-.094.203-1.11 2.718-1.396 3.447-.11.287-.224.568-.25.625l-.172.391-.13.292-1.005.062-2.078.14c-.589.043-1.303.095-1.589.11-.464.031-.536.047-.661.167-.303.276-.198.458.661 1.182.849.714.937.787 1.172.99l.526.443c.15.13.385.328.52.442.13.115.298.255.365.313.688.573.683.562.657.729-.032.182-.094.427-.417 1.719-.828 3.255-.854 3.395-.651 3.536.161.115.432.104.604-.016.078-.057.703-.448 1.39-.87.688-.421 1.61-.989 2.048-1.26.432-.27.822-.479.864-.463.042.015.422.245.844.51.427.266 1.114.693 1.531.948.417.255 1.026.64 1.36.849.62.396.843.463 1.093.333.115-.062.136-.4.042-.755-.031-.114-.083-.338-.125-.495-.224-.922-.49-1.927-.52-1.979-.063-.099-.376-.208-.48-.172-.188.063-.328.24-.328.401 0 .089.083.49.182.886.104.396.177.729.167.74-.01.015-.26-.13-.896-.527-.089-.057-.432-.27-.76-.474-1.792-1.12-2.058-1.27-2.209-1.265-.094 0-.307.099-.547.255-.213.14-.495.318-.625.396-.13.078-.755.469-1.396.87-.64.395-1.177.713-1.187.697-.026-.02.12-.703.24-1.13.156-.567.729-2.963.729-3.057 0-.099-.089-.198-.49-.563-.068-.057-1.505-1.302-1.693-1.458-.062-.057-.171-.15-.234-.208-.062-.058-.307-.271-.542-.469l-.427-.365.401-.036c.224-.02.933-.078 1.578-.12 2.167-.156 2.318-.172 2.454-.224.099-.036.166-.14.255-.36.067-.166.15-.374.187-.457l.464-1.146a96.8 96.8 0 0 1 .463-1.146c.037-.089.146-.35.24-.583.151-.375.255-.5.26-.313.006.036.047.156.105.27.057.115.098.225.104.246 0 .02.057.161.12.312.067.151.156.36.192.458.037.1.1.25.136.339.036.083.166.401.286.703.12.302.255.64.307.755.047.115.13.323.183.47.166.457.229.494 1.015.551l1.745.125c.662.047 1.37.104 1.578.12l.38.036-.406.339-.51.427c-.058.047-.433.365-.839.703a94.67 94.67 0 0 1-.99.823c-.525.427-.645.573-.645.776 0 .255.187.448.432.448.13 0 .245-.057.458-.24.157-.13.329-.276.386-.322.057-.053.526-.443 1.041-.87.516-.427.964-.802.995-.834l.818-.677c.417-.343.781-.677.813-.744.093-.193.067-.401-.063-.521-.13-.125-.031-.115-2.64-.297-.59-.042-1.37-.1-1.745-.125-.37-.031-.756-.052-.844-.057-.094 0-.172-.026-.172-.058a.79.79 0 0 0-.073-.218 78.347 78.347 0 0 1-.474-1.157 41.571 41.571 0 0 0-.443-1.093c-.026-.058-.224-.553-.442-1.094-.563-1.412-.526-1.354-.834-1.365-.146-.005-.291 0-.323.016Z'
    />
    <path
      fill='#FBFDFF'
      d='M24 5.917a.841.841 0 0 0-.531.802c0 .297.078.485.297.688.515.484 1.432.15 1.479-.537.036-.51-.1-.76-.516-.937-.265-.115-.49-.12-.729-.016ZM33.938 7.266v.755h-.729V9.48h.729v1.864c0 1.787.005 1.87.109 2.068.208.4.48.573 1.02.65.402.058 1.173.069 1.417.022l.162-.037V12.71h-.292c-.395 0-.614-.115-.718-.37-.068-.167-.084-.443-.084-1.531V9.48h1.146V8.02h-1.146v-1.51h-1.614v.755ZM63.677 7.266v.75l-.349.016-.354.015-.015.714-.016.719h.734v1.734c0 1.406.016 1.786.078 2.005.151.5.48.75 1.104.844.402.057 1.172.068 1.417.02l.162-.036V12.71h-.287c-.39 0-.614-.1-.718-.328-.079-.157-.09-.38-.09-1.542v-1.36h1.152l-.016-.718-.015-.714-.558-.015-.562-.016V6.511H63.677v.755ZM77.063 7.266v.755h-.339c-.187 0-.338.005-.343.01-.026.063-.042 1.24-.021 1.329.026.11.057.12.364.12h.334l.015 1.859c.016 1.791.021 1.875.13 2.073.204.385.485.562 1.01.646.37.062 1.194.072 1.449.026l.161-.037V12.71h-.286c-.406 0-.636-.11-.745-.35-.073-.166-.088-.421-.104-1.541l-.021-1.338h1.214l-.016-.72-.016-.713-.583-.015-.589-.016V6.511h-1.614v.755ZM29.25 8.105c-.328.088-.588.198-.791.343l-.146.1v-.423H26.646v5.891l.823-.015.818-.016.026-1.875c.03-2.104.03-2.104.411-2.432.537-.459 1.37-.266 1.594.37.062.187.078.557.078 2.098v1.865l.849-.01.844-.016.015-1.844c.016-2.031-.026-2.458-.28-3.026-.376-.838-1.527-1.286-2.574-1.01ZM40.318 8.058c-.521.052-1.25.333-1.662.64-.76.563-1.125 1.323-1.125 2.36 0 .906.224 1.536.724 2.062.422.438.724.625 1.386.854.432.146 1.62.157 2.083.016a3.076 3.076 0 0 0 1.51-.995c.24-.291.26-.26-.51-.703l-.557-.318-.25.209c-.438.37-.651.448-1.183.448-.724 0-1.208-.23-1.427-.667l-.11-.219 2.256-.026 2.25-.026.016-.495c.036-1.161-.318-1.948-1.151-2.567-.547-.412-1.49-.651-2.25-.573Zm.781 1.531c.36.099.755.474.833.786l.037.146h-1.36c-.906 0-1.359-.015-1.359-.052 0-.031.047-.14.099-.25.281-.547 1.047-.823 1.75-.63ZM47.974 8.052c-.573.12-.953.287-1.25.547l-.182.162v-.636H44.875v5.886h1.656l.021-1.578.016-1.573.135-.292c.245-.52.781-.844 1.521-.917l.297-.03v-1.6l-.219.005c-.125.006-.27.016-.328.026ZM51.932 8.094a3.374 3.374 0 0 0-.843.375c-.12.084-.12.084-.12-.13v-.214H49.302l.01 2.928.016 2.932.818.016.818.015.015-1.864.016-1.865.13-.26c.084-.167.214-.318.354-.417.203-.14.271-.156.605-.156.416.005.598.093.822.406.12.167.12.187.146 2.146l.026 1.979.85.016.853.015-.026-2.15c-.02-2.152-.02-2.152-.15-2.5-.329-.876-.907-1.267-1.943-1.319-.318-.02-.553 0-.73.047ZM58.756 8.058c-.459.036-1.256.302-1.51.5l-.293.219c-.718.53-1.093 1.484-1.015 2.578.057.797.292 1.343.77 1.828.678.672 1.595.99 2.678.911.557-.036.916-.135 1.349-.359.323-.172 1.068-.854 1.068-.98 0-.04-.09-.119-.198-.182a51.316 51.316 0 0 1-.62-.354l-.427-.25-.25.22a2.071 2.071 0 0 1-.47.317c-.582.265-1.525.13-1.957-.276-.1-.1-.297-.422-.297-.495 0-.005 1.02-.016 2.265-.016h2.266v-.64c0-.474-.026-.719-.099-.964-.349-1.14-1.307-1.896-2.578-2.047a4.347 4.347 0 0 0-.448-.036 2.9 2.9 0 0 1-.234.026Zm.76 1.536c.37.125.693.433.823.782l.057.145H57.631l.03-.12c.11-.364.5-.718.902-.812.281-.068.75-.068.953.005ZM72.427 8.058c-.552.073-1.281.37-1.52.625-.271.286-.376.61-.376 1.187 0 .454.016.558.125.777.151.296.495.62.823.76.266.12.87.27 1.521.385.734.13.917.235.854.48-.036.13-.307.312-.526.354-.442.078-1.317-.146-1.849-.474a1.047 1.047 0 0 0-.234-.12c-.052.005-.849 1.078-.849 1.146 0 .099.74.531 1.167.682.921.328 2.291.323 2.963-.005.537-.271.802-.589.943-1.136.104-.395.104-.614 0-1.02-.078-.297-.25-.6-.438-.745-.359-.297-.78-.433-2.057-.672-.666-.12-.86-.245-.781-.49.041-.125.448-.312.682-.312.292 0 .787.146 1.23.364.364.178.406.188.473.11.334-.386.771-1.016.745-1.073-.047-.125-.823-.547-1.255-.677-.417-.13-1.234-.203-1.64-.146ZM82.797 8.1a5.07 5.07 0 0 0-.62.244c-1.635.807-2.015 3.495-.692 4.906.458.49.963.735 1.682.813.745.083 1.417-.047 1.901-.375l.219-.146.015.219.016.224.823.015.818.016V8.125H85.292V8.6l-.167-.125a3.036 3.036 0 0 0-.484-.27c-.276-.13-.385-.152-.938-.167-.447-.01-.708.01-.906.062Zm1.547 1.463c.375.11.787.5.912.875.125.36.12.995-.01 1.297-.147.333-.433.63-.746.765-.229.1-.338.115-.713.094-.516-.026-.781-.135-1.037-.432-.323-.365-.395-.573-.4-1.12 0-.453.015-.52.156-.776.364-.656 1.062-.927 1.838-.703ZM91.464 8.053c-.568.125-1.021.333-1.287.583l-.146.135v-.646h-1.666l.01 2.928.016 2.932h1.614l.026-1.589c.026-1.547.032-1.593.151-1.817.136-.256.459-.594.677-.709.204-.099.745-.234.964-.234h.193L92 8.839l-.016-.792-.208-.01c-.114 0-.255.005-.312.016ZM94.589 8.058c-.287.031-.891.213-1.183.36-.343.176-.49.327-.646.676-.114.256-.135.386-.135.776 0 .568.104.85.432 1.162.386.375.86.552 1.912.734.698.12.969.235.99.427.02.193-.225.391-.547.438-.48.062-1.26-.136-1.771-.459-.125-.078-.245-.14-.271-.14-.031 0-.224.229-.427.505-.209.281-.401.542-.433.583-.041.058-.03.089.037.13.052.032.146.1.203.146.146.12.781.427 1.11.537.145.047.51.11.817.14 1.406.152 2.448-.239 2.818-1.052.088-.192.11-.338.11-.807 0-.667-.063-.854-.402-1.187-.36-.36-.682-.48-1.974-.72-.719-.135-.942-.244-.916-.452.01-.11.067-.167.25-.26.27-.136.474-.146.906-.032.245.063.88.333 1.125.474.016.01.193-.198.39-.463.198-.266.391-.516.428-.553.104-.109.083-.145-.204-.338-.78-.51-1.64-.719-2.62-.625ZM23.573 11.094v2.917H25.188V8.177H23.573v2.917Z'
    />
  </svg>
);

const KryptonumLogo = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={77}
    height={18}
    viewBox='0 0 77 18'
    fill='none'
    {...props}
  >
    <path
      fill='url(#a)'
      d='M11.679 9c0 .665-.204 1.315-.585 1.871a3.545 3.545 0 0 1-1.562 1.26v5.748H6.67v-5.75a3.54 3.54 0 0 1-1.562-1.259A3.304 3.304 0 0 1 4.524 9c0-.664.203-1.314.584-1.87A3.54 3.54 0 0 1 6.67 5.87V.121h2.862V5.87a3.542 3.542 0 0 1 1.563 1.26c.38.556.584 1.206.584 1.871Z'
    />
    <path
      fill='url(#b)'
      d='M16.816 0v4.098l-2.99 2.853-1.43-1.366-.92.88a4.217 4.217 0 0 0-.717-.684L16.816 0Z'
    />
    <path
      fill='url(#c)'
      d='m13.827 11.05 2.989 2.852V18l-6.056-5.78c.265-.2.506-.43.715-.684l.921.88 1.43-1.367Z'
    />
    <path
      fill='#EFF0F3'
      d='M3.81 9c-.003.92.322 1.814.92 2.535L.947 15.147v-4.098l1.431-1.366V8.317L.948 6.951V2.853L4.73 6.464A3.958 3.958 0 0 0 3.81 9ZM23.52 13l-3.364-3.727V13H19.09V4.832h1.066v3.785l3.375-3.785h1.348l-3.703 4.09L24.914 13H23.52Zm2.597-5.379c.187-.367.453-.652.797-.855.351-.204.777-.305 1.277-.305v1.101h-.281c-1.196 0-1.793.649-1.793 1.946V13H25.05V6.578h1.067v1.043Zm8.543-1.043-3.867 9.445h-1.101l1.265-3.093-2.59-6.352h1.184l2.016 5.203 1.992-5.203h1.101Zm1.318 1.184a2.51 2.51 0 0 1 .938-.914c.422-.25.91-.375 1.465-.375.57 0 1.086.136 1.547.41.468.273.836.66 1.101 1.16.266.492.399 1.066.399 1.723 0 .648-.133 1.226-.399 1.734a2.932 2.932 0 0 1-2.648 1.605c-.547 0-1.032-.12-1.453-.363a2.7 2.7 0 0 1-.95-.926v4.23h-1.066V6.579h1.066v1.184Zm4.36 2.004c0-.485-.098-.907-.293-1.266a2.016 2.016 0 0 0-.797-.82 2.158 2.158 0 0 0-1.09-.282c-.39 0-.754.098-1.09.293a2.1 2.1 0 0 0-.797.832c-.195.36-.293.778-.293 1.254 0 .485.098.91.293 1.278.203.36.47.636.797.832a2.2 2.2 0 0 0 1.09.281c.398 0 .762-.094 1.09-.281.336-.196.602-.473.797-.832.195-.367.293-.797.293-1.29Zm2.915-2.309v3.785c0 .313.067.535.2.668.132.125.363.188.69.188h.786V13h-.961c-.594 0-1.039-.137-1.336-.41-.297-.274-.445-.723-.445-1.348V7.457h-.832v-.879h.832V4.961h1.066v1.617h1.676v.879h-1.676Zm4.89 5.648a3.321 3.321 0 0 1-1.64-.41 2.98 2.98 0 0 1-1.15-1.16c-.273-.508-.41-1.094-.41-1.758 0-.656.141-1.234.423-1.734.289-.508.68-.895 1.171-1.16a3.344 3.344 0 0 1 1.653-.41c.61 0 1.16.136 1.652.41a2.88 2.88 0 0 1 1.16 1.148c.29.5.434 1.082.434 1.746 0 .664-.149 1.25-.445 1.758-.29.5-.684.887-1.184 1.16-.5.274-1.055.41-1.664.41Zm0-.937c.383 0 .742-.09 1.078-.27.336-.18.606-.449.809-.808.21-.36.316-.797.316-1.313 0-.515-.101-.953-.305-1.312a1.956 1.956 0 0 0-.796-.797 2.185 2.185 0 0 0-1.067-.27c-.39 0-.75.09-1.078.27-.32.172-.578.437-.773.797-.196.36-.294.797-.294 1.312 0 .524.094.965.282 1.325.195.359.453.628.773.808.32.172.672.258 1.055.258Zm6.945-5.707c.781 0 1.414.238 1.898.715.485.469.727 1.148.727 2.039V13h-1.055V9.367c0-.64-.16-1.129-.48-1.465-.32-.343-.758-.515-1.313-.515-.562 0-1.011.176-1.347.527-.328.352-.492.863-.492 1.535V13h-1.067V6.578h1.066v.914c.212-.328.497-.582.856-.762.367-.18.77-.27 1.207-.27Zm9.008.117V13h-1.067v-.95a2.108 2.108 0 0 1-.855.774c-.36.18-.758.27-1.196.27-.5 0-.949-.102-1.347-.305a2.332 2.332 0 0 1-.95-.937c-.226-.415-.34-.918-.34-1.512V6.578h1.055V10.2c0 .633.16 1.121.48 1.465.321.336.759.504 1.313.504.57 0 1.02-.176 1.348-.527.328-.352.492-.864.492-1.536V6.578h1.067Zm8.468-.117c.5 0 .946.105 1.336.316.39.203.7.512.926.926.226.414.34.918.34 1.512V13H74.11V9.367c0-.64-.16-1.129-.48-1.465-.313-.343-.739-.515-1.278-.515-.554 0-.996.18-1.324.539-.328.351-.492.863-.492 1.535V13h-1.055V9.367c0-.64-.16-1.129-.48-1.465-.313-.343-.739-.515-1.278-.515-.554 0-.996.18-1.324.539-.328.351-.492.863-.492 1.535V13H64.84V6.578h1.067v.926c.21-.336.492-.594.844-.774.359-.18.754-.27 1.183-.27.54 0 1.016.122 1.43.364.414.242.723.598.926 1.067.18-.454.476-.805.89-1.055.414-.25.875-.375 1.383-.375Z'
    />
    <defs>
      <linearGradient
        id='a'
        x1={11.544}
        x2={4.073}
        y1={0.121}
        y2={0.313}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2DD282' />
        <stop
          offset={1}
          stopColor='#90F4E8'
        />
      </linearGradient>
      <linearGradient
        id='b'
        x1={16.702}
        x2={10.393}
        y1={0}
        y2={0.35}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2DD282' />
        <stop
          offset={1}
          stopColor='#90F4E8'
        />
      </linearGradient>
      <linearGradient
        id='c'
        x1={16.702}
        x2={10.393}
        y1={11.049}
        y2={11.399}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2DD282' />
        <stop
          offset={1}
          stopColor='#90F4E8'
        />
      </linearGradient>
    </defs>
  </svg>
);

const AutomanufakturaText = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={1358}
    height={110}
    viewBox='0 0 1358 110'
    fill='none'
    {...props}
  >
    <path
      fill='#111317'
      d='M.345 107.648 38.382 1.468h22.616l37.964 106.18H77.594l-8.665-24.599H30.745l-8.885 24.599H.345Zm35.173-43.323h28.27l-14.024-42.15-14.246 42.15ZM180.445 67.188c0 8.567-1.395 16.008-4.186 22.323-2.79 6.266-7.318 11.113-13.584 14.539-6.217 3.378-14.466 5.067-24.746 5.067-10.329 0-18.602-1.713-24.819-5.14-6.217-3.476-10.721-8.396-13.511-14.76-2.742-6.364-4.113-13.951-4.113-22.763V1.47h21.809v66.6c0 7.931 1.909 13.732 5.728 17.403 3.818 3.623 8.787 5.434 14.906 5.434 4.063 0 7.661-.783 10.794-2.35 3.133-1.615 5.581-4.087 7.343-7.416 1.811-3.378 2.717-7.734 2.717-13.07V1.469h21.662v65.72Z'
    />
    <path
      fill='#111317'
      d='M177.968 20.56V1.47h84.958V20.56h-31.354v87.088h-21.515V20.56h-32.089ZM306.585 109.117c-10.035 0-18.725-2.178-26.068-6.535-7.294-4.406-12.948-10.648-16.962-18.725-3.965-8.126-5.948-17.819-5.948-29.078 0-11.308 2.007-21.05 6.021-29.225 4.064-8.176 9.767-14.466 17.11-18.872C288.081 2.227 296.696 0 306.585 0c9.84 0 18.406 2.203 25.701 6.609 7.294 4.405 12.923 10.696 16.888 18.871 4.015 8.175 6.022 17.942 6.022 29.299 0 11.21-1.983 20.878-5.948 29.005-3.916 8.126-9.522 14.392-16.816 18.798-7.294 4.357-15.909 6.535-25.847 6.535Zm0-17.623c5.189 0 9.668-1.224 13.438-3.672 3.818-2.496 6.755-6.413 8.811-11.749 2.056-5.384 3.084-12.385 3.084-21 0-8.861-1.052-16.033-3.157-21.516-2.056-5.482-4.993-9.496-8.812-12.042-3.769-2.595-8.224-3.892-13.364-3.892-5.14 0-9.619 1.297-13.438 3.892-3.818 2.546-6.78 6.584-8.885 12.116-2.105 5.483-3.157 12.63-3.157 21.441 0 8.665 1.052 15.666 3.157 21.001 2.105 5.336 5.067 9.253 8.885 11.75 3.819 2.447 8.298 3.67 13.438 3.67ZM359.49 107.648V1.468h31.134l24.306 75.707 24.525-75.706h31.061v106.179h-21.662V26.435l-25.553 81.213h-16.816l-25.406-80.846v80.846H359.49ZM471.76 107.648l38.037-106.18h22.616l37.964 106.18h-21.369l-8.664-24.599H502.16l-8.885 24.599H471.76Zm35.173-43.323h28.271l-14.026-42.15-14.245 42.15ZM641.319 1.469h21.442v106.179h-19.312l-50.447-73.063v73.063h-21.368V1.468h21.221l48.464 70.273V1.47ZM755.207 67.188c0 8.567-1.395 16.008-4.186 22.323-2.79 6.266-7.318 11.113-13.584 14.539-6.217 3.378-14.466 5.067-24.746 5.067-10.329 0-18.602-1.713-24.82-5.14-6.217-3.476-10.72-8.396-13.511-14.76-2.741-6.364-4.112-13.951-4.112-22.763V1.47h21.809v66.6c0 7.931 1.909 13.732 5.727 17.403 3.819 3.623 8.788 5.434 14.907 5.434 4.063 0 7.661-.783 10.794-2.35 3.133-1.615 5.581-4.087 7.343-7.416 1.811-3.378 2.717-7.734 2.717-13.07V1.469h21.662v65.72ZM761.835 1.469h72.255l-.073 17.917h-50.594V46.04h43.838v17.55h-43.838v44.057h-21.588V1.468ZM819.463 107.648l38.036-106.18h22.617l37.963 106.18h-21.368l-8.665-24.599h-38.183l-8.885 24.599h-21.515Zm35.172-43.323h28.271l-14.025-42.15-14.246 42.15ZM1008.77 107.648h-23.346L957.3 58.23l-15.714 18.945v30.473h-22.25V1.468h22.25V50.08l38.697-48.61h24.597l-32.233 41.12 36.123 65.059Z'
    />
    <path
      fill='#111317'
      d='M1001.82 20.56V1.47h84.96V20.56h-31.36v87.088h-21.51V20.56h-32.09Z'
    />
    <path
      fill='#111317'
      d='M1171.69 67.188c0 8.567-1.39 16.008-4.18 22.323-2.79 6.266-7.32 11.113-13.59 14.539-6.21 3.378-14.46 5.067-24.74 5.067-10.33 0-18.61-1.713-24.82-5.14-6.22-3.476-10.72-8.396-13.51-14.76-2.75-6.364-4.12-13.951-4.12-22.763V1.47h21.81v66.6c0 7.931 1.91 13.732 5.73 17.403 3.82 3.623 8.79 5.434 14.91 5.434 4.06 0 7.66-.783 10.79-2.35 3.13-1.615 5.58-4.087 7.34-7.416 1.81-3.378 2.72-7.734 2.72-13.07V1.469h21.66v65.72ZM1260.71 107.648h-22.25l-17.26-40.9h-21.51v40.9h-21.37V1.468h44.79c8.47 0 15.4 1.347 20.78 4.04 5.39 2.692 9.35 6.437 11.9 11.234 2.54 4.748 3.82 10.231 3.82 16.448 0 5.581-.88 10.305-2.65 14.172-1.71 3.819-3.99 7-6.82 9.546-2.8 2.546-5.85 4.626-9.18 6.242l19.75 44.498Zm-41.42-57.422c5.73 0 10.26-1.542 13.59-4.626 3.38-3.084 5.07-7.05 5.07-11.896 0-4.895-1.62-8.762-4.85-11.602-3.23-2.839-7.32-4.259-12.26-4.259h-21.15v32.383h19.6Z'
    />
    <path
      fill='#111317'
      d='m1259.04 107.648 38.04-106.18h22.61l37.97 106.18h-21.37l-8.67-24.599h-38.18l-8.89 24.599h-21.51Zm35.17-43.323h28.27l-14.02-42.15-14.25 42.15Z'
    />
  </svg>
);
