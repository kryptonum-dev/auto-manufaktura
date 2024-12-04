import type { PortableTextBlock } from 'next-sanity';
import type { ServiceTypes } from '@/components/ui/ServiceCard';

export type SelectedServicesListTypes = {
  index: number;
  heading: PortableTextBlock[];
  paragraph?: PortableTextBlock[];
  highlightedService?: ServiceTypes & { label: string };
  services: ServiceTypes[];
};
