"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/components/common/DataTable";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";
import ChangeBidPriceModal from "@/components/modals/ChangeBidPriceModal";
import { Button } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/utils/errorHandler";

export default function DsActiveBuyingInNegotiation() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [changeLoading, setChangeLoading] = useState(false);

  const handleConfirm = async (record: any) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      await axios.patch(`${apiUrl}/auctions/api/v1/buyer/update-negotiation/${record.auctionId}/`, {
        is_accepted: 1,
      }, { headers });
      
      showSuccessToast("Bid confirmed successfully!", "Bid");
      // Refresh data
      window.location.reload();
    } catch (err: any) {
      showErrorToast(err, "Bid confirmation");
    }
  };

  const handleReject = async (record: any) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      await axios.patch(`${apiUrl}/auctions/api/v1/buyer/update-negotiation/${record.auctionId}/`, {
        is_rejected: 1,
      }, { headers });
      
      showSuccessToast("Bid rejected successfully!", "Bid");
      // Refresh data
      window.location.reload();
    } catch (err: any) {
      showErrorToast(err, "Bid rejection");
    }
  };

  const handleChange = (record: any) => {
    setSelectedRecord(record);
    setChangeModalOpen(true);
  };

  const handleChangeBidPrice = async (newPrice: number) => {
    if (!selectedRecord) return;
    
    setChangeLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      await axios.patch(`${apiUrl}/auctions/api/v1/buyer/update-negotiation/${selectedRecord.auctionId}/`, {
        changed_amount: newPrice,
        price_change_requested_by_buyer: true,
        price_change_requested_by_seller: false,
      }, { headers });
      
      showSuccessToast("Counter offer sent successfully!", "Counter Offer");
      setChangeModalOpen(false);
      setSelectedRecord(null);
      // Refresh data
      window.location.reload();
    } catch (err: any) {
      showErrorToast(err, "Counter offer");
    } finally {
      setChangeLoading(false);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      width: 60,
      render: (img: string) => img ? (
        <img src={img} alt="car" className="w-12 h-12 object-cover rounded" />
      ) : null,
    },
    {
      title: "VIN(last six)",
      dataIndex: "vin",
      key: "vin",
      width: 120,
    },
    {
      title: "Auction ID",
      dataIndex: "auctionId",
      key: "auctionId",
      width: 140,
      render: (id: string) => <span className="text-blue-600 font-medium cursor-pointer">{id}</span>,
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
      width: 220,
    },
    {
      title: "Bid Price",
      dataIndex: "bidPrice",
      key: "bidPrice",
      render: (val: number) => <span className="font-bold">$ {val.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>,
      width: 120,
    },
    {
      title: "Changed Amount",
      dataIndex: "changedAmount",
      key: "changedAmount",
      render: (val: number) => (
        <span className="font-bold text-gray-700">
          $ {val.toLocaleString(undefined, {minimumFractionDigits: 2})}
        </span>
      ),
      width: 140,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val: string) => (
        <span
          className={`font-semibold px-2 py-1 rounded`}
          style={{
            background: val === 'Accepted' ? '#d1fae5' : val === 'Rejected' ? '#fee2e2' : val === 'Change Requested by Buyer' ? '#fef3c7' : val === 'Change Requested by Seller' ? '#dbeafe' : '#f3f4f6',
            color: val === 'Accepted' ? '#065f46' : val === 'Rejected' ? '#991b1b' : val === 'Change Requested by Buyer' ? '#964b00' : val === 'Change Requested by Seller' ? '#1e40af' : '#6b7280'
          }}
        >
          {val}
        </span>
      ),
      width: 180,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (val: string, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            icon={<CheckCircleOutlined />}
            className="bg-green-600 hover:bg-green-700 border-green-600"
            onClick={() => handleConfirm(record)}
          >
            CONFIRM
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<CloseCircleOutlined />}
            danger
            className="bg-red-600 hover:bg-red-700 border-red-600"
            onClick={() => handleReject(record)}
          >
            REJECT
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600"
            onClick={() => handleChange(record)}
          >
            Counter
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${apiUrl}/auctions/api/v1/buying-in-negotiation/`, { headers });
        
        // Map API response to table data shape
        const mapped = (response.data || []).map((item: any, index: number) => {
          const req = item.request_id || {};
          
          const bidPrice = item.amount || item.last_bid_id?.bid || 0;
          const changedAmount = item.changed_amount || 0;
          
          // Status logic based on the flags
          let status = 'Pending';
          if (item.is_accepted === 1) {
            status = 'Accepted';
          } else if (item.is_rejected === 1) {
            status = 'Rejected';
          } else if (item.is_expire === 1) {
            status = 'Expired';
          } else if (item.price_change_requested_by_buyer === true) {
            status = 'Change Requested by Buyer';
          } else if (item.price_change_requested_by_seller === true) {
            status = 'Change Requested by Seller';
          }
          
          return {
            key: item.id || index + 1,
            vin: req.vin ? req.vin.slice(-6) : '-',
            auctionId: item.auction_id || item.id || '',
            vehicle: `${req.year || ''} ${req.make || ''} ${req.model || ''}`.trim() || 'Vehicle',
            bidPrice,
            changedAmount,
            status,
            image: req.image || "/images/auth-background.jpg",
            originalData: item, // Keep original data for API calls
          };
        });
        setData(mapped);
      } catch (err: any) {
        setError(err?.response?.data?.detail || err?.message || "Failed to fetch buying in negotiation data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(row =>
    row.vin.toLowerCase().includes(search.toLowerCase()) ||
    row.auctionId.toLowerCase().includes(search.toLowerCase()) ||
    row.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <AuctionSearchBar value={search} onChange={setSearch} onSearch={() => {}} />
        <div className="text-center py-8 text-gray-500">Loading buying in negotiation data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <AuctionSearchBar value={search} onChange={setSearch} onSearch={() => {}} />
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <AuctionSearchBar value={search} onChange={setSearch} onSearch={() => {}} />
      <DataTable
        columns={columns}
        data={filteredData}
        tableData={{ isEnableFilterInput: false }}
      />
      
      <ChangeBidPriceModal
        isOpen={changeModalOpen}
        onClose={() => {
          setChangeModalOpen(false);
          setSelectedRecord(null);
        }}
        onSave={handleChangeBidPrice}
        currentPrice={selectedRecord?.bidPrice || 0}
        lastChangedAmount={selectedRecord?.changedAmount}
        loading={changeLoading}
        auctionId={selectedRecord?.auctionId}
        vehicleInfo={selectedRecord?.vehicle}
      />
    </div>
  );
} 