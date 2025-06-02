"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Tag, Dropdown, Button, Menu } from "antd";
import { EyeOutlined, FileTextOutlined, SettingOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";

const statusColor = (status: string) => {
  switch (status) {
    case "Payment Pending":
      return "default";
    case "In Negotiation":
      return "blue";
    case "Delivered":
      return "green";
    case "Manual Delivery":
      return "gold";
    case "Payment Received":
      return "green";
    default:
      return "default";
  }
};

const columns = [
  { title: "Auction ID", dataIndex: "auctionId", key: "auctionId" },
  {
    title: "Vehicle Details",
    dataIndex: "vehicleDetails",
    key: "vehicleDetails",
    render: (details: any) => (
      <div>
        <div>VIN : {details.vin}</div>
        <div>{details.name}</div>
      </div>
    ),
  },
  {
    title: "Seller",
    dataIndex: "seller",
    key: "seller",
    render: (seller: any) => (
      <div>
        <div className="font-bold">{seller.name}</div>
        <div>{seller.address}</div>
        <div className="font-bold">{seller.phone}</div>
      </div>
    ),
  },
  {
    title: "Buyer",
    dataIndex: "buyer",
    key: "buyer",
    render: (buyer: any) => (
      <div>
        <div className="font-bold">{buyer.name}</div>
        <div>{buyer.address}</div>
        <div className="font-bold">{buyer.phone}</div>
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string[] | string) => (
      <div className="flex flex-col gap-1">
        {(Array.isArray(status) ? status : [status]).map((s, i) => (
          <Tag key={i} color={statusColor(s)}>{s}</Tag>
        ))}
      </div>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => {
      const menu = (
        <Menu>
          <Menu.Item key="view" icon={<EyeOutlined />}>View</Menu.Item>
          <Menu.Item key="report" icon={<FileTextOutlined />}>View Report</Menu.Item>
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
    key: 1,
    auctionId: "302403212",
    vehicleDetails: { vin: "2025", name: "2025 Toyata 2025 Sport" },
    seller: { name: "Gage Carr", address: "Broadway, 838 Broadway, New York, NY 10003, USA, 10001", phone: "+1 (618) 887-4887" },
    buyer: { name: "Arjun", address: "4905 Park Ridge Blvd, Boynton Beach", phone: "+1 (263) 994-9064" },
    status: ["Payment Pending"],
  },
  {
    key: 2,
    auctionId: "2842947922",
    vehicleDetails: { vin: "2000", name: "2000 Honda 2000 2" },
    seller: { name: "Gage Carr", address: "AutoNation, AutoNation USA Corpus Christi, TX, 18816", phone: "+1 (565) 762-9745" },
    buyer: { name: "", address: "", phone: "" },
    status: ["In Negotiation"],
  },
  {
    key: 3,
    auctionId: "801905644",
    vehicleDetails: { vin: "1GYFZR40KF197271", name: "2019 Cadillac XT4 Sport" },
    seller: { name: "Speed Car", address: "South Dakota, 34021 N US-45, Grayslake, IL 60030, 57102", phone: "605-371-7629" },
    buyer: { name: "", address: "", phone: "" },
    status: ["In Negotiation"],
  },
  {
    key: 4,
    auctionId: "3046438778",
    vehicleDetails: { vin: "JTHBJ46G082231108", name: "2023 1234 2023 trimnghhg" },
    seller: { name: "Archienoah", address: "Archienoah San Tan Valley, 247 E Gold Dust Way, 85142", phone: "+1 (928) 453-6555" },
    buyer: { name: "", address: "", phone: "" },
    status: ["In Negotiation"],
  },
  {
    key: 5,
    auctionId: "1984188628",
    vehicleDetails: { vin: "JA4J4UA86NZ065825", name: "2024 for testing 1010 trimnggggg" },
    seller: { name: "Archienoah", address: "Archienoah San Tan Valley, 247 E Gold Dust Way, 85142", phone: "+1 (928) 453-6555" },
    buyer: { name: "Henryroob", address: "15205 North Kierland Blvd. Suite 100, Scottsdale", phone: "+1 (363) 787-3833" },
    status: ["Delivered", "Manual Delivery", "Payment Received"],
  },
  {
    key: 6,
    auctionId: "2478293148",
    vehicleDetails: { vin: "23456", name: "887 othermake testmodel2 testTrim" },
    seller: { name: "Speed Car", address: "South Dakota, 34021 N US-45, Grayslake, IL 60030, 57102", phone: "605-371-7629" },
    buyer: { name: "Lacey Stanley", address: "Taylor Berg, Daryl Vincent", phone: "+1 (273) 953-6544" },
    status: ["Delivered", "Manual Delivery", "Payment Received"],
  },
  {
    key: 7,
    auctionId: "562511253",
    vehicleDetails: { vin: "JN8A55MV5CW392335", name: "2 2 2 2" },
    seller: { name: "Archienoah", address: "Archienoah San Tan Valley, 247 E Gold Dust Way, 85142", phone: "+1 (928) 453-6555" },
    buyer: { name: "Henryroob", address: "15205 North Kierland Blvd. Suite 100, Scottsdale", phone: "+1 (363) 787-3833" },
    status: ["Delivered", "Manual Delivery", "Payment Received"],
  },
];

export default function AuctionsWonPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Auctions", href: "/auctions" }, { label: "Won" }]} />
      <div className="p-6">
        <DataTable
          columns={columns}
          data={data}
          tableData={{
            selectableRows: true,
            isEnableFilterInput: true,
          }}
        />
      </div>
    </div>
  );
} 