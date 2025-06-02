"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Button, Dropdown, Menu, Tag } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined, DownOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";

const columns = [
  { title: "VIN", dataIndex: "vin", key: "vin" },
  { title: "Inspection Location", dataIndex: "location", key: "location" },
  { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
  { title: "Expected Price", dataIndex: "price", key: "price", render: (v: number) => `$${v}` },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => <Tag color="blue">{status}</Tag>,
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
    vin: "Testing Old Take",
    location: "2",
    vehicle: (
      <div>
        Year : 2016<br />
        Make : Ford<br />
        Model : F150
      </div>
    ),
    price: 17925,
    status: "Inspection started",
  },
  {
    key: "2",
    vin: "1GHH543332224",
    location: "2",
    vehicle: (
      <div>
        Year : 2<br />
        Make : othermake<br />
        Model : testmodel2
      </div>
    ),
    price: 7000,
    status: "Inspector Assigned",
  },
  {
    key: "3",
    vin: "1GYFZR40KF197271",
    location: "2",
    vehicle: (
      <div>
        Year : 2<br />
        Make : for testing<br />
        Model : 1010
      </div>
    ),
    price: 8000,
    status: "Inspector Assigned",
  },
  {
    key: "4",
    vin: "1GYFZR40KF197271",
    location: "2",
    vehicle: (
      <div>
        Year : 2024<br />
        Make : for testing<br />
        Model : 1010
      </div>
    ),
    price: 6000,
    status: "Inspector Assigned",
  },
  {
    key: "5",
    vin: "1234567",
    location: "2",
    vehicle: (
      <div>
        Year : 2024<br />
        Make : othermake<br />
        Model : testmodel2
      </div>
    ),
    price: 4000,
    status: "Inspector Assigned",
  },
  {
    key: "6",
    vin: "1GYFZR40KF197271",
    location: "2",
    vehicle: (
      <div>
        Year : 2016<br />
        Make : Ford<br />
        Model : F150
      </div>
    ),
    price: 17925,
    status: "Inspector Assigned",
  },
  {
    key: "7",
    vin: "Exercitation Irur",
    location: "9",
    vehicle: (
      <div>
        Year : 2016<br />
        Make : Ford<br />
        Model : F150
      </div>
    ),
    price: 17925,
    status: "Inspector Assigned",
  },
];

export default function Page() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Pending" }]} />
      <div className="p-6">
        <Card>
          <DataTable columns={columns} data={data} tableData={{}} />
        </Card>
      </div>
    </main>
  );
} 