"use client";

import { Table, Card, Button, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { showErrorToast, COMMON_ERROR_MESSAGES } from "@/utils/errorHandler";

const statusColors: Record<string, string> = {
  "Active": "bg-green-100 text-green-700 border-green-300",
  "Inactive": "bg-red-100 text-red-700 border-red-300",
};

const typeColors: Record<string, string> = {
  "Fixed": "bg-blue-900 text-white border-blue-700",
};

const columns = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
    render: (key: number, _: any, idx: number) => idx + 1,
    width: 48,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string, record: any) => (
      <Link href={`/app/roles/${record.key}`}>
        <span className="text-blue-700 cursor-pointer hover:underline">{name}</span>
      </Link>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => (
      <span className={`inline-block px-3 py-1 rounded font-semibold border text-xs ${typeColors[type] || "bg-gray-100 text-gray-700 border-gray-300"}`}>{type}</span>
    ),
    width: 100,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <span className={`inline-block px-3 py-1 rounded font-semibold border text-xs ${statusColors[status] || "bg-gray-100 text-gray-700 border-gray-300"}`}>{status}</span>
    ),
    width: 100,
  },
  {
    title: "Action",
    key: "action",
    align: "center" as const,
    width: 80,
    render: (_: any, record: any) => {
      const menuItems = [
        {
          key: "edit",
          icon: <EditOutlined className="text-gray-700" />,
          label: (
            <Link href={`/app/roles/${record.key}`}>
              <span className="cursor-pointer hover:underline">Edit</span>
            </Link>
          ),
        },
      ];
      if (record.status === "Inactive") {
        menuItems.push({
          key: "delete",
          icon: <DeleteOutlined className="text-red-500" />,
          label: <span className="text-red-500">Delete</span>,
        });
      }
      return (
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <span className="inline-flex items-center gap-1 px-2 py-1 border rounded cursor-pointer hover:bg-gray-50">
            <SettingOutlined className="text-blue-700" />
            <DownOutlined className="text-blue-700" />
          </span>
        </Dropdown>
      );
    },
  },
];

export default function RolesPage() {
  const [rolesData, setRolesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = useSelector((state: RootState) => state.user.role);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${apiUrl}/users/api/v1/role/`, { headers });
        setRolesData(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.detail || err?.message || "Failed to fetch roles.");
        showErrorToast(err, "Roles");
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const mappedRoles = rolesData.map((r: any) => ({
    key: r.id,
    name: r.name,
    type: r.is_fixed ? "Fixed" : "Flexible",
    status: r.status === 1 ? "Active" : "Inactive",
  }));

  if (role === "ds") return <div>Roles Page</div>;
  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Roles", href: "/app/roles" }]} />
        <DataTable columns={columns} data={mappedRoles} tableData={{ selectableRows: true, isEnableFilterInput: true, showAddButton: true, addButtonLabel: "Add New Role", addButtonHref: "/app/roles/add" }} loading={loading} />
      <div className="flex justify-between items-center mt-4">
        <div>
          <a href="#" className="text-blue-700 hover:underline">View Trash Records</a>
          <span className="mx-2">|</span>
          <a href="#" className="text-blue-700 hover:underline">View Active Records</a>
        </div>
        {/* Pagination can be handled by DataTable or here if needed */}
      </div>
    </div>
  );
} 