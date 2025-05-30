"use client";
import DataTable from "@/components/common/DataTable";
import Link from "next/link";
import { Dropdown } from "antd";
import { EyeOutlined, CheckCircleOutlined, DownOutlined } from "@ant-design/icons";
import { tasks } from "@/data/dummyTasks";

const statusColors: Record<string, string> = {
  "Inspection Completed": "bg-blue-100 text-blue-700 border-blue-300",
  "Inspection started": "bg-orange-100 text-orange-700 border-orange-300",
};

const columns = [
  { title: "VIN", dataIndex: "vin", key: "vin" },
  { title: "Inspection Location", dataIndex: "location", key: "location" },
  { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
  { title: "Expected Price", dataIndex: "price", key: "price" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[status] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
        {status}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => {
      const menuItems = [
        {
          key: "view",
          icon: <EyeOutlined />,
          label: <Link href={`/tasks/${record.id}`}>View</Link>,
        },
      ];
      if (record.status === "Inspection started") {
        menuItems.push({
          key: "mark-completed",
          icon: <CheckCircleOutlined />,
          label: <span>Mark as Completed</span>,
        });
      }
      return (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <span className="inline-flex items-center gap-1 px-3 py-1 border rounded cursor-pointer hover:bg-gray-50">
            Actions <DownOutlined className="text-xs" />
          </span>
        </Dropdown>
      );
    },
  },
];

export default function TasksPage() {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
} 