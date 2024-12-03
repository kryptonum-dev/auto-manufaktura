import type { PortableTextBlock } from 'next-sanity';
import type { ButtonDataTypes } from '@/components/ui/Button';

export type FullCtaBoxTypes = {
  mainText: PortableTextBlock[];
  secondaryText: PortableTextBlock[];
  cta: ButtonDataTypes;
};
