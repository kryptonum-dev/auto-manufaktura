import type { BreadcrumbsTypes } from '@/components/ui/Breadcrumbs';
import CarBrandsList, { CarBrandsListQuery, type CarBrandsListTypes } from '@/components/global/CarBrandsList';

type ComponentsMapTypes = {
  CarBrandsList: CarBrandsListTypes;
};

export type ComponentTypes = ComponentsMapTypes[keyof ComponentsMapTypes] & {
  _type: string;
  index: number;
};

const componentsMap: Record<string, (props: ComponentTypes) => React.ReactNode> = {
  CarBrandsList: props => <CarBrandsList {...(props as CarBrandsListTypes)} />,
};

type ComponentsPropsTypes = {
  data: ComponentTypes[];
  hasPreviousSections?: boolean;
  breadcrumbs?: BreadcrumbsTypes;
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
  }
`;
