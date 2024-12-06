import TextBlock from '@/components/ui/TextBlock';
import AccordionList from './_AccordionList';
import type { FaqTypes } from './Faq.types';
import styles from './Faq.module.scss';

export default function Faq({ index, heading, paragraph, list }: FaqTypes) {
  const _list = list.map(({ answer, question }) => ({
    question: <TextBlock value={question} />,
    answer: <TextBlock value={answer} />,
  }));

  return (
    <section className={`${styles['Faq']} max-width`}>
      <header>
        <TextBlock
          className='heading-2xl'
          value={heading}
          tag={index === 0 ? 'h1' : 'h2'}
        />
        {paragraph && <TextBlock value={paragraph} />}
      </header>
      <AccordionList list={_list} />
    </section>
  );
}
