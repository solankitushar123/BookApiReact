import { useNavigate } from "react-router-dom";
// import Grid from "../../../shared/components/grid";
// import { Loader } from "../../../shared/components/loader";

// import { useCategoryQuery, useRemoveCategoryMutation } from "../queries";

// interface CategoryItem {
//   categoryId: number;
//   categoryName: string;
// }

export default function Category() {
  const navigate = useNavigate();

//   const { data = [], isLoading } = useCategoryQuery();

//   const { isPending, mutateAsync } = useRemoveCategoryMutation();

//   if (isLoading || isPending) {
//     return <Loader />;
//   }

//   if (data.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <p className="mb-4 text-gray-600">No categories found.</p>

//         <button
//           onClick={() => navigate("/category/create")}
//           className="bg-purple-600 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700"
//         >
//           Add First Category
//         </button>
//       </div>
//     );
//   }

  return (
    <div
      className="max-w-5xl mx-auto mt-10 p-6
      bg-gradient-to-br from-blue-50 to-purple-50
      rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Category List</h2>

        <button
          onClick={() => navigate("/category/create")}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700"
        >
          Add Category
        </button>
      </div>

      {/* <Grid<CategoryItem>
        data={data}
        renderActions={(category) => (
          <>
            <button
              onClick={() => navigate(`/category/edit/${category.categoryId}`)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={async () => {
                if (window.confirm("Delete this category?")) {
                  await mutateAsync(category.categoryId);
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded ml-2"
            >
              Delete
            </button>
          </>
        )}
      /> */}
    </div>
  );
}
