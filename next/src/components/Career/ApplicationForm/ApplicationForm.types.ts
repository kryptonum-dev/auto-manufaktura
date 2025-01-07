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
  formStates: FormStateContentTypes;
  workshops: { email: string; address: string; jobs: string[] }[];
};

export type ApplicationFormTypes = {
  workshops: { email: string; address: string; jobs: string[] }[];
} & ApplicationFormDataTypes;
