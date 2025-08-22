export const itemsQueryKeys = {
  all: ["items"],
  list: (searchQuery: string) => [...itemsQueryKeys.all, searchQuery],
  detail: (id: string) => [...itemsQueryKeys.all, id],
};
