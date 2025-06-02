"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Button, Dropdown, Menu, Tag } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined, DownOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";

const statusColor = (status: string) => {
  switch (status) {
    case "Payment Pending":
      return "default";
    case "Inspection Completed":
      return "blue";
    case "Delivered":
      return "green";
    case "On Auction":
      return "green";
    default:
      return "default";
  }
};

const columns = [
  { title: "VIN", dataIndex: "vin", key: "vin" },
  { title: "Inspection Location", dataIndex: "location", key: "location" },
  { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
  { title: "Expected Price", dataIndex: "price", key: "price", render: (v: number) => `$${v}` },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => <Tag color={statusColor(status)}>{status}</Tag>,
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
    vin: "2025",
    location: (
      <div>
        <b>Broadway</b><br />
        838 Broadway, New York, NY 10003, USA<br />
        +1 (618) 887-4887
      </div>
    ),
    vehicle: (
      <div>
        Year : 2025<br />
        Make : Toyata<br />
        Model : 2025
      </div>
    ),
    price: 5000,
    status: "Payment Pending",
  },
  {
    key: "2",
    vin: "123344455",
    location: (
      <div>
        <b>testing dealer streamwood</b><br />
        123 main st<br />
        224-855-4565
      </div>
    ),
    vehicle: (
      <div>
        Year : 2021<br />
        Make : Cadillac<br />
        Model : 1010
      </div>
    ),
    price: 13000,
    status: "Inspection Completed",
  },
  {
    key: "3",
    vin: "3VWCS57BUXMM031277",
    location: (
      <div>
        <b>testing dealer streamwood</b><br />
        123 main st<br />
        224-855-4565
      </div>
    ),
    vehicle: (
      <div>
        Year : 2021<br />
        Make : Volkwage<br />
        Model : Jetta
      </div>
    ),
    price: 18540,
    status: "Inspection Completed",
  },
  {
    key: "4",
    vin: "JA4J4UA86NZ065825",
    location: (
      <div>
        <b>Archienoah San Tan Valley</b><br />
        247 E Gold Dust Way<br />
        +1 (928) 453-6555
      </div>
    ),
    vehicle: (
      <div>
        Year : 2024<br />
        Make : for testing<br />
        Model : 1010
      </div>
    ),
    price: 0,
    status: "Delivered",
  },
  {
    key: "5",
    vin: "23456",
    location: (
      <div>
        <b>South Dakota</b><br />
        34021 N US-45, Grayslake, IL 60030,<br />
        605-371-7629
      </div>
    ),
    vehicle: (
      <div>
        Year : 887<br />
        Make : othermake<br />
        Model : testmodel2
      </div>
    ),
    price: 223,
    status: "Delivered",
  },
  {
    key: "6",
    vin: "JN8A55MV5CW392335",
    location: (
      <div>
        <b>Archienoah San Tan Valley</b><br />
        247 E Gold Dust Way<br />
        +1 (928) 453-6555
      </div>
    ),
    vehicle: (
      <div>
        Year : 2<br />
        Make : 2<br />
        Model : 2
      </div>
    ),
    price: 500,
    status: "Delivered",
  },
  {
    key: "7",
    vin: "TestingVIN",
    location: (
      <div>
        <b>South Dakota</b><br />
        34021 N US-45, Grayslake, IL 60030,<br />
        605-371-7629
      </div>
    ),
    vehicle: (
      <div>
        Year : 2016<br />
        Make : Ford<br />
        Model : F150
      </div>
    ),
    price: 17925,
    status: "On Auction",
  },
  {
    key: "8",
    vin: "MAJ6S3GL9NC462106",
    location: (
      <div>
        <b>Arjun Boynton Beach</b><br />
        4905 Park Ridge Blvd<br />
        +1 (263) 994-9064
      </div>
    ),
    vehicle: (
      <div>
        Year : 2016<br />
        Make : Ford<br />
        Model : F150
      </div>
    ),
    price: 17925,
    status: "Payment Pending",
  },
];

export default function Page() {
  return (
    <main>
      <Breadcrumbs items={[
        { label: "Inspection", href: "/inspection" },
        { label: "Completed", href: "/inspection/completed" },
        { label: "Approved" }
      ]} />
      <div className="p-6">
        <Card>
          <DataTable columns={columns} data={data} tableData={{}} />
        </Card>
      </div>
    </main>
  );
} 