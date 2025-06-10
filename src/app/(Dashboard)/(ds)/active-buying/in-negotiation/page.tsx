"use client";
import React, { useState } from "react";
import DataTable from "@/components/common/DataTable";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";

const initialData = [
  {
    key: 1,
    vin: "X4uL8",
    auctionId: "1909846778",
    vehicle: "Honda Enzo Ferrari 4D SAV 3.0i",
    bidPrice: 850,
    status: "Pending",
    image: "/images/car-yellow.png",
  },
  {
    key: 2,
    vin: "A1B2C3",
    auctionId: "1234567890",
    vehicle: "Toyota Camry 2021 SE",
    bidPrice: 1200,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 3,
    vin: "D4E5F6",
    auctionId: "2345678901",
    vehicle: "Ford Mustang 2019 GT",
    bidPrice: 1500,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 4,
    vin: "G7H8I9",
    auctionId: "3456789012",
    vehicle: "Chevrolet Malibu 2018 LT",
    bidPrice: 900,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 5,
    vin: "J1K2L3",
    auctionId: "4567890123",
    vehicle: "BMW X5 2020 xDrive",
    bidPrice: 2000,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 6,
    vin: "M4N5O6",
    auctionId: "5678901234",
    vehicle: "Audi Q7 2017 Premium",
    bidPrice: 1700,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 7,
    vin: "P7Q8R9",
    auctionId: "6789012345",
    vehicle: "Mercedes C300 2016",
    bidPrice: 1100,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 8,
    vin: "S1T2U3",
    auctionId: "7890123456",
    vehicle: "Hyundai Sonata 2015 GLS",
    bidPrice: 800,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 9,
    vin: "V4W5X6",
    auctionId: "8901234567",
    vehicle: "Kia Optima 2014 LX",
    bidPrice: 700,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 10,
    vin: "Y7Z8A9",
    auctionId: "9012345678",
    vehicle: "Nissan Altima 2013 S",
    bidPrice: 600,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 11,
    vin: "Z1A2B3",
    auctionId: "0123456789",
    vehicle: "Mazda 6 2012 Touring",
    bidPrice: 950,
    status: "Pending",
    image: "/images/auth-background.jpg",
  },
  {
    key: 12,
    vin: "C4D5E6",
    auctionId: "1098765432",
    vehicle: "Subaru Outback 2011",
    bidPrice: 1050,
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
    render: (val: string) => <span className="font-semibold text-gray-700">{val}</span>,
    width: 100,
  },
];

export default function DsActiveBuyingInNegotiation() {
  const [search, setSearch] = useState("");
  const [data] = useState(initialData);

  const filteredData = data.filter(row =>
    row.vin.toLowerCase().includes(search.toLowerCase()) ||
    row.auctionId.toLowerCase().includes(search.toLowerCase()) ||
    row.vehicle.toLowerCase().includes(search.toLowerCase())
  );

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