import type { ImgDataTypes } from '@/components/ui/Img';

export type ServiceTypes = {
  name: string;
  image: ImgDataTypes;
  slug: string;
  tags: string[];
  label?: string;
};

export type ServiceCardTypes = ServiceTypes & {
  size?: 'large' | 'small';
  className?: string;
  imagePriority?: boolean;
};
