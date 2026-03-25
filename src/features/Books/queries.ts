import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiService } from "../../services";

const QUERY_KEY = ["@master/books"];

/*  GET LIST  */

export function useBooksQuery( ) {
  return useQuery({
    queryKey: QUERY_KEY,

    queryFn: async () => {
      return await ApiService.get<Master.BookItem[]>("books");
    },
  });
}


/* ------------------ DELETE ------------------ */

export function useRemoveBookMutation() {
  const queryClient = useQueryClient();

  const rs = useMutation({
    mutationFn: async (id: number) => await ApiService.del("books/" + id),

    onSuccess: (_, id) => {
      const data = queryClient.getQueryData<Master.BookItem[]>(QUERY_KEY);

      if (!data) return;

      const newData = data.filter((item) => item.bookId !== id);

      queryClient.setQueryData(QUERY_KEY, newData);
    },
  });

  return rs;
}

/* ------------------ UPDATE ------------------ */

export function useUpdateBookMutation(bookId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: Master.BookForm) =>
      await ApiService.put<Master.BookItem>(
        "books/" + bookId,

        book,
      ),

    onSuccess: (result) => {
      if (!result) return;

      const existing = queryClient.getQueryData<Master.BookItem[]>(QUERY_KEY);

      if (!existing) return;

      const index = existing.findIndex((item) => item.bookId === bookId);

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

export function useNewBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: Master.BookForm) =>
      await ApiService.post<Master.BookItem>(
        "books",

        book,
      ),

    onSuccess: (result) => {
      if (!result) return;

      const existing = queryClient.getQueryData<Master.BookItem[]>(QUERY_KEY);

      if (!existing) return;

      queryClient.setQueryData(
        QUERY_KEY,

        [...existing, result],
      );
    },
  });
}
