"use client";
import React, { useState } from "react";
import DataTable from "@/components/common/DataTable";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";
import OfferNowModal from "@/components/modals/OfferNowModal";

const initialData = [
  {
    key: 1,
    vin: "X4uL8",
    auctionId: "1909846778",
    vehicle: "Honda Enzo Ferrari 4D SAV 3.0i",
    bidPrice: 850,
    status: "Active",
    image: "/images/car-yellow.png",
    bids: [
      {
        buyer: "testing dealer",
        bidDate: "16-04-2025 4:56:31",
        bidPrice: 850,
        status: "Pending",
      },
    ],
  },
  {
    key: 2,
    vin: "A1B2C3",
    auctionId: "1234567890",
    vehicle: "Toyota Camry 2021 SE",
    bidPrice: 1200,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [
      {
        buyer: "dealer 2",
        bidDate: "15-04-2025 2:30:00",
        bidPrice: 1200,
        status: "Pending",
      },
    ],
  },
  {
    key: 3,
    vin: "D4E5F6",
    auctionId: "2345678901",
    vehicle: "Ford Mustang 2019 GT",
    bidPrice: 1500,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [
      {
        buyer: "dealer 3",
        bidDate: "14-04-2025 1:15:00",
        bidPrice: 1500,
        status: "Pending",
      },
    ],
  },
  {
    key: 4,
    vin: "G7H8I9",
    auctionId: "3456789012",
    vehicle: "Chevrolet Malibu 2018 LT",
    bidPrice: 900,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [],
  },
  {
    key: 5,
    vin: "J1K2L3",
    auctionId: "4567890123",
    vehicle: "BMW X5 2020 xDrive",
    bidPrice: 2000,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [
      {
        buyer: "dealer 5",
        bidDate: "13-04-2025 3:45:00",
        bidPrice: 2000,
        status: "Pending",
      },
    ],
  },
  {
    key: 6,
    vin: "M4N5O6",
    auctionId: "5678901234",
    vehicle: "Audi Q7 2017 Premium",
    bidPrice: 1700,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [],
  },
  {
    key: 7,
    vin: "P7Q8R9",
    auctionId: "6789012345",
    vehicle: "Mercedes C300 2016",
    bidPrice: 1100,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [
      {
        buyer: "dealer 7",
        bidDate: "12-04-2025 5:00:00",
        bidPrice: 1100,
        status: "Pending",
      },
    ],
  },
  {
    key: 8,
    vin: "S1T2U3",
    auctionId: "7890123456",
    vehicle: "Hyundai Sonata 2015 GLS",
    bidPrice: 800,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [],
  },
  {
    key: 9,
    vin: "V4W5X6",
    auctionId: "8901234567",
    vehicle: "Kia Optima 2014 LX",
    bidPrice: 700,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [],
  },
  {
    key: 10,
    vin: "Y7Z8A9",
    auctionId: "9012345678",
    vehicle: "Nissan Altima 2013 S",
    bidPrice: 600,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [],
  },
  {
    key: 11,
    vin: "Z1A2B3",
    auctionId: "0123456789",
    vehicle: "Mazda 6 2012 Touring",
    bidPrice: 950,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [],
  },
  {
    key: 12,
    vin: "C4D5E6",
    auctionId: "1098765432",
    vehicle: "Subaru Outback 2011",
    bidPrice: 1050,
    status: "Active",
    image: "/images/auth-background.jpg",
    bids: [],
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
    render: (val: number) => <span className="font-bold">$ {val.toLocaleString()}</span>,
    width: 120,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (val: string) => <span className="font-semibold text-green-600">{val}</span>,
    width: 100,
  },
];

function ExpandedRow({ record, onNewOffer }: { record: any; onNewOffer: () => void }) {
  return (
    <div className="bg-white p-4 border-t">
      <div className="flex items-center mb-4">
        <button className="bg-blue-500 text-white px-6 py-2 font-semibold text-lg mr-4 cursor-default">Your Bids</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left font-bold">Buyer</th>
              <th className="px-4 py-2 text-left font-bold">Bid Date</th>
              <th className="px-4 py-2 text-left font-bold">Bid Price</th>
              <th className="px-4 py-2 text-left font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {record.bids && record.bids.length > 0 ? (
              record.bids.map((bid: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{bid.buyer}</td>
                  <td className="px-4 py-2">{bid.bidDate}</td>
                  <td className="px-4 py-2 font-bold">${bid.bidPrice.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded font-semibold ${bid.status === "Pending" ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-600"}`}>{bid.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">No bids yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded text-lg"
          onClick={onNewOffer}
        >
          New Offer
        </button>
      </div>
    </div>
  );
}

export default function DsActiveBuyingCurrentBids() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const [expandedRowKey, setExpandedRowKey] = useState<number | null>(null);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offerRowKey, setOfferRowKey] = useState<number | null>(null);

  const filteredData = data.filter(row =>
    row.vin.toLowerCase().includes(search.toLowerCase()) ||
    row.auctionId.toLowerCase().includes(search.toLowerCase()) ||
    row.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  const handleExpand = (expanded: boolean, record: any) => {
    setExpandedRowKey(expanded ? record.key : null);
  };

  const handleNewOffer = (rowKey: number) => {
    setOfferRowKey(rowKey);
    setOfferModalOpen(true);
  };

  const handleOfferSubmit = (amount: number) => {
    setData(prev =>
      prev.map(row =>
        row.key === offerRowKey
          ? {
              ...row,
              bids: [
                ...row.bids,
                {
                  buyer: "You",
                  bidDate: new Date().toLocaleString("en-GB").replace(",", ""),
                  bidPrice: amount,
                  status: "Pending",
                },
              ],
              bidPrice: amount,
            }
          : row
      )
    );
    setOfferModalOpen(false);
    setOfferRowKey(null);
  };

  return (
    <div className="p-6">
      <AuctionSearchBar value={search} onChange={setSearch} onSearch={() => {}} />
      <DataTable
        columns={columns}
        data={filteredData}
        expandable={{
          expandedRowRender: (record: any) => (
            <ExpandedRow record={record} onNewOffer={() => handleNewOffer(record.key)} />
          ),
          expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
          onExpand: handleExpand,
        }}
        tableData={{ isEnableFilterInput: false }}
      />
      <OfferNowModal
        open={offerModalOpen}
        onCancel={() => setOfferModalOpen(false)}
        onSubmit={handleOfferSubmit}
      />
    </div>
  );
} 