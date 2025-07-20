"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/components/common/DataTable";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";
import axios from "axios";

const STATUS_MAP: Record<number, { label: string; color: string }> = {
  1: { label: 'Active', color: 'blue' },
  2: { label: 'In Negotiation', color: 'orange' },
  3: { label: 'Ended', color: 'green' },
  0: { label: 'Pending', color: 'gray' },
};

function StatusTag({ status }: { status: number }) {
  const statusObj = STATUS_MAP[status] || { label: String(status), color: 'gray' };
  return (
    <span
      className={`font-semibold px-2 py-1 rounded`}
      style={{ background: statusObj.color === 'gray' ? '#f3f4f6' : statusObj.color === 'orange' ? '#fbbf24' : statusObj.color === 'green' ? '#bbf7d0' : statusObj.color === 'blue' ? '#dbeafe' : '#f3f4f6', color: statusObj.color === 'gray' ? '#6b7280' : statusObj.color === 'orange' ? '#b45309' : statusObj.color === 'green' ? '#166534' : statusObj.color === 'blue' ? '#1e40af' : '#6b7280' }}
    >
      {statusObj.label}
    </span>
  );
}

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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (val: number) => <StatusTag status={val} />, // colored label
    width: 100,
  },
];

export default function DsSellingInNegotiation() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${apiUrl}/auctions/api/v1/selling-in-negotiation/`, { headers });
        // Map API response to table data shape
        const mapped = (response.data || []).map((item: any, index: number) => {
          const req = item.request_id || {};
          const bidPrice = item.last_bid_id?.bid || item.bid_price || item.current_bid || 0;
          return {
            key: item.id || index + 1,
            vin: req.vin ? req.vin.slice(-6) : '-',
            auctionId: item.auction_id || item.id || '',
            vehicle: `${req.year || ''} ${req.make || ''} ${req.model || ''}`.trim() || 'Vehicle',
            bidPrice,
            status: item.status,
            image: req.image || "/images/auth-background.jpg",
          };
        });
        setData(mapped);
      } catch (err: any) {
        setError(err?.response?.data?.detail || err?.message || "Failed to fetch selling in negotiation data.");
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
        <div className="text-center py-8 text-gray-500">Loading selling in negotiation data...</div>
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
    </div>
  );
} 