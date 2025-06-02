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
    vin: "48787",
    auctionId: "1618114092",
    vehicle: "BMW Jetta SE 4D SEDAN",
    pickupTime: "Not decided",
    transportFee: 823,
    transportRate: 0.25,
    image: "/images/car1.jpg",
    pickup: {
      name: "Lacey Stanley",
      address: "8601 Aurora Ave N, Seattle, WA 98103, 601-346-6535"
    },
    dropoff: {
      name: "Speed Car",
      address: "34021 N US-45, Grayslake, IL 60030, 605-371-7629"
    },
    distance: 3294.994
  },
  {
    key: 2,
    vin: "14451",
    auctionId: "2143015652",
    vehicle: "Ford Edge 4D SUV AWD",
    pickupTime: "13/09/2023 9:i am",
    transportFee: 0,
    transportRate: 0,
    image: "/images/car2.jpg",
    pickup: {
      name: "Pickup Name",
      address: "Pickup Address"
    },
    dropoff: {
      name: "Dropoff Name",
      address: "Dropoff Address"
    },
    distance: 0
  },
  {
    key: 3,
    vin: "28084",
    auctionId: "3935244201",
    vehicle: "Ford F150 Supercrew 4WD",
    pickupTime: "Not decided",
    transportFee: 66,
    transportRate: 0.75,
    image: "/images/car3.jpg",
    pickup: {
      name: "Pickup Name",
      address: "Pickup Address"
    },
    dropoff: {
      name: "Dropoff Name",
      address: "Dropoff Address"
    },
    distance: 0
  },
  {
    key: 4,
    vin: "76246",
    auctionId: "3627788667",
    vehicle: "Ford F150 Supercrew 4WD",
    pickupTime: "Not decided",
    transportFee: 64,
    transportRate: 0.75,
    image: "/images/car4.jpg",
    pickup: {
      name: "Pickup Name",
      address: "Pickup Address"
    },
    dropoff: {
      name: "Dropoff Name",
      address: "Dropoff Address"
    },
    distance: 0
  },
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

export default function JobsUnpickedPage() {
  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Jobs", href: "/transportation/jobs" }, { label: "Un-Picked" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Un-Picked Jobs <span className="text-black font-normal">/ List</span></h2>
        <DataTable
          columns={columns}
          data={data}
          tableData={{}}
          expandable={{
            expandedRowRender: (record: any) => (
              <ExpandableRowContent expanded={expandedRowKeys.includes(record.key)}>
                <Button type="primary" className="mb-4">Details</Button>
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div>
                    <div className="font-bold text-blue-900">Pickup Location</div>
                    <div>{record.pickup.name}</div>
                    <div>{record.pickup.address}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image src="/icons/distance.svg" alt="distance" width={60} height={60} />
                    <div className="font-bold text-blue-900">Distance</div>
                    <div>{record.distance} Km</div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-900">Dropoff Location</div>
                    <div>{record.dropoff.name}</div>
                    <div>{record.dropoff.address}</div>
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