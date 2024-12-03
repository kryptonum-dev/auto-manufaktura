import NextImage from 'next/image';

const defaultPlaceholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUltCqBwABcQDWMIsO5gAAAABJRU5ErkJggg==';

export const ImgDataQuery = (name: string) => /* groq */ `
  ${name} {
    asset->{
      url,
      altText,
      "lqip": metadata.lqip,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height
    },
  }
`;

export type ImgDataTypes = {
  asset: {
    url: string;
    lqip: string;
    width: number;
    height: number;
    altText: string;
  };
};

export type ImgPropsTypes = (
  | {
      data: ImgDataTypes;
      src?: never;
      width?: number;
      height?: number;
      alt?: string;
    }
  | {
      data?: never;
      src: string;
      width: number;
      height: number;
      alt: string;
    }
) & {
  sizes: string;
  priority?: boolean;
} & React.HTMLAttributes<HTMLImageElement>;

export default function Img({ data, src, width, height, alt, sizes, priority, ...props }: ImgPropsTypes) {
  const placeholder = data?.asset?.lqip || defaultPlaceholder;

  if (data) {
    src = data?.asset?.url;
    width = width || data?.asset?.width;
    height = height || data?.asset?.height;
    alt = alt || data?.asset?.altText;
  }

  return (
    <NextImage
      src={src!}
      width={width}
      height={height}
      alt={alt || ''}
      sizes={sizes}
      priority={priority}
      {...((width! > 40 || height! > 40) && {
        blurDataURL: placeholder,
        placeholder: 'blur',
      })}
      {...props}
    />
  );
}
