"use client"
import DataTable from "@/components/common/DataTable";
import ExpandableRowContent from "@/components/common/ExpandableRowContent";
import React, { useState } from "react";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";
import OfferNowModal from "@/components/modals/OfferNowModal";
// Dummy data for auctions
const auctions = [
  {
    key: 1,
    vin: "31108",
    auctionId: "3046438778",
    vehicle: "1234 2023 trimnghghg",
    reservePrice: 700,
    highestBid: null,
    status: "Pending",
    image: "/images/auth-background.jpg",
    offers: [
      {
        buyer: "testing dealer",
        bidDate: "12-04-2025",
        bidPrice: 800,
        status: "Pending",
      },
    ],
  },
  {
    key: 2,
    vin: "22086",
    auctionId: "2627527552",
    vehicle: "Kia Sportage 4D SUV AWD",
    reservePrice: 20000,
    highestBid: null,
    status: "Pending",
    image: "/images/auth-background.jpg",
    offers: [],
  },
  {
    key: 3,
    vin: "18563",
    auctionId: "1400973061",
    vehicle: "Honda CR-V 4D SUV 4WD",
    reservePrice: 1000,
    highestBid: null,
    status: "Pending",
    image: "/images/auth-background.jpg",
    offers: [],
  },
];

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
    render: (val: string) => <span className="font-semibold">{val}</span>,
    width: 100,
  },
];

function ExpandedOfferRow({ record, onOfferNow }: { record: any, onOfferNow: () => void }) {
  return (
    <ExpandableRowContent expanded={true}>
      <div className="bg-white rounded-xl shadow p-4 mt-2">
        <button className="bg-sky-600 text-white px-6 py-2 rounded font-semibold mb-4">Your Offers</button>
        {record.offers.length > 0 ? (
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
                {record.offers.map((offer: any, idx: number) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{offer.buyer}</td>
                    <td className="px-4 py-2">{offer.bidDate}</td>
                    <td className="px-4 py-2">${offer.bidPrice.toFixed(2)}</td>
                    <td className="px-4 py-2"><span className="bg-gray-100 px-3 py-1 rounded font-semibold">{offer.status}</span></td>
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
        {record.offers.length > 0 && (
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
  const [auctionData, setAuctionData] = useState(auctions);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [selectedAuctionKey, setSelectedAuctionKey] = useState<number | null>(null);

  const handleOfferNow = (auctionKey: number) => {
    setSelectedAuctionKey(auctionKey);
    setOfferModalOpen(true);
  };

  const handleOfferSubmit = (amount: number) => {
    setAuctionData(prev => prev.map(row => {
      if (row.key === selectedAuctionKey) {
        return {
          ...row,
          offers: [
            ...row.offers,
            {
              buyer: "You",
              bidDate: new Date().toLocaleDateString(),
              bidPrice: amount,
              status: "Pending",
            },
          ],
        };
      }
      return row;
    }));
    setOfferModalOpen(false);
  };

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
              record={record}
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
      />
    </div>
  );
} 