import Link from 'next/link';
import { PortableText, type PortableTextBlock, type PortableTextReactComponents } from 'next-sanity';

export type TextBlockTypes = {
  value: PortableTextBlock[];
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span' | 'p';
  className?: string;
  linkClassName?: string;
  bulletListClassName?: string;
  numberListClassName?: string;
} & React.HTMLAttributes<HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>;

const components = ({
  tag,
  className = '',
  bulletListClassName = '',
  numberListClassName = '',
  linkClassName = '',
  ...props
}: Partial<TextBlockTypes>) => {
  const Element = tag || 'p';

  return {
    block: {
      h2: ({ children }) => <h2 className='heading-xl'>{children}</h2>,
      h3: ({ children }) => <h3 className='text-l'>{children}</h3>,
      normal: ({ children }) => (
        <Element
          className={className}
          {...props}
        >
          {children}
        </Element>
      ),
    },
    marks: {
      link: ({ value, children }) => {
        const Element = value.linkType === 'external' ? 'a' : Link;
        return (
          <Element
            href={value.href}
            className={linkClassName}
            {...(value.linkType === 'external' &&
              !/^(tel:|mailto:)/.test(value.href) && { target: '_blank', rel: 'noopener' })}
          >
            {children}
          </Element>
        );
      },
    },
    list: {
      bullet: ({ children }) => <ul className={bulletListClassName}>{children}</ul>,
      number: ({ children }) => <ol className={numberListClassName}>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => (
        <li>
          <span>{children}</span>
        </li>
      ),
      number: ({ children }) => <li>{children}</li>,
    },
  } as Partial<PortableTextReactComponents>;
};

export const PortableTextQuery = (name?: string) => `
  ${name ? `${name}[]{` : ''}
    ...,
    "markDefs": coalesce(markDefs[] {
      ...,
      _type == "link" => {
        _type,
        _key,
        linkType,
        "href": select(
          linkType == "internal" => internal->slug.current,
          linkType == "external" => external,
          "#"
        )
      }
    }, [])
  ${name ? `}` : ''}
`;

export default function TextBlock({ value, ...props }: TextBlockTypes) {
  return (
    <PortableText
      components={components(props)}
      value={value}
    />
  );
}

// import Link from 'next/link';
// import { PortableText, type PortableTextBlock, type PortableTextReactComponents } from 'next-sanity';

// export type TextBlockTypes = {
//   value: PortableTextBlock[];
//   tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span' | 'p';
//   className?: string;
//   linkClassName?: string;
//   bulletListClassName?: string;
//   numberListClassName?: string;
// } & React.HTMLAttributes<HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>;

// const components = ({
//   tag,
//   className = '',
//   bulletListClassName = '',
//   numberListClassName = '',
//   linkClassName = '',
//   ...props
// }: Partial<TextBlockTypes>) => {
//   const Element = tag || 'p';

//   return {
//     block: {
//       normal: ({ children }) => (
//         <Element
//           className={className}
//           {...props}
//         >
//           {children}
//         </Element>
//       ),
//     },
//     marks: {
//       link: ({ value, children }) => {
//         const Element = value.linkType === 'external' ? 'a' : Link;
//         return (
//           <Element
//             href={value.href}
//             className={linkClassName}
//             {...(value.linkType === 'external' &&
//               !/^(tel:|mailto:)/.test(value.href) && { target: '_blank', rel: 'noopener' })}
//           >
//             {children}
//           </Element>
//         );
//       },
//     },
//     list: {
//       bullet: ({ children }) => <ul className={bulletListClassName}>{children}</ul>,
//       number: ({ children }) => <ol className={numberListClassName}>{children}</ol>,
//     },
//     listItem: {
//       bullet: ({ children }) => (
//         <li>
//           <span>{children}</span>
//         </li>
//       ),
//       number: ({ children }) => <li>{children}</li>,
//     },
//   } as Partial<PortableTextReactComponents>;
// };

// export const PortableTextQuery = (name?: string) => `
//   ${name ? `${name}[]{` : ''}
//     ...,
//     "markDefs": coalesce(markDefs[] {
//       ...,
//       _type == "link" => {
//         _type,
//         _key,
//         linkType,
//         "href": select(
//           linkType == "internal" => internal->slug.current,
//           linkType == "external" => external,
//           "#"
//         )
//       }
//     }, [])
//   ${name ? `}` : ''}
// `;

// export default function TextBlock({ value, ...props }: TextBlockTypes) {
//   return (
//     <PortableText
//       components={components(props)}
//       value={value}
//     />
//   );
// }
