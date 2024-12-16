import type { BreadcrumbsDataTypes } from '@/components/ui/Breadcrumbs';
import CarBrandsList, { CarBrandsListQuery, type CarBrandsListTypes } from '@/components/global/CarBrandsList';
import FullServicesList, {
  FullServicesListQuery,
  type FullServicesListTypes,
} from '@/components/global/FullServicesList';
import SelectedServicesList, {
  SelectedServicesListQuery,
  type SelectedServicesListTypes,
} from './global/SelectedServicesList';
import Reviews, { ReviewsQuery, type ReviewsTypes } from '@/components/global/Reviews';
import Faq, { FaqQuery, type FaqTypes } from '@/components/global/Faq';
import ContactForm, { ContactFormQuery, type ContactFormTypes } from '@/components/global/ContactForm';
import Prices, { PricesQuery, type PricesTypes } from '@/components/global/Prices';
import PriceTable, { PriceTableQuery, type PriceTableTypes } from '@/components/global/PriceTable';
import FeaturesSection, { FeaturesSectionQuery, type FeaturesSectionTypes } from '@/components/global/FeaturesSection';

type ComponentsMapTypes = {
  CarBrandsList: CarBrandsListTypes;
  FullServicesList: FullServicesListTypes;
  SelectedServicesList: SelectedServicesListTypes;
  Reviews: ReviewsTypes;
  Faq: FaqTypes;
  ContactForm: ContactFormTypes;
  Prices: PricesTypes;
  PriceTable: PriceTableTypes;
  FeaturesSection: FeaturesSectionTypes;
};

export type ComponentTypes = ComponentsMapTypes[keyof ComponentsMapTypes] & {
  _type: string;
  index: number;
};

const componentsMap: Record<string, (props: ComponentTypes) => React.ReactNode> = {
  CarBrandsList: props => <CarBrandsList {...(props as CarBrandsListTypes)} />,
  FullServicesList: props => <FullServicesList {...(props as FullServicesListTypes)} />,
  SelectedServicesList: props => <SelectedServicesList {...(props as SelectedServicesListTypes)} />,
  Reviews: props => <Reviews {...(props as ReviewsTypes)} />,
  Faq: props => <Faq {...(props as FaqTypes)} />,
  ContactForm: props => <ContactForm {...(props as ContactFormTypes)} />,
  Prices: props => <Prices {...(props as PricesTypes)} />,
  PriceTable: props => <PriceTable {...(props as PriceTableTypes)} />,
  FeaturesSection: props => <FeaturesSection {...(props as FeaturesSectionTypes)} />,
};

type ComponentsPropsTypes = {
  data: ComponentTypes[];
  hasPreviousSections?: boolean;
  breadcrumbs?: BreadcrumbsDataTypes;
};

export default function Components({ data, hasPreviousSections = false, breadcrumbs }: ComponentsPropsTypes) {
  return data?.map((item, i) => {
    const componentType = item._type as keyof ComponentsMapTypes;
    const index = hasPreviousSections ? i + 1 : i;
    const Component = componentsMap[componentType]?.({
      ...item,
      ...(index === 0 && { breadcrumbs }),
      index,
    });
    return Component || null;
  });
}

export const ComponentsQuery = `
  components[] {
    _type,
    sectionId,
    ${CarBrandsListQuery}
    ${FullServicesListQuery}
    ${SelectedServicesListQuery}
    ${ReviewsQuery}
    ${FaqQuery}
    ${ContactFormQuery}
    ${PricesQuery}
    ${PriceTableQuery}
    ${FeaturesSectionQuery}
  }
`;
