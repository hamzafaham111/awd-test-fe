"use client";

import { Table, Card, Button, Input, Space, Dropdown, Modal } from "antd";
import { SearchOutlined, UserAddOutlined, EditOutlined, DeleteOutlined, FileSearchOutlined, DownOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";

const statusColors: Record<string, string> = {
  "Active": "bg-green-100 text-green-700 border-green-300",
  "Inactive": "bg-gray-100 text-gray-700 border-gray-300",
};



export default function UsersPage() {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const role = useSelector((state: RootState) => state.user.role);
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (key: number, _: any, idx: number) => idx + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <Link href={`/app/users/${record.key}`}>
          <span className="text-blue-700 font-semibold cursor-pointer hover:underline">{name}</span>
        </Link>
      ),
    },
    {
      title: "Username",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <span className="text-blue-700 cursor-pointer hover:underline">{email}</span>,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
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
            key: "edit",
            icon: <EditOutlined />,
            label: <Link href={`/app/users/${record.key}`}>
              <span className="cursor-pointer hover:underline">Edit</span>
            </Link>
          },
          {
            key: "delete",
            icon: <DeleteOutlined />,
            label: <span 
              className="cursor-pointer hover:underline"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(record.key);
              }}
            >
              Delete
            </span>,
          },
          {
            key: "logs",
            icon: <FileSearchOutlined />,
            label: <span>Logs</span>,
          },
        ];
        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <span className="inline-flex items-center gap-1 px-3 py-1 border rounded cursor-pointer hover:bg-gray-50">
              <span className="text-blue-700"><DownOutlined /></span>
            </span>
          </Dropdown>
        );
      },
    },
  ];
  
  const tableData = { 
    selectableRows: true,
    isEnableFilterInput: true,
    showAddButton: true, 
    addButtonLabel: "Add New User", 
    addButtonHref: "/app/users/add"
  };
  const handleDelete = async (userId: number) => {
    setSelectedUserId(userId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;
    
    setDeleteLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.delete(`${apiUrl}/users/api/v1/admin/user/${selectedUserId}/`, { headers });
      
      // Remove the deleted user from the state
      setUsersData(prevUsers => prevUsers.filter(user => user.id !== selectedUserId));
      
      // Show success message
      Modal.success({
        title: 'Success',
        content: 'User has been deleted successfully.',
      });
    } catch (err: any) {
      Modal.error({
        title: 'Error',
        content: err?.response?.data?.detail || err?.message || 'Failed to delete user.',
      });
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      setSelectedUserId(null);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${apiUrl}/users/api/v1/admin/users-list/`, { headers });
        setUsersData(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.detail || err?.message || "Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const mappedUsers = usersData.map((u: any) => ({
    key: u.id,
    name: u.full_name,
    email: u.email,
    mobile: u.mobile_no,
    role: u.role?.name,
    status: u.status === 1 ? "Active" : "Inactive",
  }));

  if (role === "ds") return <div>Users Page</div>;
  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Users", href: "/app/users" }]} />
        <DataTable columns={columns} data={mappedUsers} tableData={tableData} loading={loading} />
        <DeleteConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedUserId(null);
          }}
          onConfirm={handleConfirmDelete}
          loading={deleteLoading}
          title={<span className="flex items-center gap-2"><DeleteOutlined className="text-red-500" /> Delete User</span>}
          description="Are you sure you want to delete this user? This action cannot be undone."
        />
    </div>
  );
} 