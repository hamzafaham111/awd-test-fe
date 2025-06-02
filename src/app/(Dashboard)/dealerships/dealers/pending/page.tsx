"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Button, Dropdown, Menu, Tag } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined, DownOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const columns = [
  { title: "Dealer Name", dataIndex: "name", key: "name" },
  { title: "Dealer Interest", dataIndex: "interest", key: "interest" },
  { title: "Contact", dataIndex: "contact", key: "contact" },
  {
    title: "Approved",
    dataIndex: "approved",
    key: "approved",
    render: () => <Tag color="default">Pending</Tag>,
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
    name: "Hamza",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : hamzafaham171@gmail.com<br />
        Phone : +1 (678) 687-6878
      </div>
    ),
  },
  {
    key: "2",
    name: "Test",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : hamzafaham111@gmail.com<br />
        Phone : +1 (321) 111-2388
      </div>
    ),
  },
  {
    key: "3",
    name: "New DealerShip",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : uhaseeb731@gmail.com<br />
        Phone : +1 (234) 234-0340
      </div>
    ),
  },
  {
    key: "4",
    name: "Dd",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : sdf@gmail.com<br />
        Phone : +1 (321) 111-2388
      </div>
    ),
  },
  {
    key: "5",
    name: "Test1",
    interest: "Both",
    contact: (
      <div>
        Email : tl55@gmail.com<br />
        Phone : +1 (121) 213-1231
      </div>
    ),
  },
  {
    key: "6",
    name: "Dealer Test",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : musawarbilal@gmail.com<br />
        Phone : +1 (234) 567-8967
      </div>
    ),
  },
  {
    key: "7",
    name: "Car Dealers",
    interest: "Both",
    contact: (
      <div>
        Email : projectco.marten@gmail.com<br />
        Phone : +1 (123) 456-7890
      </div>
    ),
  },
  {
    key: "8",
    name: "Tanisha Townsend",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : dokev@mailinator.com<br />
        Phone : +1 (363) 253-4962
      </div>
    ),
  },
  {
    key: "9",
    name: "Axel Sweet",
    interest: "Both",
    contact: (
      <div>
        Email : zenek@mailinator.com<br />
        Phone : +1 (532) 108-8233
      </div>
    ),
  },
];

export default function DealersPendingPage() {
  const role = useSelector((state: RootState) => state.user.role);
  if (role === "ds") return <div>Dealers Pending Page</div>;
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "Dealers", href: "/dealerships/dealers" }, { label: "Pending" }]} />
      <div className="p-6">
        <Card>
          <DataTable columns={columns} data={data} tableData={{}} />
        </Card>
      </div>
    </div>
  );
} 