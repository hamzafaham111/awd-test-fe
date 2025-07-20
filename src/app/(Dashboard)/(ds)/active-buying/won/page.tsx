"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/components/common/DataTable";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";
import { Tabs } from "antd";
import { motion } from "framer-motion";
import { CheckCircleTwoTone, DownOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";

// --- Types ---
type WonBid = {
  key: string;
  vin: string;
  auctionId: string;
  vehicle: string;
  wonDate: string;
  bidPrice: number;
  reserved: boolean;
  status: string;
};

// --- Tab Components ---
function ConfirmationTab() {
  return (
    <div className="flex flex-col items-center py-8">
      <CheckCircleTwoTone twoToneColor="#bdbdbd" style={{ fontSize: 56, marginBottom: 16 }} />
      <h2 className="text-2xl font-bold mb-2">Congratulations! You won this bid!</h2>
      <p className="text-gray-500 mb-6 text-center max-w-xl">
        Kindly proceed with your confirmation and initiate the necessary payments. Your prompt action ensures a smooth and efficient process.
      </p>
      <button className="bg-blue-600 text-white px-8 py-2 rounded font-semibold text-lg hover:bg-blue-700 transition">Confirm Now</button>
    </div>
  );
}

function PaymentTab({ bid }: { bid: WonBid }) {
  // Dummy toggles and calculations for demo
  const [transport, setTransport] = useState(false);
  const [arbitration, setArbitration] = useState(false);
  const platformFee = 0;
  const transportFee = transport ? 0 : 0; // Replace with real logic
  const arbitrationFee = arbitration ? 0 : 0; // Replace with real logic
  const total = bid.bidPrice + platformFee + transportFee + arbitrationFee;

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200">
        <div className="text-6xl text-gray-300 mb-4">$</div>
        <p className="text-gray-500 text-center max-w-xs mb-6">
          Please proceed to pay the auction amount to secure your desired item
        </p>
        <button className="bg-blue-600 text-white px-8 py-2 rounded font-semibold text-lg hover:bg-blue-700 transition">Pay Now</button>
      </div>
      <div className="flex-1 px-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl text-gray-400">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F3F4F6"/><rect x="5" y="7" width="14" height="10" rx="2" fill="#D1D5DB"/><rect x="7" y="9" width="10" height="2" rx="1" fill="#9CA3AF"/><rect x="7" y="13" width="6" height="2" rx="1" fill="#9CA3AF"/></svg>
          </span>
          <span className="font-bold text-lg">Auction ID {bid.auctionId}</span>
        </div>
        <div className="space-y-1 mb-2">
          <div className="flex justify-between"><span>Bid Amount</span><span className="font-semibold">${bid.bidPrice}</span></div>
          <div className="flex justify-between"><span>Platform Fee</span><span className="font-semibold">${platformFee}</span></div>
          <div className="flex justify-between items-center">
            <span>Transportation</span>
            <input type="checkbox" checked={transport} onChange={() => setTransport(v => !v)} className="accent-blue-600" />
          </div>
          <div className="flex justify-between items-center text-gray-400 line-through text-sm">
            <span>Distance NaNmiles</span><span>$NaN</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Extend 30 days Arbitration</span>
            <input type="checkbox" checked={arbitration} onChange={() => setArbitration(v => !v)} className="accent-blue-600" />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>7 days arbitration</span><span>$0</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>Total</span><span>${total}</span>
        </div>
      </div>
    </div>
  );
}

function ArbitrationTab() {
  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2">7 days Arbitration</h2>
        <div className="mb-2">
          <span className="font-semibold">Status :</span> <span className="text-red-500">8 days remaining</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Start Date :</span> 03 Jun 2025
        </div>
        <div className="mb-2">
          <span className="font-semibold">End Date :</span> 10 Jun 2025
        </div>
        <button className="mt-4 border border-blue-600 text-blue-600 px-6 py-2 rounded font-semibold hover:bg-blue-50 transition">Request for Arbitration</button>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2">Arbitration Process</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li><b>General.</b> If a buyer has received a vehicle that has an undisclosed issue that is covered for arbitration under this policy, the buyer may notify.</li>
          <li><b>Timing.</b> Buyer will have 10 calendar days from the date of purchase.</li>
          <li><b>Extended Arbitration Windows.</b> Buyer may, at the time of purchase, choose to purchase an extended arbitration option for any given vehicle which would give the buyer either an additional 30 days.</li>
          <li><b>Investigation.</b> In order to fully investigate the arbitration claim, AWD Auctions may require the buyer to provide evidence of the claim and assist in diagnosis of any undisclosed condition issues within a specified timeframe.</li>
        </ul>
      </div>
    </div>
  );
}

// --- Expandable Row Content ---
function ExpandableRowContent({ bid }: { bid: WonBid }) {
  const [activeTab, setActiveTab] = useState("confirmation");
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-t border-gray-200"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 py-4 px-2">
          <button
            className={`px-6 py-2 rounded font-semibold text-base transition ${activeTab === "confirmation" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
            onClick={() => setActiveTab("confirmation")}
          >
            Confirmation
          </button>
          <button
            className={`px-6 py-2 rounded font-semibold text-base transition ${activeTab === "payment" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </button>
          <button
            className={`px-6 py-2 rounded font-semibold text-base transition ${activeTab === "arbitration" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
            onClick={() => setActiveTab("arbitration")}
          >
            Arbitration
          </button>
        </div>
        <div>
          {activeTab === "confirmation" && <ConfirmationTab />}
          {activeTab === "payment" && <PaymentTab bid={bid} />}
          {activeTab === "arbitration" && <ArbitrationTab />}
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Page ---
export default function DsActiveBuyingWon() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<WonBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${apiUrl}/auctions/api/v1/buying-won/`, { headers });
        
        // Map API response to table data shape
        const mapped = (response.data || []).map((item: any, index: number) => {
          const req = item.request_id || {};
          return {
            key: item.id || index + 1,
            vin: req.vin ? req.vin.slice(-6) : '-',
            auctionId: item.auction_id || item.id || '',
            vehicle: `${req.year || ''} ${req.make || ''} ${req.model || ''}`.trim() || 'Vehicle',
            wonDate: item.won_date ? new Date(item.won_date).toLocaleDateString() : item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A',
            bidPrice: item.bid_price || item.winning_bid || 0,
            reserved: item.reserved_price ? true : false,
            status: item.status === 1 ? 'Waiting for Buyer Confirmation' : item.status === 2 ? 'Payment Pending' : item.status === 3 ? 'Completed' : 'Pending',
          };
        });
        setData(mapped);
      } catch (err: any) {
        setError(err?.response?.data?.detail || err?.message || "Failed to fetch won buying data.");
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

  // Columns moved inside the component to access expandedRowKeys
  const columns = [
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
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
      width: 220,
    },
    {
      title: "Won Date",
      dataIndex: "wonDate",
      key: "wonDate",
      width: 120,
    },
    {
      title: "Bid Price",
      dataIndex: "bidPrice",
      key: "bidPrice",
      width: 140,
      render: (val: number, record: WonBid) => (
        <span className="font-bold">$ {val.toLocaleString()} {record.reserved && <span className="text-yellow-500 font-semibold">Reserved Price</span>}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (val: string) => <span className="font-semibold text-gray-500 whitespace-pre-line">{val}</span>,
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <AuctionSearchBar value={search} onChange={setSearch} onSearch={() => {}} />
        <div className="text-center py-8 text-gray-500">Loading won buying data...</div>
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
        expandable={{
          expandedRowRender: (record: WonBid) => <ExpandableRowContent bid={record} />,
          expandedRowKeys,
          onExpand: (expanded: boolean, record: WonBid) => {
            setExpandedRowKeys(expanded ? [record.key] : []);
          },
        }}
        tableData={{ isEnableFilterInput: false }}
      />
    </div>
  );
} 