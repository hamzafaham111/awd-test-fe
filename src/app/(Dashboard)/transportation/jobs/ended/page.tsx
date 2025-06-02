"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Table, Button, Tabs, Timeline } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpandableRowContent from "@/components/common/ExpandableRowContent";

const data = [
  {
    key: 1,
    vin: "61085",
    vehicle: "Buick Enclave 4D SUV FWD",
    pickupTime: "Not decided",
    dropTime: "Not decided",
    transportFee: 529,
    transportRate: 0.25,
    image: "/images/car1.jpg",
    job: {
      title: "Buick Enclave 2009 4D SUV FWD",
      jobId: "e9b2971bb6",
      vin: "5GAER23D59J61085",
      status: "Completed",
      earned: 529
    },
    transporter: {
      name: "Oleg Hewitt",
      email: "transporter2@gmail.com",
      cell: "9249854448",
      phone: ""
    },
    pickup: {
      name: "Speed Car",
      address: "34021 N US-45, Grayslake, IL 60030, 605-371-7629",
      gateKey: "4455"
    },
    dropoff: {
      name: "Gage Carr",
      address: "AutoNation USA Corpus Christi, TX, +1 (565) 762-9745",
      gateKey: "9622"
    },
    distance: 2117.796,
    tracking: [
      { time: "Sep 22nd, 2023 05:25", event: "Reached at seller" },
      { time: "Sep 22nd, 2023 05:31", event: "Picked up the vehicle" },
      { time: "Sep 22nd, 2023 05:32", event: "On the way" },
      { time: "Sep 22nd, 2023 05:38", event: "Reached at buyer" },
      { time: "Sep 22nd, 2023 05:42", event: "Drop the vehicle" },
      { time: "Sep 22nd, 2023 07:57", event: "You marked as completed" },
    ],
    deliveredIn: "2 Hours 32 Minutes"
  },
  // ...more rows
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
  { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
  { title: "Pickup Time", dataIndex: "pickupTime", key: "pickupTime" },
  { title: "Drop Time", dataIndex: "dropTime", key: "dropTime" },
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

export default function JobsEndedPage() {
  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
  const [activeTabs, setActiveTabs] = useState<{ [key: string]: string }>({});
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Jobs", href: "/transportation/jobs" }, { label: "Ended" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Completed Jobs <span className="text-black font-normal">/ List</span></h2>
        <Table
          columns={columns}
          dataSource={data}
          expandable={{
            expandedRowRender: (record: any) => (
              <ExpandableRowContent expanded={expandedRowKeys.includes(record.key)}>
                <Tabs
                  activeKey={activeTabs[record.key] || "details"}
                  onChange={key => setActiveTabs(tabs => ({ ...tabs, [record.key]: key }))}
                  items={[
                    {
                      key: "details",
                      label: <Button type={activeTabs[record.key] === "details" || !activeTabs[record.key] ? "primary" : "default"} className="!rounded-none !px-8">Details</Button>,
                      children: (
                        <div>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <div className="font-bold text-lg text-blue-900">{record.job.title}</div>
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                              <span className="text-gray-700">Job ID <span className="font-semibold">{record.job.jobId}</span></span>
                              <span className="text-gray-700">VIN <span className="font-semibold">{record.job.vin}</span></span>
                              <span className="text-green-600 font-bold">{record.job.status}</span>
                              <span className="text-blue-900 font-semibold">You Earned <span className="text-green-600">${record.job.earned}</span></span>
                            </div>
                          </div>
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
                        </div>
                      )
                    },
                    {
                      key: "tracking",
                      label: <Button type={activeTabs[record.key] === "tracking" ? "primary" : "default"} className="!rounded-none !px-8">Tracking</Button>,
                      children: (
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* Timeline */}
                          <div className="flex-1">
                            <Timeline mode="left">
                              {record.tracking.map((item: any, idx: number) => (
                                <Timeline.Item key={idx} color={idx === record.tracking.length - 1 ? "blue" : "gray"}>
                                  <div className={idx === record.tracking.length - 1 ? "font-bold" : ""}>{item.event}</div>
                                  <div className="text-xs text-gray-500">{item.time}</div>
                                </Timeline.Item>
                              ))}
                            </Timeline>
                          </div>
                          {/* Delivery Summary */}
                          <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="text-xl font-bold text-blue-900 mb-2">You marked as completed</div>
                            <div className="mb-2">
                              <div className="font-semibold text-gray-700">Seller Location</div>
                              <div>{record.pickup.address}</div>
                            </div>
                            <div className="mb-2">
                              <div className="font-semibold text-gray-700">Buyer Location</div>
                              <div>{record.dropoff.address}</div>
                            </div>
                            <div className="text-lg font-bold text-blue-900 mt-4">Delivered In</div>
                            <div className="text-2xl font-bold mt-1">{record.deliveredIn}</div>
                          </div>
                        </div>
                      )
                    }
                  ]}
                />
              </ExpandableRowContent>
            ),
            expandedRowKeys,
            onExpand: (expanded, record) => {
              setExpandedRowKeys(expanded ? [record.key] : []);
            },
            rowExpandable: (record: any) => true,
          }}
          pagination={{ pageSize: 6 }}
          rowKey="key"
        />
      </div>
    </div>
  );
} 