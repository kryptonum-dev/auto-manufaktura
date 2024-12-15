import type { PortableTextBlock } from 'next-sanity';
import type { ServiceTypes } from '@/components/ui/ServiceCard';

export type FullServicesListTypes = {
  index: number;
  heading: PortableTextBlock[];
  highlightedService: ServiceTypes & {
    highlightedHeading: PortableTextBlock[];
    label: string;
    service: ServiceTypes;
  };
  services: (ServiceTypes & {
    list: ServiceTypes[];
  })[];
};
