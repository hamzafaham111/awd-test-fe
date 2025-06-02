"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DataTable from "@/components/common/DataTable";
import { Button } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandableRowContent from "@/components/common/ExpandableRowContent";

const data = [
  {
    key: 1,
    vin: "69853",
    auctionId: "78922556",
    vehicle: "Toyota Camry 4D Sedan",
    pickupTime: "23/11/2023 6:i am",
    transportFee: 529,
    transportRate: 0.25,
    image: "/images/car1.jpg",
    pickup: {
      name: "Speed Car",
      address: "34021 N US-45, Grayslake, IL 60030, 605-371-7629",
      gateKey: "7089"
    },
    dropoff: {
      name: "Gage Carr",
      address: "AutoNation USA Corpus Christi, TX, +1 (565) 762-9745",
      gateKey: "3593"
    },
    distance: 2117.798,
    transporter: {
      name: "Oleg Hewitt",
      email: "transporter2@gmail.com",
      cell: "9249854448",
      phone: ""
    },
    jobStatus: "Job not started"
  }
];

const columns = [
  {
    title: "",
    dataIndex: "image",
    key: "image",
    render: (img: any) => (
      <Image src={img} alt="car" width={70} height={50} className="rounded" />
    ),
  },
  { title: "VIN(last six)", dataIndex: "vin", key: "vin" },
  { title: "Auction ID", dataIndex: "auctionId", key: "auctionId" },
  { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
  { title: "Pickup Time", dataIndex: "pickupTime", key: "pickupTime" },
  {
    title: "Transport Fee",
    dataIndex: "transportFee",
    key: "transportFee",
    render: (fee: any, record: any) => (
      <span className="text-green-600 font-bold">
        ${fee} <br />
        <span className="text-xs text-blue-900">@ ${record.transportRate}/km</span>
      </span>
    ),
  },
];

export default function JobsAcceptedPage() {
  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Jobs", href: "/transportation/jobs" }, { label: "Accepted" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Accepted Jobs <span className="text-black font-normal">/ List</span></h2>
        <DataTable
          columns={columns}
          data={data}
          tableData={{}}
          expandable={{
            expandedRowRender: (record: any) => (
              <ExpandableRowContent expanded={expandedRowKeys.includes(record.key)}>
                {/* Transporter Info */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                  <div className="font-bold text-lg text-blue-900">Transporter</div>
                  <div className="flex flex-wrap gap-6 text-gray-800">
                    <span>Name : <span className="font-semibold">{record.transporter.name}</span></span>
                    <span>Email : <span className="font-semibold">{record.transporter.email}</span></span>
                    <span>Cell : <span className="font-semibold">{record.transporter.cell}</span></span>
                    <span>Phone : <span className="font-semibold">{record.transporter.phone || '-'} </span></span>
                  </div>
                </div>
                {/* Pickup/Dropoff/Distance Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Pickup Location */}
                  <div>
                    <div className="font-bold text-lg text-blue-900 mb-1">Pickup Location</div>
                    <div className="font-semibold">{record.pickup.name}</div>
                    <div className="text-gray-700">{record.pickup.address}</div>
                    <div className="mt-4 text-blue-900 font-semibold">Seller Gate Key</div>
                    <div className="text-2xl font-bold text-green-600 tracking-widest">{record.pickup.gateKey}</div>
                  </div>
                  {/* Distance */}
                  <div className="flex flex-col items-center justify-center">
                    <Image src="/icons/distance.svg" alt="distance" width={80} height={80} />
                    <div className="font-bold text-blue-900 mt-2">Distance</div>
                    <div className="text-lg font-semibold">{record.distance} Km</div>
                    <Button className="mt-4 bg-blue-100 text-blue-900 font-semibold border-none cursor-default" size="large">{record.jobStatus}</Button>
                  </div>
                  {/* Dropoff Location */}
                  <div>
                    <div className="font-bold text-lg text-blue-900 mb-1">Dropoff Location</div>
                    <div className="font-semibold">{record.dropoff.name}</div>
                    <div className="text-gray-700">{record.dropoff.address}</div>
                    <div className="mt-4 text-blue-900 font-semibold">Buyer Gate Key</div>
                    <div className="text-2xl font-bold text-green-600 tracking-widest">{record.dropoff.gateKey}</div>
                  </div>
                </div>
              </ExpandableRowContent>
            ),
            expandedRowKeys,
            onExpand: (expanded: boolean, record: any) => {
              setExpandedRowKeys(expanded ? [record.key] : []);
            },
            rowExpandable: (record: any) => true,
          }}
        />
      </div>
    </div>
  );
} 