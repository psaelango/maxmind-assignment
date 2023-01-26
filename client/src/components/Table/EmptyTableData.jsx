import React from "react";

function EmptyTableData(props) {
  const { colCount } = props;
  return (
    <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td colSpan={colCount} className="px-6 py-4">
        Search IP addresses to display their information here
      </td>
    </tr>
  );
}

export default EmptyTableData;
