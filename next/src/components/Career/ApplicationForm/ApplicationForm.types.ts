import type { PortableTextBlock } from 'next-sanity';
import type { ImgDataTypes } from '@/components/ui/Img';
import type { FormStateDataTypes, FormStateContentTypes } from '@/components/ui/FormState';

export type ApplicationFormDataTypes = {
  heading: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  paragraph: PortableTextBlock[];
  images: ImgDataTypes[];
  formStates: FormStateDataTypes;
};

export type FormTypes = {
  workshops: { key: string; value: string }[];
  jobs: { name: string; workshops: { key: string; value: string }[] }[];
  formStates: FormStateContentTypes;
  application: { job: string; email: string };
  setApplication: React.Dispatch<
    React.SetStateAction<{
      email: string;
      job: string;
    }>
  >;
};

export type ApplicationFormTypes = FormTypes & ApplicationFormDataTypes;
