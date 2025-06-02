import { Table, Input } from "antd";
import { useState, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Button } from "antd";

interface DataTableProps {
  columns: any[];
  data: any[];
  tableData?: {
    selectableRows?: boolean;
    isEnableFilterInput?: boolean;
    showAddButton?: boolean;
    addButtonLabel?: string;
    addButtonHref?: string;
    // pagination?: object | false; // Remove this for internal control
  };
  rowSelection?: any;
}

export default function DataTable({ columns, data, tableData = {}, rowSelection }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50'],
    showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
  });

  const filteredData = useMemo(() => {
    if (!tableData.isEnableFilterInput || !search) return data;
    return data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, tableData.isEnableFilterInput]);

  const handleTableChange = (pag: any) => {
    setPagination(prev => ({
      ...prev,
      current: pag.current,
      pageSize: pag.pageSize,
    }));
  };

  return (
    <div>
      {tableData.isEnableFilterInput && (
        <div className="flex justify-between items-center mb-4 gap-2">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="max-w-xs"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {tableData.showAddButton && tableData.addButtonLabel && tableData.addButtonHref && (
            <Link href={tableData.addButtonHref}>
              <button className="ml-2 px-[18px] py-[6px] bg-sky-600 hover:bg-sky-700 rounded-lg font-[600] text-white border-0">
                {tableData.addButtonLabel}
              </button>
            </Link>
          )}
        </div>
      )}
      <div className="w-full overflow-x-auto rounded-lg border p-2">
        <Table
          columns={columns.map(col => ({
            ...col,
            onCell: (record, rowIndex) => ({
              className: col.className || "",
            }),
            onHeaderCell: column => ({
              className: col.className || "",
            }),
          }))}
          dataSource={filteredData}
          rowSelection={rowSelection !== undefined ? rowSelection : (tableData.selectableRows ? {} : undefined)}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
} 