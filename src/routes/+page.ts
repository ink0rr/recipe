import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, url }) => {
  return {
    searchParams: url.searchParams,
  };
};
