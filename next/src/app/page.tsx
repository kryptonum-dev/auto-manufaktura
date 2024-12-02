import { QueryMetadata } from '@/global/seo/query-metadata';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default async function IndexPage() {
  return (
    <>
      <Breadcrumbs />
    </>
  );
}

export async function generateMetadata() {
  return await QueryMetadata({
    name: 'Index_Page',
    path: '',
  });
}
