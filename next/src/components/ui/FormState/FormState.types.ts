import { PortableTextBlock } from 'next-sanity';

export type FormStatusTypes = {
  sending: boolean;
  success: boolean | undefined;
};

export type FormStateDataTypes = {
  success: {
    heading: PortableTextBlock[];
    paragraph: PortableTextBlock[];
  };
  error: {
    heading: PortableTextBlock[];
    paragraph: PortableTextBlock[];
  };
};

export type FormStateTypes = {
  content: FormStateDataTypes;
  success: FormStatusTypes['success'];
  setStatus: React.Dispatch<React.SetStateAction<FormStatusTypes>>;
  withLight?: boolean;
  className?: string;
};
