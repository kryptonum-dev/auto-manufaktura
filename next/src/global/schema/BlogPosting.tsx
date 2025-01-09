type BlogPostingSchemaTypes = {
  title: string;
  publishedAt: string;
  image: string;
};

export default function BlogPostingSchema({ title, publishedAt, image }: BlogPostingSchemaTypes) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          datePublished: publishedAt,
          image: [image],
        }),
      }}
    />
  );
}
