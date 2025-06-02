"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DataTable from "@/components/common/DataTable";
import { Button, Dropdown, Tag } from "antd";
import { SettingOutlined, DownOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

export default function TicketListPage() {
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

  const data = [
    {
      key: 1,
      ticketNo: "7DB6632A29",
      updated: "Apr 12",
      name: "Gage Carr",
      subject: "Special Price request for 2000",
      status: "New",
      priority: "Medium",
    },
    {
      key: 2,
      ticketNo: "A6BAB3AE18",
      updated: "Feb 28, 2024",
      name: "Aladdin Harmon",
      subject: "Arbitration Request for VIN 1G2MB35B16Y118676",
      status: "Reported to Seller",
      priority: "Hight",
    },
    {
      key: 3,
      ticketNo: "F4A487B6F5",
      updated: "Feb 27, 2024",
      name: "Aladdin Harmon",
      subject: "Special Price request for JM3TB3DV4C0352508",
      status: "New",
      priority: "Medium",
    },
    {
      key: 4,
      ticketNo: "681FA144AB",
      updated: "Feb 26, 2024",
      name: "Speed Car",
      subject: "Special Price request for 3VWDA71K79M039778",
      status: "Resolved",
      priority: "Medium",
    },
    {
      key: 5,
      ticketNo: "DCE582D4BA",
      updated: "Jan 23, 2024",
      name: "Viva Cars",
      subject: "Arbitration Request for VIN 5TFTB5414X7002142",
      status: "New",
      priority: "Low",
    },
    {
      key: 6,
      ticketNo: "45ED35DD53",
      updated: "Jan 20, 2024",
      name: "Speed Car",
      subject: "New location request (New York)",
      status: "New",
      priority: "Medium",
    },
    {
      key: 7,
      ticketNo: "8D5CEDABF1",
      updated: "Jan 20, 2024",
      name: "Speed Car",
      subject: "New location request (New York yard)",
      status: "New",
      priority: "Medium",
    },
    {
      key: 8,
      ticketNo: "FEAF11DAC7",
      updated: "Jan 19, 2024",
      name: "Speed Car",
      subject: "Special Price request for JN8AS58VX9W444982",
      status: "New",
      priority: "Medium",
    },
    {
      key: 9,
      ticketNo: "1DB8EE1E28",
      updated: "Jan 19, 2024",
      name: "Speed Car",
      subject: "Special Price request for WBAVM1C5XFVW00962",
      status: "New",
      priority: "Medium",
    },
    {
      key: 10,
      ticketNo: "17896E4AB2",
      updated: "Jan 15, 2024",
      name: "Speed Car",
      subject: "Special Price request for 1NXBR12E81Z424450",
      status: "Resolved",
      priority: "Medium",
    },
  ];

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