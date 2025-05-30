"use client";

import { useState } from "react";
import { Card, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Example tab content components
function FeesAndCharges() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Fees & Charges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Inspection Fee (Seller)</h3>
          <div className="mb-2">Per Inspection Fee Type:</div>
          <select className="border rounded px-2 py-1 mb-2 w-full">
            <option>Percentage</option>
            <option>Fixed</option>
          </select>
          <div className="mb-2">Per Inspection Fee:</div>
          <input className="border rounded px-2 py-1 w-full" defaultValue={50} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Basic Arbitration Fee</h3>
          <div className="mb-2">Basic Arbitration Fee Type:</div>
          <select className="border rounded px-2 py-1 mb-2 w-full">
            <option>Fixed</option>
          </select>
          <div className="mb-2">Basic Arbitration Fee:</div>
          <input className="border rounded px-2 py-1 w-full" defaultValue={0} />
          <div className="mb-2 mt-2">Basic Arbitration Days:</div>
          <input className="border rounded px-2 py-1 w-full" defaultValue={7} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Extended Arbitration Fee</h3>
          <div className="mb-2">Extended Arbitration Fee Type:</div>
          <select className="border rounded px-2 py-1 mb-2 w-full">
            <option>Fixed</option>
          </select>
          <div className="mb-2">Extended Arbitration Fee:</div>
          <input className="border rounded px-2 py-1 w-full" defaultValue={10} />
          <div className="mb-2 mt-2">Extended Arbitration Days:</div>
          <input className="border rounded px-2 py-1 w-full" defaultValue={30} />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <Button type="primary" className="bg-sky-600 hover:bg-sky-700 rounded-md px-8 py-2">Save</Button>
      </div>
    </div>
  );
}

function AuctionSetting() {
  return <div><h2 className="text-2xl font-bold mb-6">Auction Setting</h2><p>Settings for auctions go here.</p></div>;
}
function FedExInfo() {
  return <div><h2 className="text-2xl font-bold mb-6">FedEx Information</h2><p>FedEx info form goes here.</p></div>;
}
function Security() {
  return <div><h2 className="text-2xl font-bold mb-6">Security</h2><p>Security settings go here.</p></div>;
}
function Other() {
  return <div><h2 className="text-2xl font-bold mb-6">Other Settings</h2><p>Other settings go here.</p></div>;
}

const tabs = [
  { key: "fees", label: "Fees And Charges", content: <FeesAndCharges /> },
  { key: "auction", label: "Auction Setting", content: <AuctionSetting /> },
  { key: "fedex", label: "FedEx Information", content: <FedExInfo /> },
  { key: "security", label: "Security", content: <Security /> },
  { key: "other", label: "Other", content: <Other /> },
  { key: "apis", label: "APIs", content: <div>API settings go here.</div> },
  { key: "email", label: "Email Settings", content: <div>Email settings go here.</div> },
  { key: "maintenance", label: "Maintenance", content: <div>Maintenance settings go here.</div> },
  { key: "messages", label: "Messages", content: <div>Messages settings go here.</div> },
  { key: "reset", label: "Reset", content: <div>Reset options go here.</div> },
];

export default function SettingsPage() {
  const role = useSelector((state: RootState) => state.user.role);
  if (role === "ds") return <div>Settings Page</div>;
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const activeTabObj = tabs.find(tab => tab.key === activeTab);

  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Settings", href: "/app/settings" }]} />
      <Card className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 border-r bg-gray-50 md:sticky top-0 z-10">
            <ul className="flex flex-col overflow-x-auto md:overflow-x-visible">
              {tabs.map(tab => (
                <li key={tab.key}>
                  <button
                    className={`w-full text-left px-6 py-3 font-semibold transition-colors duration-150 ${activeTab === tab.key ? "bg-sky-600 text-white" : "hover:bg-sky-100 text-sky-700"}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Content Area */}
          <div className="flex-1 px-8 min-h-[400px]">{activeTabObj?.content}</div>
        </div>
      </Card>
    </div>
  );
} 