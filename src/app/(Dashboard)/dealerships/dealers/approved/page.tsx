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
    render: () => <Tag color="green">Approved</Tag>,
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
    name: "Shah Brother",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : moinahsan1998@gmail.com<br />
        Phone :
      </div>
    ),
  },
  {
    key: "2",
    name: "Test",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : asd@gmail.com<br />
        Phone : 3423498989
      </div>
    ),
  },
  {
    key: "3",
    name: "Testing Dealer",
    interest: "Both",
    contact: (
      <div>
        Email : testdealer@gmail.com<br />
        Phone : 224-855-4565
      </div>
    ),
  },
  {
    key: "4",
    name: "Arjun",
    interest: "Both",
    contact: (
      <div>
        Email : Arjunzem1234@gmail.com<br />
        Phone : +1 (263) 994-9064
      </div>
    ),
  },
  {
    key: "5",
    name: "Archienoah",
    interest: "Sell a vehicle",
    contact: (
      <div>
        Email : Archienoah2345@gmail.com<br />
        Phone : +1 (928) 453-6555
      </div>
    ),
  },
  {
    key: "6",
    name: "Henryroob",
    interest: "Purchase a vehicle",
    contact: (
      <div>
        Email : Henryroob1234@gmail.com<br />
        Phone : +1 (363) 787-3833
      </div>
    ),
  },
  {
    key: "7",
    name: "Johnson Travon",
    interest: "Both",
    contact: (
      <div>
        Email : johnsontravon3478@gmail.com<br />
        Phone : +1 (312) 226-3610
      </div>
    ),
  },
  {
    key: "8",
    name: "Marten Lobo",
    interest: "Both",
    contact: (
      <div>
        Email : Martenlobo1234@gmail.com<br />
        Phone : +1 (312) 226-3610
      </div>
    ),
  },
  {
    key: "9",
    name: "Mike Angle",
    interest: "Both",
    contact: (
      <div>
        Email : Mikeangle0312@gmail.com<br />
        Phone : +1 (312) 226-3610
      </div>
    ),
  },
];

export default function DealersApprovedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "Dealers", href: "/dealerships/dealers" }, { label: "Approved" }]} />
      <div className="p-6">
        <Card>
          <DataTable columns={columns} data={data} tableData={{}} />
        </Card>
      </div>
    </div>
  );
} 