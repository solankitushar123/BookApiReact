import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../../services";

const QUERY_KEY = ["@master/category"];

/* ------------------ GET ------------------ */

export function useCategoryQuery() {
  return useQuery({
    queryKey: QUERY_KEY,

    queryFn: async () => {
      return await ApiService.get<Master.CategoryItem[]>("category");
    },
  });
}

/* ------------------ DELETE ------------------ */

export function useRemoveCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await ApiService.del("category/" + id),

    onSuccess: (_, id) => {
      const data = queryClient.getQueryData<Master.CategoryItem[]>(QUERY_KEY);

      if (!data) return;

      const newData = data.filter((item) => item.categoryId !== id);

      queryClient.setQueryData(
        QUERY_KEY,

        newData,
      );
    },
  });
}

/* ------------------ UPDATE ------------------ */

export function useUpdateCategoryMutation(categoryId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: Master.CategoryForm) =>
      await ApiService.put<Master.CategoryItem>(
        "category/" + categoryId,

        category,
      ),

    onSuccess: (result) => {
      if (!result) return;

      const existing =
        queryClient.getQueryData<Master.CategoryItem[]>(QUERY_KEY);

      if (!existing) return;

      const index = existing.findIndex(
        (item) => item.categoryId === categoryId,
      );

      const first = existing.slice(0, index);

      const next = existing.slice(index + 1);

      queryClient.setQueryData(
        QUERY_KEY,

        [...first, result, ...next],
      );
    },
  });
}

/* ------------------ CREATE ------------------ */

export function useNewCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: Master.CategoryForm) =>
      await ApiService.post<Master.CategoryItem>(
        "category",

        category,
      ),

    onSuccess: (result) => {
      if (!result) return;

      const existing =
        queryClient.getQueryData<Master.CategoryItem[]>(QUERY_KEY);

      if (!existing) return;

      queryClient.setQueryData(
        QUERY_KEY,

        [...existing, result],
      );
    },
  });
}
