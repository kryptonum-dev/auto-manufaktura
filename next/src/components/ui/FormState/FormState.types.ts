import { PortableTextBlock } from 'next-sanity';

export type FormStatusTypes = {
  sending: boolean;
  success: boolean | undefined;
};

export type FormStateDataTypes = {
  success: {
    heading: PortableTextBlock[];
    paragraph: PortableTextBlock[];
    ctaText?: string;
  };
  error: {
    heading: PortableTextBlock[];
    paragraph: PortableTextBlock[];
    ctaText?: string;
  };
};

export type FormStateContentTypes = {
  success: {
    Heading: React.ReactNode;
    Paragraph: React.ReactNode;
    ctaText?: string;
  };
  error: {
    Heading: React.ReactNode;
    Paragraph: React.ReactNode;
    ctaText?: string;
  };
};

export type FormStateTypes = {
  content: FormStateContentTypes;
  success: FormStatusTypes['success'];
  setStatus: React.Dispatch<React.SetStateAction<FormStatusTypes>>;
  withLight?: boolean;
  className?: string;
};
