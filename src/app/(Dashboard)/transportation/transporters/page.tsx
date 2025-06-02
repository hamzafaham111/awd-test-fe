"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DataTable from "@/components/common/DataTable";
import { Tag, Dropdown, Button, Menu } from "antd";
import { SettingOutlined, DownOutlined } from "@ant-design/icons";
import Link from "next/link";

const columns = [
  { title: "Business Name", dataIndex: "businessName", key: "businessName" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  {
    title: "Approved",
    dataIndex: "approved",
    key: "approved",
    render: (approved: string) => (
      <Tag color={approved === "Approved" ? "green" : "default"}>{approved}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => {
      const menu = (
        <Menu>
          <Menu.Item key="edit">
            <Link href={`/transportation/transporters/${record.key}/edit`}>Edit</Link>
          </Menu.Item>
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

const data = [
  { key: 1, businessName: "Oleg Hewitt", name: "Kai Dalton", email: "transporter2@gmail.com", approved: "Approved" },
  { key: 2, businessName: "Marten Digitals", name: "Daniel Mark", email: "Danielmark2323@gmail.com", approved: "Approved" },
  { key: 3, businessName: "Test", name: "test test1", email: "asds@gmail.com", approved: "Pending" },
  { key: 4, businessName: "Frank Jerry", name: "Frank Jerry", email: "Frankjerry1234@gmail.com", approved: "Approved" },
  { key: 5, businessName: "Oleg Hewitt", name: "Winifred Whitfield", email: "vymo2@mailinator.com", approved: "Pending" },
];

export default function TransportersPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Transporters" }]} />
      <div className="p-6">
        <DataTable
          columns={columns}
          data={data}
          tableData={{
            selectableRows: true,
            isEnableFilterInput: true,
            showAddButton: true,
            addButtonLabel: "Add Transporter",
            addButtonHref: "/transportation/transporters/add",
          }}
        />
      </div>
    </div>
  );
} 