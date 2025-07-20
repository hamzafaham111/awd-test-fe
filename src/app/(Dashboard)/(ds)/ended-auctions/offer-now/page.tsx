"use client"
import DataTable from "@/components/common/DataTable";
import ExpandableRowContent from "@/components/common/ExpandableRowContent";
import React, { useState, useEffect, useCallback } from "react";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";
import OfferNowModal from "@/components/modals/OfferNowModal";
import axios from "axios";
import { message } from "antd";
// Dummy data for auctions


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
  },
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
    width: 220,
  },
  {
    title: "Reserve Price",
    dataIndex: "reservePrice",
    key: "reservePrice",
    render: (val: number) => <span className="font-bold">$ {val.toLocaleString()}</span>,
    width: 120,
  },
  {
    title: "Highest Bid",
    dataIndex: "highestBid",
    key: "highestBid",
    render: (val: number | null) => val ? `$${val}` : <span className="font-semibold">No Bids</span>,
    width: 120,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (val: string) => {
      let color = "gray";
      if (val === "Pending") color = "orange";
      else if (val === "Sold") color = "green";
      return <span className={`font-semibold px-3 py-1 rounded`} style={{ background: color === 'orange' ? '#fbbf24' : color === 'green' ? '#bbf7d0' : '#f3f4f6', color: color === 'orange' ? '#b45309' : color === 'green' ? '#166534' : '#6b7280' }}>{val}</span>;
    },
    width: 100,
  },
];

function ExpandedOfferRow({ offers, onOfferNow }: { offers: any[], onOfferNow: () => void }) {
  return (
    <ExpandableRowContent expanded={true}>
      <div className="bg-white rounded-xl shadow p-4 mt-2">
        <button className="bg-sky-600 text-white px-6 py-2 rounded font-semibold mb-4">Your Offers</button>
        {offers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-bold">Buyer</th>
                  <th className="px-4 py-2 text-left font-bold">Bid Date</th>
                  <th className="px-4 py-2 text-left font-bold">Bid Price</th>
                  <th className="px-4 py-2 text-left font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{offer.buyer || offer.buyer_id?.dealership_name || '-'}</td>
                    <td className="px-4 py-2">{offer.bidDate || offer.created_at ? new Date(offer.created_at).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-2">${offer.bidPrice ? offer.bidPrice.toFixed(2) : offer.amount ? Number(offer.amount).toLocaleString() : '-'}</td>
                    <td className="px-4 py-2"><span className="bg-gray-100 px-3 py-1 rounded font-semibold">{offer.status || (offer.is_accepted ? 'Accepted' : offer.is_rejected ? 'Rejected' : 'Pending')}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <div className="text-lg font-medium mb-4">No have no offer submitted yet!</div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded text-lg"
              onClick={onOfferNow}
            >
              Offer Now
            </button>
          </div>
        )}
        {offers.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-sky-600 text-white px-8 py-2 rounded font-semibold"
              onClick={onOfferNow}
            >
              New Offer
            </button>
          </div>
        )}
      </div>
    </ExpandableRowContent>
  );
}

const defaultFilters = {
  makeModel: [],
  price: [100, 40000],
  year: [1975, 2023],
  mileage: [1000, 120000],
  fuelType: [],
  transmission: [],
};
export default function DsEndedAuctionsOfferNow() {
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [auctionData, setAuctionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [selectedAuctionKey, setSelectedAuctionKey] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch auctions from API
  const fetchAuctions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${apiUrl}/auctions/api/v1/offer-now/`, { headers });
      const mapped = (response.data || []).map((item: any, idx: number) => {
        const req = item.request_id || {};
        let statusLabel = 'Pending';
        if (typeof req.status === 'number') {
          if (req.status === 21) statusLabel = 'Pending';
          else if (req.status >= 5) statusLabel = 'Sold';
          else statusLabel = String(item.status || 'Pending');
        }
        return {
          key: item.id || idx + 1,
          vin: req.vin ? String(req.vin).slice(-6) : '-',
          auctionId: req.auction_id || item.id || '',
          vehicle: `${req.year || ''} ${req.make || ''} ${req.model || ''}`.trim() || 'Vehicle',
          reservePrice: req.reserve_price || 0,
          highestBid: item.last_bid_id?.bid ?? null,
          status: statusLabel,
          image: "/images/auth-background.jpg",
          offers: item.offers || [],
        };
      });
      setAuctionData(mapped);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || "Failed to fetch offer-now auctions.");
      setAuctionData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuctions();
  }, [fetchAuctions]);

  const handleOfferNow = useCallback((auctionKey: number) => {
    setSelectedAuctionKey(auctionKey);
    setOfferModalOpen(true);
  }, []);

  // Handle offer submission and refresh data after success
  const handleOfferSubmit = useCallback(async (amount: number) => {
    if (selectedAuctionKey == null) return;
    const auction = auctionData.find(row => row.key === selectedAuctionKey);
    if (!auction) return;
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const payload = {
        auction_id: auction.auctionId,
        amount: amount,
      };
      await axios.post(`${apiUrl}/auctions/api/v1/create-offer/`, payload, { headers });
      message.success("Offer placed successfully!");
      await fetchAuctions(); // Refresh data after successful offer
      setOfferModalOpen(false);
    } catch (err: any) {
      message.error(err?.response?.data?.detail || err?.message || "Failed to place offer.");
    } finally {
      setSubmitting(false);
    }
  }, [selectedAuctionKey, auctionData, fetchAuctions]);

  if (loading) {
    return (
      <div className="p-6">
        <AuctionSearchBar value={search} onChange={setSearch} onSearch={() => {}} />
        <div className="text-center py-8 text-gray-500">Loading offer-now auctions...</div>
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
        data={auctionData}
        tableData={{ isEnableFilterInput: false }}
        expandable={{
          expandedRowRender: (record: any) => (
            <ExpandedOfferRow
              offers={record.offers}
              onOfferNow={() => handleOfferNow(record.key)}
            />
          ),
          expandedRowKeys,
          onExpand: (expanded: boolean, record: any) => {
            setExpandedRowKeys(expanded ? [record.key] : []);
          },
          rowExpandable: () => true,
        }}
      />
      <OfferNowModal
        open={offerModalOpen}
        onCancel={() => setOfferModalOpen(false)}
        onSubmit={handleOfferSubmit}
        loading={submitting}
      />
    </div>
  );
} 