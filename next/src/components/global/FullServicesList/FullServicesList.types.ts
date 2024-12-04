import { PortableTextBlock } from 'next-sanity';
import { ServiceTypes } from '@/components/ui/ServiceCard';

export type FullServicesListTypes = {
  index: number;
  heading: PortableTextBlock[];
  highlightedService: {
    heading: PortableTextBlock[];
    label: string;
    service: ServiceTypes;
  };
  services: (ServiceTypes & {
    list: ServiceTypes[];
  })[];
};
