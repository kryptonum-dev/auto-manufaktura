import type { ImgDataTypes } from '@/components/ui/Img';

export type ServiceTypes = {
  name: string;
  image: ImgDataTypes;
  slug: string;
  tags: string[];
};

export type ServiceCardTypes = ServiceTypes & {
  size?: 'large' | 'small';
  label?: string;
  className?: string;
  imagePriority?: boolean;
};
