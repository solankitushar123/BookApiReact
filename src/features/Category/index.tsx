import { useEffect, useState } from "react";
import { Loader } from "../../shared/components/loader";
import { ApiService } from "../../services";
import Grid from "../../shared/components/grid";
interface CategoryItem {
  categoryId: number;
  categoryName: string;
}

export default function Category() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiService.get<CategoryItem[]>("Category")
      .then((data) => setCategories(data))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Categories
      </h2>
      {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : (
              <Grid<CategoryItem> data={categories} />
            )}
    </div>
  );
}
