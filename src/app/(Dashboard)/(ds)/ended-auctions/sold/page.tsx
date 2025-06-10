"use client"
import React, { useState } from "react";
import DataTable from "@/components/common/DataTable";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";

const soldAuctions = [
  {
    key: 1,
    vin: "2000",
    auctionId: "2842947922",
    vehicle: "Honda 2000 2",
    yourBid: 1000,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 2,
    vin: "31108",
    auctionId: "3046438778",
    vehicle: "1234 2023 trimnghghg",
    yourBid: 800,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 3,
    vin: "X4uL8",
    auctionId: "1909846778",
    vehicle: "Honda Enzo Ferrari 4D SAV 3.0i",
    yourBid: 850,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 4,
    vin: "A1B2C3",
    auctionId: "1234567890",
    vehicle: "Toyota Camry 2021 SE",
    yourBid: 1200,
    soldFor: 1200,
    status: "Sold",
    image: "/images/auth-background.jpg",
  },
  {
    key: 5,
    vin: "D4E5F6",
    auctionId: "2345678901",
    vehicle: "Ford Mustang 2019 GT",
    yourBid: 1500,
    soldFor: 1500,
    status: "Sold",
    image: "/images/auth-background.jpg",
  },
  {
    key: 6,
    vin: "G7H8I9",
    auctionId: "3456789012",
    vehicle: "Chevrolet Malibu 2018 LT",
    yourBid: 900,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 7,
    vin: "J1K2L3",
    auctionId: "4567890123",
    vehicle: "BMW X5 2020 xDrive",
    yourBid: 2000,
    soldFor: 2000,
    status: "Sold",
    image: "/images/auth-background.jpg",
  },
  {
    key: 8,
    vin: "M4N5O6",
    auctionId: "5678901234",
    vehicle: "Audi Q7 2017 Premium",
    yourBid: 1700,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 9,
    vin: "P7Q8R9",
    auctionId: "6789012345",
    vehicle: "Mercedes C300 2016",
    yourBid: 1100,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 10,
    vin: "S1T2U3",
    auctionId: "7890123456",
    vehicle: "Hyundai Sonata 2015 GLS",
    yourBid: 800,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 11,
    vin: "V4W5X6",
    auctionId: "8901234567",
    vehicle: "Kia Optima 2014 LX",
    yourBid: 700,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 12,
    vin: "Y7Z8A9",
    auctionId: "9012345678",
    vehicle: "Nissan Altima 2013 S",
    yourBid: 600,
    soldFor: 0,
    status: "Pending",
    image: "/images/auth-background.jpg",
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
    title: "Your Bid/Offer",
    dataIndex: "yourBid",
    key: "yourBid",
    render: (val: number) => <span className="font-bold">$ {val.toLocaleString()}</span>,
    width: 120,
  },
  {
    title: "Sold For",
    dataIndex: "soldFor",
    key: "soldFor",
    render: (val: number) => <span className="font-bold">$ {val.toLocaleString()}</span>,
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

export default function DsEndedAuctionsSold() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(soldAuctions);

  // Optionally filter data by search (e.g., VIN, auctionId, vehicle)
  const filteredData = data.filter(row =>
    row.vin.toLowerCase().includes(search.toLowerCase()) ||
    row.auctionId.toLowerCase().includes(search.toLowerCase()) ||
    row.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      <AuctionSearchBar value={search} onChange={setSearch} onSearch={() => {}} />
      <DataTable
        columns={columns}
        data={filteredData}
        tableData={{ isEnableFilterInput: false }}
      />
    </div>
  );
} 