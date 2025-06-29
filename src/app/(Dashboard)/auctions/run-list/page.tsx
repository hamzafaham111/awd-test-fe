"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Tag, Button } from "antd";
import DataTable from "@/components/common/DataTable";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { showToast } from "@/components/common/Toaster";
import { useState } from "react";
import { showErrorToast, showSuccessToast, COMMON_ERROR_MESSAGES, COMMON_SUCCESS_MESSAGES } from "@/utils/errorHandler";
import axios from "axios";

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
    render: (status: string) => <Tag color="blue">{status}</Tag>,
  },
];

const data = [
  {
    key: 1,
    auctionId: "1902408462",
    vehicleDetails: { vin: "JN8AZ2NF1F9572710", name: "2016 Ford F150 Supercrew 4WD" },
    seller: { name: "Arjun", address: "Arjun Boynton Beach, 4905 Park Ridge Blvd, 33426", phone: "+1 (263) 994-9064" },
    buyer: { name: "", address: "", phone: "" },
    status: "In a Run List",
  },
];

export default function AuctionsRunListPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendToAuction = async () => {
    if (selectedRowKeys.length === 0) {
      showErrorToast({ message: "Please make selection before sending to auction" });
      return;
    }

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(`${apiUrl}/auctions/api/v1/send-to-auction/`, { ids: selectedRowKeys }, { headers });
      showSuccessToast(COMMON_SUCCESS_MESSAGES.SENT, "Items to auction");
      setSelectedRowKeys([]);
      // Here you can add your logic to actually send to auction
    } catch (error) {
      showErrorToast(error, "Sending to auction");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    showToast({ type: "success", message: "Sent to auction successfully!" });
    // Here you can add your logic to actually send to auction
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "Auctions", href: "/auctions" }, { label: "Run List" }]} />
      <div className="p-6">
        <div className="flex justify-end mb-2">
          <button className="bg-sky-600 text-white px-4 py-2 rounded" onClick={handleSendToAuction} disabled={loading}>Send To Auction</button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          tableData={{
            selectableRows: true,
            isEnableFilterInput: true,
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
        />
        <ConfirmModal
          open={showModal}
          onOk={handleConfirm}
          onCancel={() => setShowModal(false)}
          title="!"
          content={"Are you sure you are sending to auctions?"}
          okText="Yes, Confirm it!"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
} 