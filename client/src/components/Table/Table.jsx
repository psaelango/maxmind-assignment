import React from "react";
import EmptyTableData from "./EmptyTableData";

function Table(props) {
  const { tableData, tableHeaders } = props;

  return (
    <div className="relative overflow-x-auto h-screen">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHeaders.map((column, i) => (
              <th key={i} scope="col" className="px-6 py-3">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <EmptyTableData colCount={tableHeaders.length} />
          ) : (
            tableData.map((data, i) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                {tableHeaders.map((column, j) => {
                  if (j === 0) {
                    return (
                      <th
                        key={j}
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data[column.Accessor]}
                      </th>
                    );
                  }
                  return (
                    <td key={j} className="px-6 py-4">
                      {data[column.Accessor]}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
