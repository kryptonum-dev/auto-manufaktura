import { type PortableTextBlock, toPlainText } from 'next-sanity';

export type ReadingTimeContentTypes = (
  | (PortableTextBlock[] & { _type: string })
  | { _type: 'Quote'; text: PortableTextBlock[] }
  | {
      _type: 'ListWithImages';
      list: {
        heading: PortableTextBlock[];
        paragraph?: PortableTextBlock[];
      }[];
    }
)[];

export const ReadingTimeContentQuery = `
  content[]{
    _type == "block" => {
      ...
    },
    _type == "ListWithImages" => {
      _type,
      list[]{
        heading,
        paragraph
      }
    },
    _type == "Quote" => {
      _type,
      text
    }
  }
`;

const convertToPlainText = (content: ReadingTimeContentTypes): string =>
  content
    .map(item => {
      if (!item) return '';
      if (item._type === 'block') return toPlainText(item);
      if (item._type === 'Quote' && 'text' in item) return toPlainText(item.text);
      if (item._type === 'ListWithImages' && 'list' in item)
        return item.list.map(
          ({ heading, paragraph }) => `${toPlainText(heading)} ${paragraph ? toPlainText(paragraph) : ''}`
        );
      return '';
    })
    .join(' ') || '';

const readingTime = (text: string): number => {
  const countWords = (text: string): number => {
    const trimmedText = text.trim();
    if (trimmedText === '') return 0;
    const words = trimmedText.split(/\s+/);
    return words.length;
  };
  const words = countWords(text);
  const averageReadingSpeedWordsPerMinute = 200;
  return Math.ceil(words / averageReadingSpeedWordsPerMinute);
};

export default function ReadingTime({
  className = '',
  content,
}: {
  content: ReadingTimeContentTypes;
  className?: string;
}) {
  const time = readingTime(convertToPlainText(content));
  return (
    <span className={className}>
      {time} {time === 1 ? 'minuta' : [2, 3, 4].includes(time) ? 'minuty' : 'minut'} czytania
    </span>
  );
}
