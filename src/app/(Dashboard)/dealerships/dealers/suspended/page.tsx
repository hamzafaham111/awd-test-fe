"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Button, Dropdown, Menu, Tag } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined, DownOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const interestMap: Record<string, string> = {
  1: "Sell a vehicle",
  2: "Purchase a vehicle",
  3: "Both",
};

const columns = [
  {
    title: "Dealer Name",
    dataIndex: "dealership_name",
    key: "dealership_name",
  },
  {
    title: "Dealer Interest",
    dataIndex: "dealership_interest",
    key: "dealership_interest",
    render: (value: number) => interestMap[String(value)] || "-",
  },
  {
    title: "Contact",
    key: "contact",
    render: (_: any, record: any) => (
      <div>
        Email : {record.email || "-"}<br />
        Phone : {record.phone_number || "-"}
      </div>
    ),
  },
  {
    title: "Approved",
    dataIndex: "approved",
    key: "approved",
    render: () => <Tag color="red">Not Approved</Tag>,
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => {
      const menu = (
        <Menu>
          <Menu.Item key="edit" icon={<EditOutlined />}>
            <Link href={`/dealerships/dealers/${record.id}`}>Edit</Link>
          </Menu.Item>
          <Menu.Item key="delete" icon={<DeleteOutlined />} danger>Delete</Menu.Item>
        </Menu>
      );
      return (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button>
            <span className="flex items-center gap-1">
              <SettingOutlined /> <DownOutlined />
            </span>
          </Button>
        </Dropdown>
      );
    },
  },
];

export default function DealersSuspendedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDealers = async () => {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      try {
        const res = await axios.get(`${apiUrl}/users/api/v1/dealership/?approved=3`, { headers });
        setData(res.data.results || res.data);
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDealers();
  }, []);
  const tableData = { 
    selectableRows: true,
    isEnableFilterInput: true,
    showAddButton: true, 
    addButtonLabel: "Add Dealer", 
    addButtonHref: "/dealerships/dealers/add"
  };
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "Dealers", href: "/dealerships/dealers" }, { label: "Suspended" }]} />
      <div className="p-6">
        <DataTable columns={columns} data={data} tableData={tableData} loading={loading} />
      </div>
    </div>
  );
} 