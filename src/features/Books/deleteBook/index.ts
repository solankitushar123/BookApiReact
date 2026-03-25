import { ApiService } from "../../../services";

export const deleteBookById = async (id: number) => {
  await ApiService.del(`books/${id}`);
};