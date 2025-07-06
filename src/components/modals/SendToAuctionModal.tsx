import { Modal, Typography, Radio, Button } from "antd";
import React, { useState } from "react";

const { Title, Text } = Typography;

interface SendToAuctionModalProps {
  open: boolean;
  onOk: (auctionData: any) => void;
  onCancel: () => void;
  vehicleTitle?: string;
  vin?: string;
  mileage?: string;
  estimatedPrice?: number;
  credit?: number;
}

export default function SendToAuctionModal({
  open,
  onOk,
  onCancel,
  vehicleTitle = "Volkwage Jetta 2021",
  vin = "3VWC57BUXMM031277",
  mileage = "17,854 Miles",
  estimatedPrice = 18540,
  credit = 0,
}: SendToAuctionModalProps) {
  const [auctionType, setAuctionType] = useState("bring_money");
  const [auctionTiming, setAuctionTiming] = useState("10min");
  const [creditUse, setCreditUse] = useState("inspection");

  const handleSend = () => {
    onOk({ auctionType, auctionTiming, creditUse });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={<span className="text-xl font-bold">Send To Auction</span>}
      footer={null}
      centered
      width={520}
      closeIcon={<span className="text-2xl">×</span>}
    >
      {/* Vehicle Info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-bold text-lg">{vehicleTitle}</div>
          <div className="text-gray-500 text-sm mt-1">{vin}</div>
          <div className="text-gray-500 text-sm">{mileage}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Estimated Price</div>
          <div className="font-bold text-2xl">${estimatedPrice.toLocaleString()}</div>
        </div>
      </div>
      <hr className="my-2" />
      {/* Reserve Price */}
      <div className="font-bold text-xs text-gray-700 mb-2 mt-4">RESERVE PRICE</div>
      {/* Auction Type */}
      <div className="mb-4">
        <div className="font-semibold mb-2">Auction Type</div>
        <Radio.Group
          value={auctionType}
          onChange={e => setAuctionType(e.target.value)}
          className="w-full flex flex-col gap-2"
        >
          <Radio.Button value="bring_money" className="w-full flex flex-col items-start border rounded p-3">
            <span className="font-semibold">Bring the money</span>
            <span className="text-xs text-gray-500">This option will start bidding $0</span>
          </Radio.Button>
          <Radio.Button value="less_than_reserve" className="w-full flex flex-col items-start border rounded p-3 mt-2">
            <span className="font-semibold">$3,000 less than reserve</span>
            <span className="text-xs text-gray-500">Start the bid at $3,000 less than reserve</span>
          </Radio.Button>
        </Radio.Group>
      </div>
      {/* Auction Timing */}
      <div className="mb-4">
        <div className="font-semibold mb-2">Auction Timing</div>
        <Radio.Group
          value={auctionTiming}
          onChange={e => setAuctionTiming(e.target.value)}
          className="w-full"
        >
          <Radio.Button value="10min" className="w-full border rounded p-3">10 Minutes</Radio.Button>
        </Radio.Group>
      </div>
      {/* Credit Use */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Credit Use</span>
          <span className="font-bold">${credit.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <Button
            type={creditUse === "inspection" ? "primary" : "default"}
            className="flex-1"
            onClick={() => setCreditUse("inspection")}
          >
            For Inspection Fee
          </Button>
          <Button
            type={creditUse === "selling" ? "primary" : "default"}
            className="flex-1"
            onClick={() => setCreditUse("selling")}
          >
            For Selling Fee
          </Button>
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-end gap-2 mt-6">
        <Button onClick={onCancel}>Close</Button>
        <Button type="primary" onClick={handleSend}>Send Now</Button>
      </div>
    </Modal>
  );
} 