//import { toPlainText } from 'next-sanity';
//import FaqSchema from '@/global/schema/Faq';
import TextBlock from '@/components/ui/TextBlock';
import AccordionList from './_AccordionList';
import type { FaqTypes } from './Faq.types';
import styles from './Faq.module.scss';
import Form from './_Form';

export default function Faq({ index, heading, paragraph, list }: FaqTypes) {
  const _list = list.map(({ answer, question }) => ({
    question: <TextBlock value={question} />,
    answer: (
      <TextBlock
        value={answer}
        linkClassName='link'
      />
    ),
  }));

  const formStates = {
    success: {
      Heading: <p className='text-xl'>Formularzy wysłany pomyślnie</p>,
      Paragraph: <p>Odpowiedzi spodziewaj się do 24 godzin</p>,
      ctaText: 'Prześlij kolejne pytanie',
    },
    error: {
      Heading: <p className='text-xl'>Nie udało się wysłać formularza</p>,
      Paragraph: <p>To może być problem z serwerami. Spróbuj ponownie teraz lub za 5 minut</p>,
      ctaText: 'Spróbuj ponownie',
    },
  };

  return (
    <>
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
        <Form states={formStates} />
      </section>
      {/* <FaqSchema
        data={list.map(({ question, answer }) => ({ question: toPlainText(question), answer: toPlainText(answer) }))}
      /> */}
    </>
  );
}
