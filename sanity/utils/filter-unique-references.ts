import type { ReferenceFilterResolverContext } from 'sanity';

type ReturnTypes =
  | {
      filter: string;
      params?: {
        selectedIds: (string | undefined)[];
      };
    }
  | {
      filter?: undefined;
      params?: undefined;
    };

export const filterUniqueReferences =
  (filter = '') =>
  ({ parent }: ReferenceFilterResolverContext): ReturnTypes => {
    const selectedIds = (parent as { _ref?: string }[]).filter(item => item._ref).map(item => item._ref) || [];
    if (selectedIds.length > 0) {
      return {
        filter: `!(_id in $selectedIds) && !(_id in path("drafts.**"))${filter ? ' && ' : ''}${filter}`,
        params: { selectedIds },
      };
    }
    if (filter) return { filter };
    return {};
  };
