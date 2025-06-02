"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Tag } from "antd";
import DataTable from "@/components/common/DataTable";

const columns = [
  {
    title: "Image",
    dataIndex: "img",
    key: "img",
    render: (text: string, record: any) => (
      <div className="flex items-center gap-3">
          <div className="w-[60px] h-[40px] flex items-center justify-center bg-gray-100 rounded">
            <span role="img" aria-label="car">🚗</span>
          </div>
      </div>
    ),
  },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Auction ID", dataIndex: "auctionId", key: "auctionId" },
  { title: "VIN", dataIndex: "vin", key: "vin" },
  {
    title: "Expected",
    dataIndex: "expected",
    key: "expected",
    render: (v: number) => <span className="font-bold">${v.toLocaleString()}</span>,
  },
  {
    title: "Last Bid",
    dataIndex: "lastBid",
    key: "lastBid",
    render: (v: number, record: any) => (
      <span className={v > 0 ? "font-bold text-green-600" : "font-bold text-red-600"}>
        {v > 0 ? `$${v.toLocaleString()}` : "--"}
      </span>
    ),
  },
  {
    title: "Timer",
    dataIndex: "timer",
    key: "timer",
    render: (v: string) => <span className="font-semibold text-green-600">{v}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (v: string) => {
      let color = "green";
      if (v === "Ended") color = "#facc15";
      if (v === "Sold") color = "#22d3ee";
      return <Tag color={color} className="font-semibold">{v}</Tag>;
    },
  },
];

const data = [
  {
    key: 1,
    name: "1987 Honda Concerto 4D SUV AWD",
    img: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=60",
    auctionId: "114109692",
    vin: "H4ANKIGY2SXYsZlr",
    expected: 5220,
    lastBid: 710,
    timer: "Ended",
    status: "On Going",
  },
  {
    key: 2,
    name: "2016 Ford F150 Supercrew 4WD",
    img: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=60",
    auctionId: "360182582",
    vin: "JTDBVRBD7JA005366",
    expected: 17925,
    lastBid: 14100,
    timer: "Ended",
    status: "On Going",
  },
  {
    key: 3,
    name: "1975 Mazda Aerostar 4D SUV AWD",
    auctionId: "589660664",
    vin: "BC5RYuHWoZtGREDT2",
    expected: 3653,
    lastBid: 1800,
    timer: "Ended",
    status: "On Going",
  },
  {
    key: 4,
    name: "2013 Honda Atos 4D SUV RWD",
    auctionId: "752837163",
    vin: "aTcmQjk6oNe0vrQWQ",
    expected: 7184,
    lastBid: 100,
    timer: "Ended",
    status: "On Going",
  },
  {
    key: 5,
    name: "2019 Cadillac XT4 Sport",
    auctionId: "801905644",
    vin: "1GYFZR40KF197271",
    expected: 20000,
    lastBid: 1000,
    timer: "Ended",
    status: "On Going",
  },
  {
    key: 6,
    name: "2019 Nissan Armada 4D SUV RWD",
    img: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=60",
    auctionId: "1237717821",
    vin: "JN8AY2ND2KX008152",
    expected: 21750,
    lastBid: 17000,
    timer: "Ended",
    status: "On Going",
  },
  {
    key: 7,
    name: "2003 Honda CR-V 4D SUV 4WD",
    auctionId: "1400973061",
    vin: "SHSRD78803U118563",
    expected: 1100,
    lastBid: 300,
    timer: "Ended",
    status: "Sold",
  },
  {
    key: 8,
    name: "2011 Ford Daytona 4D SUV AWD",
    auctionId: "1438795222",
    vin: "GUZuEzhbkWsnylkdJ",
    expected: 7706,
    lastBid: 5300,
    timer: "Ended",
    status: "On Going",
  },
  {
    key: 9,
    name: "2016 Ford F450 Supercrew 4WD",
    auctionId: "1504103362",
    vin: "testvinVIN",
    expected: 17925,
    lastBid: 0,
    timer: "00:00",
    status: "On Going",
  },
];

export default function AuctionsLivePage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Auctions", href: "/auctions" }, { label: "Live" }]} />
      <div className="p-6">
        <div className="flex justify-end mb-2 text-gray-500 text-sm">
          <span>Live 26 | Bids 34</span>
        </div>
        <Card>
          <DataTable columns={columns} data={data} tableData={{}} />
        </Card>
      </div>
    </div>
  );
} 