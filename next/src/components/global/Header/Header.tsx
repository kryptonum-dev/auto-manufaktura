import sanityFetch from '@/utils/sanity.fetch';
import TopBar, { TopBarQuery } from '../TopBar';
import type { HeaderQueryTypes } from './Header.types';
import styles from './Header.module.scss';

export default async function Header() {
  const { topBar } = await query();

  return (
    <>
      <a
        href='#main'
        className={styles.skipLink}
      >
        Przejdź do głównej treści
      </a>
      <TopBar {...topBar} />
    </>
  );
}

const query = async (): Promise<HeaderQueryTypes> => {
  return await sanityFetch<HeaderQueryTypes>({
    query: /* groq */ `
      {
        "topBar": ${TopBarQuery}
      }
    `,
  });
};
