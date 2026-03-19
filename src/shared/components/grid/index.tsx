import React from "react";

interface GridProps<T> {
  data: T[];
}

export default function Grid<T extends object>({ data }: GridProps<T>) {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No Data Found</p>;
  }

  return (
    <table className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md text-gray-800">
  
  {/* HEADER */}
  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
    <tr>
      {Object.keys(data[0]).map((key) => (
        <th key={key} className="px-5 py-3 text-left capitalize">
          {key}
        </th>
      ))}
    </tr>
  </thead>

  {/* BODY */}
  <tbody>
    {data.map((item, index) => (
      <tr
        key={index}
        className="border-t hover:bg-blue-50 transition-colors"
      >
        {Object.values(item).map((value, i) => (
          <td key={i} className="px-5 py-3 text-gray-700">
            {value as React.ReactNode}
          </td>
        ))}
      </tr>
    ))}
  </tbody>

</table>
  );
}