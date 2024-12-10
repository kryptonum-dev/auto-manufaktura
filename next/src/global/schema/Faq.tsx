type FaqSchemaTypes = {
  data?: {
    question: string;
    answer: string;
  }[];
};

export default function FaqSchema({ data }: FaqSchemaTypes) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data?.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: answer,
            },
          })),
        }),
      }}
    />
  );
}
