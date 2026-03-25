import { nanoid } from "nanoid";
import { Button } from "../button";

interface Column<T> {
  field?: keyof T;
  header?: string;
  onClick?: (row: T) => void;
  buttonCaption?: string;
}

interface GridProps<T> {
  data: T[];
  columns: Column<T>[];
}

export default function Grid<T extends object>({
  data,
  columns,
}: GridProps<T>) {

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No Data Found</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
    <table className="w-auto border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm">

  {/* header */}
  <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
    <tr>
      {columns.map((col) => (
        <th
          key={nanoid()}
          className="p-3 text-left text-white text-sm font-semibold tracking-wide border-b"
        >
          {col.header}
        </th>
      ))}
    </tr>
  </thead>

  {/* body */}
  <tbody>
    {data.map((row, rowIndex) => (
      <tr
        key={nanoid()}
        className={`
          transition
          ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
          hover:bg-indigo-50
        `}
      >

        {columns.map((col) => {

          // normal field column
          if (col.field) {
            return (
              <td
                key={nanoid()}
                className="p-3 text-sm text-gray-700 border-b"
              >
                {String(row[col.field])}
              </td>
            );
          }

          // button column
          if (col.onClick) {
            return (
              <td
                key={nanoid()}
                className="p-3 text-center border-b"
              >
                <Button
                  caption={col.buttonCaption ?? "Action"}
                  type="button"
                />
              </td>
            );
          }

          return null;
        })}

      </tr>
    ))}
  </tbody>

</table>
</div>
  );
}



// interface GridProps<T> {
//   data: T[];
//   renderActions?: (item: T) => React.ReactNode;
// }

// export default function Grid<T extends object>({
//   data,
//   renderActions
// }: GridProps<T>) {

//   if (!data || data.length === 0) {
//     return <p>No Data Found</p>;
//   }

//   const keys = Object.keys(data[0]) as (keyof T)[];

//   return (
//     <table className="w-full border bg-white">
//       <thead>
//         <tr>
//           {keys.map(key => (
//             <th key={String(key)} className="p-2 border text-black">
//               {String(key)}
//             </th>
//           ))}

//           {renderActions && <th className="p-2 border">Actions</th>}
//         </tr>
//       </thead>

//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>

//             {keys.map(key => (
//               <td key={String(key)} className="p-2 border text-black">
//                 {String(item[key])}
//               </td>
//             ))}

//             {renderActions && (
//               <td className="p-2 border">
//                 {renderActions(item)}
//               </td>
//             )}

//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }