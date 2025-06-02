"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DataTable from "@/components/common/DataTable";
import { Button, Dropdown } from "antd";
import { SettingOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";

export default function TicketCategoriesPage() {
  const router = useRouter();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
            label: <span className="flex items-center gap-2"><EditOutlined /> Edit</span>,
            onClick: () => {
              router.push(`/tickets/categories/${record.key}/edit`);
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
    { key: 1, name: "Request New Location", systemDefault: true },
    { key: 2, name: "Request For Special Price Vehicle", systemDefault: true },
    { key: 3, name: "Arbitration", systemDefault: true },
  ];

  return (
    <div className="flex flex-col w-full bg-gray-50">
      <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "Categories" }, { label: "List" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <DataTable
          columns={columns}
          data={data}
          tableData={{
            isEnableFilterInput: true,
            selectableRows: true,
            showAddButton: true,
            addButtonLabel: "Add ",
            addButtonHref: "/tickets/categories/create",
          }}
        />
      </div>
    </div>
  );
} 