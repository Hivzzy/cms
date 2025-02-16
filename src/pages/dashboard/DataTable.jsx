import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { useCallback, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";

export default function DataTable({
  data,
  columns,
  iscolumnfooter,
  className = "",
}) {
  const tableRef = useRef();

  const footerCall = useCallback(() => {
    const footerRow = document.createElement("tr");
    columns.forEach((column) => {
      const footerCell = document.createElement("th");
      const input = column.title;
      footerCell.append(input);
      footerRow.append(footerCell);
    });

  }, [columns]);

  useEffect(() => {
    if (tableRef.current) {
      const table = $(tableRef.current).DataTable({
        autoWidth: false,
        data: data,
        columns: columns,
        dom: '<"row align-items-center"<"col-md-6" l><"col-md-6" f>><"table-responsive my-3" rt><"row align-items-center" <"col-md-6" i><"col-md-6" p>><"clear">',
        destroy: true,
        columnDefs: [
          {
            targets: '_all', // Apply to all columns
            orderable: false, // Disable ordering
          },
          {
            targets: [0, 1], // Enable ordering only on the first and second columns
            orderable: true,
          },
        ],

        initComplete: () => {
          // Footer
          if (iscolumnfooter) {
            footerCall();
          }
        },
      });

      return () => {
        table.destroy();
      };
    }
  }, [iscolumnfooter, columns, data, footerCall]);

  return (
    <>
      <table
        className={"table " + className}
        width="100%"
        ref={tableRef}
      ></table>
    </>
  );
}
