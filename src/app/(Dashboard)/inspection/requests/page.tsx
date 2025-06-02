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
    render: (status: string) => (
      <Tag color={status === "Inspector Assigned" ? "blue" : "default"}>{status}</Tag>
    ),
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
    vin: "Non Adipisicing R",
    location: (
      <div>
        <b>South Dakota</b><br />
        34021 N US-45, Grayslake, IL 60030,<br />
        605-371-7629
      </div>
    ),
    vehicle: (
      <div>
        Year : N/A<br />
        Make : N/A<br />
        Model : N/A
      </div>
    ),
    price: 0,
    status: "Pending",
  },
  {
    key: "2",
    vin: "Alias Consectetur",
    location: (
      <div>
        <b>STG Bellflower</b><br />
        8625 Artesia Blvd, Bellflower, CA 90706, USA<br />
        +1 (562) 262-9052
      </div>
    ),
    vehicle: (
      <div>
        Year : N/A<br />
        Make : N/A<br />
        Model : N/A
      </div>
    ),
    price: 0,
    status: "Pending",
  },
  {
    key: "3",
    vin: "21321",
    location: (
      <div>
        <b>South Dakota</b><br />
        34021 N US-45, Grayslake, IL 60030,<br />
        605-371-7629
      </div>
    ),
    vehicle: (
      <div>
        Year : N/A<br />
        Make : N/A<br />
        Model : N/A
      </div>
    ),
    price: 0,
    status: "Pending",
  },
  {
    key: "4",
    vin: "1G1FD1RS9G0145730",
    location: (
      <div>
        <b>testing dealer streamwood</b><br />
        123 main st<br />
        224-855-4565
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
    status: "Pending",
  },
  {
    key: "5",
    vin: "Voluptatibus Expe",
    location: (
      <div>
        <b>New York yard</b><br />
        433 1st Ave, New York, NY 10010, USA<br />
        +1 (545) 4545 454
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
    status: "Pending",
  },
  {
    key: "6",
    vin: "Vel Deserunt Quae",
    location: (
      <div>
        <b>New York yard</b><br />
        433 1st Ave, New York, NY 10010, USA<br />
        +1 (545) 4545 454
      </div>
    ),
    vehicle: (
      <div>
        Year : N/A<br />
        Make : N/A<br />
        Model : N/A
      </div>
    ),
    price: 0,
    status: "Pending",
  },
  {
    key: "7",
    vin: "1GHH543332224",
    location: (
      <div>
        <b>South Dakota</b><br />
        34021 N US-45, Grayslake, IL 60030,<br />
        605-371-7629
      </div>
    ),
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
    key: "8",
    vin: "Elit Voluptatibu",
    location: (
      <div>
        <b>South Dakota</b><br />
        34021 N US-45, Grayslake, IL 60030,<br />
        605-371-7629
      </div>
    ),
    vehicle: (
      <div>
        Year : 2023<br />
        Make : Ford<br />
        Model : N/A
      </div>
    ),
    price: 9,
    status: "Pending",
  },
];

export default function Page() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Requests" }]} />
      <div className="p-6">
        <Card>
          <DataTable columns={columns} data={data} tableData={{}} />
        </Card>
      </div>
    </main>
  );
} 