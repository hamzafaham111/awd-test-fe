"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DataTable from "@/components/common/DataTable";
import { Button, Dropdown } from "antd";
import { SettingOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";

export default function TicketStatusesPage() {
  const router = useRouter();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (val: string) => (
        <span className="flex items-center gap-2">
          <span style={{ background: val, width: 18, height: 18, display: 'inline-block', borderRadius: 3, border: '1px solid #ccc' }} />
          <span>{val}</span>
        </span>
      ),
    },
    {
      title: "System Default",
      dataIndex: "systemDefault",
      key: "systemDefault",
      render: (val: boolean) => val ? "Yes" : "No",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        const items = [
          {
            key: 'edit',
            label: 'Edit',
            onClick: () => {
              router.push(`/tickets/statuses/${record.key}/edit`);
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

  const data = [
    { key: 1, name: "Reported To Seller", color: "#3923a9", systemDefault: false },
    { key: 2, name: "Resolved", color: "green", systemDefault: true },
    { key: 3, name: "On Hold", color: "#DC2D89", systemDefault: true },
    { key: 4, name: "In Progress", color: "#8c55d4", systemDefault: true },
    { key: 5, name: "New", color: "red", systemDefault: true },
  ];

  return (
    <div className="flex flex-col w-full bg-gray-50">
        <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "Statuses" }, { label: "List" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <DataTable
          columns={columns}
          data={data}
          tableData={{
              isEnableFilterInput: true,
              selectableRows: true,
              showAddButton: true,
              addButtonLabel: "Add",
              addButtonHref: "/tickets/statuses/create",
            }}
          />
        </div>
    </div>
  );
} 