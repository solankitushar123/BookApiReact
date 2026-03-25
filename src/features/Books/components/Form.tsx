import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { Button } from "../../../shared/components/button";
import { useEffect } from "react";
import {useCategoryQuery} from "../../Category/queries"; 
interface FormProps {
  onSubmit: (p: Master.BookForm) => Promise<void>;
  onLoad?: () => Promise<Master.BookItem>;
  submitCaption: string;
}

export default function Form({
  onLoad,
  onSubmit,
  submitCaption
}: FormProps) {
  
  const { register, handleSubmit, formState, reset } = useForm<Master.BookForm>();
 const { data: categories = [] } = useCategoryQuery();
  // Correctly handle the async 'onLoad' to populate the form
  useEffect(() => {
    if (onLoad) {
      onLoad().then((data) => {
        reset(data); // This fills the form when data arrives
      });
    }
  }, [onLoad, reset]);

  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-xs items-center justify-center">
      <form
        className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4"
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
          navigate("/books");
        })}
      >
        <input 
          type="text" 
          {...register("bookName")} 
          placeholder="Book Name" 
          className="border p-2 w-full rounded"
        />
        
        <input 
          type="text" 
          {...register("author")} 
          placeholder="Author" 
          className="border p-2 w-full rounded"
        />

        <input 
          type="text" 
          {...register("publishers")} 
          placeholder="Publisher" 
          className="border p-2 w-full rounded"
        />

          {/* Category dropdown */}
        <select
          {...register("categoryId", { valueAsNumber: true })}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Category</option>

          {categories.map((c) => (
            <option key={c.categoryId} value={c.categoryId}>
              {c.categoryName}
            </option>
          ))}

        </select>

        <Button
          caption={submitCaption}
          disabled={formState.isSubmitting}
        />
      </form>
    </div>
  );
}