"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Button, Dropdown, Menu, Tag } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined, DownOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";

const columns = [
  { title: "Dealer Name", dataIndex: "name", key: "name" },
  { title: "Dealer Interest", dataIndex: "interest", key: "interest" },
  { title: "Contact", dataIndex: "contact", key: "contact" },
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
          <Menu.Item key="edit" icon={<EditOutlined />}>Edit</Menu.Item>
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

const data = [
  {
    key: "1",
    name: "Alexa Olson",
    interest: "Both",
    contact: (
      <div>
        Email : hyhuvyxi2@mailinator.com<br />
        Phone : +1 (168) 309-3187
      </div>
    ),
  },
  {
    key: "2",
    name: "Alexa Olson",
    interest: "Both",
    contact: (
      <div>
        Email : hyhuvyxi2@mailinator.com<br />
        Phone : +1 (168) 309-3187
      </div>
    ),
  },
];

export default function DealersSuspendedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "Dealers", href: "/dealerships/dealers" }, { label: "Suspended" }]} />
      <div className="p-6">
        <Card>
          <DataTable columns={columns} data={data} tableData={{}} />
        </Card>
      </div>
    </div>
  );
} 