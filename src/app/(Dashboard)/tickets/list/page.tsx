"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DataTable from "@/components/common/DataTable";
import { Button, Dropdown, Tag, Spin } from "antd";
import { SettingOutlined, DownOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/utils/errorHandler";

export default function TicketListPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tickets from API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.get(`${apiUrl}/arbitration/api/v1/tickets/`, { headers });
      
      // Map API response to table format
      const mappedData = (response.data || []).map((item: any, index: number) => ({
        key: item.id || index + 1,
        ticketNo: item.ticket_number || item.ticket_no || item.id || `TKT-${index + 1}`,
        updated: item.updated_at ? new Date(item.updated_at).toLocaleDateString() : item.updated || "N/A",
        name: item.user_name || item.name || item.created_by || "N/A",
        subject: item.subject || item.title || "No subject",
        status: item.status || "New",
        priority: item.priority || "Medium",
        originalData: item
      }));
      
      setData(mappedData);
      showSuccessToast("Tickets loaded successfully!", "Tickets");
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || "Failed to fetch tickets.");
      showErrorToast(err, "Tickets");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const columns = [
    {
      title: "Ticket No",
      dataIndex: "ticketNo",
      key: "ticketNo",
      render: (val: string) => <span className="font-semibold text-blue-700 cursor-pointer">{val}</span>,
    },
    {
      title: "Updated",
      dataIndex: "updated",
      key: "updated",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (val: string) => (
        <span className="flex items-center gap-2"><UserOutlined className="text-yellow-600" /> {val}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val: string) => {
        let color = "default";
        if (val === "New") color = "red";
        else if (val === "Resolved") color = "green";
        else if (val === "Reported to Seller") color = "blue";
        return <Tag color={color}>{val}</Tag>;
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (val: string) => {
        let color = "default";
        if (val === "Hight") color = "gold";
        else if (val === "Medium") color = "green";
        else if (val === "Low") color = "blue";
        return <Tag color={color}>{val}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        const items = [
          {
            key: 'view',
            label: (
              <span className="flex items-center gap-2"><EyeOutlined /> view</span>
            ),
            onClick: () => {
              // Implement view logic here
            },
          },
        ];
        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="text" icon={<span className="flex items-center gap-1"><SettingOutlined /><DownOutlined /></span>} />
          </Dropdown>
        );
      },
    },
  ];

  // Loading and error handling in the render
  if (loading) {
    return (
      <div className="p-6">
        <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "List" }]} />
        <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">Loading tickets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "List" }]} />
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center py-8">
            <div className="text-red-500 text-lg mb-4">Error Loading Tickets</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button type="primary" onClick={fetchTickets}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "List" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <DataTable
          columns={columns}
          data={data}
          tableData={{
            isEnableFilterInput: true,
            selectableRows: true,
          }}
        />
      </div>
    </div>
  );
} 