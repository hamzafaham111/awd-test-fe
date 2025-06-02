"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DataTable from "@/components/common/DataTable";
import { useRouter } from "next/navigation";
import { Button, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';

const columns = [
  {
    title: "Slab Name",
    dataIndex: "slabName",
    key: "slabName",
  },
  {
    title: "Range",
    dataIndex: "range",
    key: "range",
  },
  {
    title: "Buyer Charges",
    dataIndex: "buyerCharges",
    key: "buyerCharges",
    render: (val: any) => <span>${val}</span>,
  },
  {
    title: "Transporter Charges",
    dataIndex: "transporterCharges",
    key: "transporterCharges",
    render: (val: any) => <span>${val}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => {
      const items = [
        {
          key: 'edit',
          label: (
            <span className="flex items-center gap-2">
              <EditOutlined /> Edit
            </span>
          ),
          onClick: () => {
            // Navigate to edit page
            window.location.href = `/transportation/charges-slabs/${record.key}/edit`;
          },
        },
        {
          key: 'delete',
          label: (
            <span className="flex items-center gap-2 text-red-600">
              <DeleteOutlined /> Delete
            </span>
          ),
          onClick: () => {
            // TODO: Implement delete logic
            // e.g., show confirmation modal
          },
        },
      ];
      return (
        <Dropdown
          menu={{ items }}
          trigger={['click']}
        >
          <Button type="text" icon={<span className="flex items-center gap-1"><SettingOutlined /><DownOutlined /></span>} />
        </Dropdown>
      );
    },
  },
];

const data = [
  {
    key: 1,
    slabName: "More Than 5000 & Less Than 8000",
    range: "5001 - 8000 miles",
    buyerCharges: 0.3,
    transporterCharges: 0.2,
  },
  {
    key: 2,
    slabName: "Under 5000",
    range: "1001 - 5000 miles",
    buyerCharges: 0.4,
    transporterCharges: 0.25,
  },
  {
    key: 3,
    slabName: "Under 1000",
    range: "50 - 1000 miles",
    buyerCharges: 1,
    transporterCharges: 0.75,
  },
  {
    key: 4,
    slabName: "Basic Transportation",
    range: "0 - 50 miles",
    buyerCharges: 1,
    transporterCharges: 0.75,
  },
];

export default function ChargesSlabsPage() {
  const router = useRouter();
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Charges Slabs" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Transportation Charges Slabs <span className="text-black font-normal">/ List</span></h2>
        <DataTable
          columns={columns}
          data={data}
          tableData={{
            isEnableFilterInput: true,
            showAddButton: true,
            addButtonLabel: "Add Slab",
            addButtonHref: "/transportation/charges-slabs/add",
            selectableRows: true,
          }}
        />
        <div className="flex gap-4 mt-4">
          <a href="#" className="text-sky-700 hover:underline">View Trash Records</a>
          <a href="#" className="text-sky-700 hover:underline">View Active Records</a>
        </div>
      </div>
    </div>
  );
} 