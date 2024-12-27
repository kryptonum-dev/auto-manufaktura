import type { PortableTextBlock } from 'next-sanity';
import type { FullCtaBoxTypes } from '@/components/ui/FullCtaBox';
import type { MediaDataTypes } from '@/components/ui/Media';
import type { ButtonDataTypes } from '@/components/ui/Button';

export type FourStepsSectionTypes = {
  index: number;
  heading: PortableTextBlock[];
  fullCtaBox: FullCtaBoxTypes;
  media: MediaDataTypes;
  steps: {
    text: PortableTextBlock[];
    cta?: ButtonDataTypes;
  }[];
};
