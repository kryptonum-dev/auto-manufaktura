export type BreadcrumbsDataTypes = {
  name: string;
  path: string;
}[];

export type BreadcrumbsTypes = {
  visible?: boolean;
  data?: BreadcrumbsDataTypes;
};
