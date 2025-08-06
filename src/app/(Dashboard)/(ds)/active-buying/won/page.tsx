"use client";
import { useState, useEffect } from "react";
import { Card, Tabs, Button, Modal, Form, Select, message } from "antd";
import { CheckCircleTwoTone, CarOutlined, FileTextOutlined, DollarOutlined, UserOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/utils/errorHandler";

// Status code to label mapping
const STATUS_MAP: Record<number, string> = {
  0: 'Pending',
  1: 'Waiting for speciality approval',
  2: 'Inspector Assigned',
  3: 'Inspection started',
  4: 'Inspection Completed',
  21: 'On Auction',
  20: 'On Run List',
  5: 'Waiting for buyer confirmation',
  6: 'Payment pending',
  7: 'Delivered',
};

const statusColors: Record<string, string> = {
  "Inspection Completed": "bg-blue-100 text-blue-700 border-blue-300",
  "Inspection started": "bg-orange-100 text-orange-700 border-orange-300",
  "Pending": "bg-gray-100 text-gray-700 border-gray-300",
  "Waiting for speciality approval": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Inspector Assigned": "bg-purple-100 text-purple-700 border-purple-300",
  "On Auction": "bg-green-100 text-green-700 border-green-300",
  "Waiting for buyer confirmation": "bg-indigo-100 text-indigo-700 border-indigo-300",
  "Payment pending": "bg-pink-100 text-pink-700 border-pink-300",
  "Delivered": "bg-emerald-100 text-emerald-700 border-emerald-300",
};

interface WonBid {
  key: string;
  auctionId: string;
  wonAt: string;
  expectedPrice: number;
  wonPrice: number;
  reservePrice: number | null;
  vehicleInfo: string;
  vin: string;
  stockNo: string;
  odometer: string;
  originalData?: any;
  status: number;
  statusLabel: string;
}

// --- Modal Components ---
function ConfirmationModal({ 
  visible, 
  onCancel, 
  onConfirm, 
  loading, 
  auctionData, 
  locations 
}: { 
  visible: boolean; 
  onCancel: () => void; 
  onConfirm: (values: any) => void; 
  loading: boolean; 
  auctionData: WonBid; 
  locations: any[]; 
}) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onConfirm(values);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Modal
      title="Confirm Auction Purchase"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" loading={loading} onClick={handleSubmit}>
          Confirm Purchase
        </Button>,
      ]}
      width={600}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
            <p className="text-gray-900">{auctionData.vehicleInfo}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">VIN</label>
            <p className="text-gray-900 font-mono">{auctionData.vin}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auction ID</label>
            <p className="text-gray-900 font-mono">{auctionData.auctionId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Winning Bid</label>
            <p className="text-gray-900 font-bold">${auctionData.wonPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <Form form={form} layout="vertical">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Vehicle Delivery Location"
            name="vehicle_delivery_location"
            rules={[{ required: true, message: 'Please select vehicle delivery location' }]}
          >
            <Select
              placeholder="Select vehicle delivery location"
              options={locations.map((location: any) => ({
                label: location.address,
                value: location.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Title Delivery Location"
            name="title_delivery_location"
            rules={[{ required: true, message: 'Please select title delivery location' }]}
          >
            <Select
              placeholder="Select title delivery location"
              options={locations.map((location: any) => ({
                label: location.address,
                value: location.id,
              }))}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

// --- Tab Components ---
function ConfirmationTab({ bid, onConfirm }: { bid: WonBid; onConfirm: (values: any) => void }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationsLoading, setLocationsLoading] = useState(false);

  // Check if auction is already confirmed based on request_id.status
  const isConfirmed = bid.originalData?.request_id?.status === 6;

  // Fetch locations when modal opens
  const fetchLocations = async () => {
    setLocationsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${apiUrl}/users/api/v1/dealer-locations/`, { headers });
      setLocations(response.data || []);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      showErrorToast(error, "Locations");
    } finally {
      setLocationsLoading(false);
    }
  };

  const handleConfirmClick = () => {
    setModalVisible(true);
    fetchLocations();
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleModalConfirm = async (values: any) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const payload = {
        auction_id: bid.originalData?.auction_id || bid.auctionId,
        request_id: bid.originalData?.request_id?.id || bid.originalData?.request_id,
        auction_won_id: bid.originalData?.id || bid.key,
        title_delivery_location: values.title_delivery_location,
        vehicle_delivery_location: values.vehicle_delivery_location,
      };

      await axios.post(`${apiUrl}/auctions/api/v1/buyer-confirmation/`, payload, { headers });
      
      showSuccessToast("Auction confirmed successfully!", "Confirmation");
      setModalVisible(false);
      onConfirm(values);
    } catch (error) {
      showErrorToast(error, "Confirmation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-8">
        <CheckCircleTwoTone twoToneColor="#bdbdbd" style={{ fontSize: 56, marginBottom: 16 }} />
        <h2 className="text-2xl font-bold mb-2">Congratulations! You won this bid!</h2>
        <p className="text-gray-500 mb-6 text-center max-w-xl">
          Kindly proceed with your confirmation and initiate the necessary payments. Your prompt action ensures a smooth and efficient process.
        </p>
        {isConfirmed ? (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded border border-green-200">
            <CheckCircleTwoTone twoToneColor="#22c55e" style={{ fontSize: 20 }} />
            <span className="font-semibold">Auction Confirmed</span>
          </div>
        ) : (
          <button 
            className="bg-blue-600 text-white px-8 py-2 rounded font-semibold text-lg hover:bg-blue-700 transition"
            onClick={handleConfirmClick}
          >
            Confirm Now
          </button>
        )}
      </div>

      <ConfirmationModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
        loading={loading}
        auctionData={bid}
        locations={locations}
      />
    </>
  );
}

function VehicleDetailsTab({ bid }: { bid: WonBid }) {
  const vehicleData = bid.originalData?.request_id;
  
  if (!vehicleData) {
    return <div className="text-center py-8 text-gray-500">No vehicle details available</div>;
  }

  const details = [
    { label: "Year", value: vehicleData.year },
    { label: "Make", value: vehicleData.make },
    { label: "Model", value: vehicleData.model },
    { label: "Trim", value: vehicleData.trim },
    { label: "Series", value: vehicleData.series },
    { label: "VIN", value: vehicleData.vin },
    { label: "Stock No", value: vehicleData.stock_no },
    { label: "Odometer", value: `${vehicleData.odometer} mi` },
    { label: "Cylinders", value: vehicleData.cylinders },
    { label: "Transmission", value: vehicleData.transmission },
    { label: "Drivetrain", value: vehicleData.drivetrain },
    { label: "Days on Lot", value: vehicleData.days_on_lot },
  ];

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {details.map((detail, index) => (
          <div key={index} className="bg-white p-3 rounded border">
            <label className="block text-sm font-medium text-gray-700 mb-1">{detail.label}</label>
            <p className="text-gray-900">{detail.value || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InspectionReportTab({ bid }: { bid: WonBid }) {
  const inspectionReports = bid.originalData?.inspection_reports || [];
  
  if (!inspectionReports.length) {
    return <div className="text-center py-8 text-gray-500">No inspection reports available</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Inspection Reports</h3>
      <div className="space-y-4">
        {inspectionReports.map((report: any, index: number) => (
          <Card key={index} title={`Report ${index + 1}`} className="mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report ID</label>
                <p className="text-gray-900">{report.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                <p className="text-gray-900">{new Date(report.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yellow Lights</label>
                <p className="text-gray-900">{report.yellow}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Red Lights</label>
                <p className="text-gray-900">{report.red}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- Main Page ---
export default function DsActiveBuyingWon() {
  const [wonBids, setWonBids] = useState<WonBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowKey, setExpandedRowKey] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.get(`${apiUrl}/auctions/api/v1/buying-won/`, { headers });
      
      const mapped = (response.data || []).map((item: any, idx: number) => {
        const req = item.request_id || {};
        const reservePrice = item.reserve_price || req.reserve_price || null;
        const status = req.status || 0;
        const statusLabel = STATUS_MAP[status] || 'Unknown';
        const wonPrice = item.last_bid_id?.bid || 0;
        
        return {
          key: item.id || idx,
          auctionId: item.auction_id,
          wonAt: item.won_at,
          expectedPrice: item.expected_price,
          wonPrice: wonPrice,
          reservePrice: reservePrice,
          vehicleInfo: req ? `${req.year || ''} ${req.make || ''} ${req.model || ''}`.trim() : 'N/A',
          vin: req.vin || 'N/A',
          stockNo: req.stock_no || 'N/A',
          odometer: req.odometer || 'N/A',
          originalData: item, // Store full original data
          status: status,
          statusLabel: statusLabel,
        };
      });
      
      setWonBids(mapped);
    } catch (error) {
      console.error('Failed to fetch won bids:', error);
      showErrorToast(error, "Won Bids");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmation = () => {
    // Refresh data after confirmation
    fetchData();
  };

  const columns = [
    {
      title: "Auction ID",
      dataIndex: "auctionId",
      key: "auctionId",
      render: (val: string) => <span className="font-mono text-sm">{val}</span>,
      width: 120,
    },
    {
      title: "Vehicle",
      dataIndex: "vehicleInfo",
      key: "vehicleInfo",
      render: (val: string) => <span className="font-medium">{val}</span>,
      width: 150,
    },
    {
      title: "VIN",
      dataIndex: "vin",
      key: "vin",
      render: (val: string) => <span className="font-mono text-sm">{val}</span>,
      width: 120,
    },
    {
      title: "Stock No",
      dataIndex: "stockNo",
      key: "stockNo",
      render: (val: string) => <span className="text-gray-600">{val}</span>,
      width: 100,
    },
    {
      title: "Odometer",
      dataIndex: "odometer",
      key: "odometer",
      render: (val: string) => <span className="text-gray-600">{val} mi</span>,
      width: 100,
    },
    {
      title: "Won At",
      dataIndex: "wonAt",
      key: "wonAt",
      render: (val: string) => {
        const date = new Date(val);
        return (
          <span className="text-sm font-medium">{date.toLocaleDateString()}</span>
        );
      },
      width: 120,
    },
    {
      title: "Expected Price",
      dataIndex: "expectedPrice",
      key: "expectedPrice",
      render: (val: number) => <span className="font-bold text-green-600">$ {val ? val.toLocaleString() : '-'}</span>,
      width: 120,
    },
    {
      title: "Won Price",
      dataIndex: "wonPrice",
      key: "wonPrice",
      render: (val: number) => <span className="font-bold text-blue-600">$ {val ? val.toLocaleString() : '-'}</span>,
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "statusLabel",
      key: "status",
      render: (statusLabel: string) => (
        <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[statusLabel] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
          {statusLabel}
        </span>
      ),
      width: 150,
    },
  ];

  const ExpandableRowContent = ({ record }: { record: WonBid }) => {
    const items = [
      {
        key: "confirmation",
        label: "Confirmation",
        children: <ConfirmationTab bid={record} onConfirm={handleConfirmation} />,
      },
      {
        key: "details",
        label: "Vehicle Details",
        children: <VehicleDetailsTab bid={record} />,
      },
      {
        key: "inspection",
        label: "Inspection Report",
        children: <InspectionReportTab bid={record} />,
      },
    ];

    return (
      <div className="p-6 bg-gray-50">
        <Tabs items={items} />
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Won Auctions</h1>
        <p className="text-gray-600">Manage your successfully won auction bids</p>
      </div>
      
      <DataTable 
        columns={columns} 
        data={wonBids} 
        loading={loading}
        expandable={{
          expandedRowRender: (record: WonBid) => <ExpandableRowContent record={record} />,
          expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
          onExpand: (expanded: boolean, record: WonBid) => {
            setExpandedRowKey(expanded ? record.key : null);
          },
        }}
      />
    </div>
  );
} 