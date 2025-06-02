"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Button, Dropdown, Menu } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";
import Link from "next/link";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "State Name", dataIndex: "state", key: "state" },
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
  { key: "1", name: "Moin Ahsan", email: "moinahsan1999@gmail.com", phone: "03442223433", state: "Alaska" },
  { key: "2", name: "Darab Tester", email: "darabestate0330@gmail.com", phone: "03122345678", state: "Alabama" },
  { key: "3", name: "Gloria Bash", email: "Gloriabash6789@gmail.com", phone: "03122263610", state: "Arizona" },
  { key: "4", name: "Cole Odam", email: "Coleodam1234@gmail.com", phone: "+923122263610", state: "Arizona" },
  { key: "5", name: "Ana Richard", email: "ana_inspector@gmail.com", phone: "0123456789", state: "Illinois" },
  { key: "6", name: "Mike Angel", email: "MikeAngel@gmail.com", phone: "0312 2263610", state: "Florida" },
  { key: "7", name: "Hilda Rice", email: "mahe@mailinator.com", phone: "+1 (525) 261-4463", state: "Alaska" },
  { key: "8", name: "Test Inspector 2", email: "test2@gmail.com", phone: "+1 (227) 462-4603", state: "Alabama" },
  { key: "9", name: "Test Inspector", email: "testinspect@gmail.com", phone: "313 2500948", state: "Tennessee" },
  { key: "10", name: "Cole Odom", email: "kifemeg@mailinator.com", phone: "+1 (738) 898-8378", state: "Arizona" },
];

export default function InspectorsListPage() {
  const tableData = { 
    selectableRows: true,
    isEnableFilterInput: true,
    showAddButton: true, 
    addButtonLabel: "Add New Inspector", 
    addButtonHref: "/inspection/inspectors/add"
  };
  return (
    <div>
      <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Inspectors" }]} />
      <div className="p-6">
          <DataTable columns={columns} data={data} tableData={tableData} />
      </div>
    </div>
  );
} 