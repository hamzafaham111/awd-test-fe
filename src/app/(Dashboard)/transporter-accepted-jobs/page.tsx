"use client";
import { Card, Table, Button, Tag, Space, Image, Progress } from "antd";
import { EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useState, useEffect } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/utils/errorHandler";

const columns = [
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
    render: (vehicle: any, record: any) => (
      <div className="flex items-center space-x-3">
        <Image
          src={record.image || "/images/car1.jpg"}
          alt="vehicle"
          width={60}
          height={40}
          className="rounded"
        />
        <div>
          <div className="font-semibold">{vehicle}</div>
          <div className="text-sm text-gray-600">VIN: {record.vin}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Pickup Location",
    dataIndex: "pickup",
    key: "pickup",
    render: (pickup: any) => (
      <div>
        <div className="font-semibold">{pickup.name}</div>
        <div className="text-sm text-gray-600">{pickup.address}</div>
      </div>
    ),
  },
  {
    title: "Dropoff Location",
    dataIndex: "dropoff",
    key: "dropoff",
    render: (dropoff: any) => (
      <div>
        <div className="font-semibold">{dropoff.name}</div>
        <div className="text-sm text-gray-600">{dropoff.address}</div>
      </div>
    ),
  },
  {
    title: "Progress",
    dataIndex: "progress",
    key: "progress",
    render: (progress: number) => (
      <div className="w-32">
        <Progress percent={progress} size="small" />
        <div className="text-xs text-gray-600 mt-1">{progress}% Complete</div>
      </div>
    ),
  },
  {
    title: "Transport Fee",
    dataIndex: "transportFee",
    key: "transportFee",
    render: (fee: number) => (
      <div className="text-center">
        <div className="font-bold text-green-600">${fee}</div>
      </div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color="green">{status}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <Space>
        <Button type="primary" icon={<EyeOutlined />} size="small">
          View Details
        </Button>
        <Button type="default" size="small">
          Update Status
        </Button>
      </Space>
    ),
  },
];

export default function TransporterAcceptedJobsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAcceptedJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.get(`${apiUrl}/transportation/api/v1/accepted-jobs/`, { headers });
      
      // Map API response to match the existing data structure
      const mappedData = (response.data || []).map((item: any, index: number) => {
        return {
          key: item.id || index + 1,
          vehicle: item.vehicle || item.vehicle_name || `${item.year || ''} ${item.make || ''} ${item.model || ''}`.trim() || 'Vehicle',
          vin: item.vin ? item.vin.slice(-6) : item.vin || '-',
          image: item.image || item.vehicle_image || "/images/car1.jpg",
          pickup: {
            name: item.pickup_location?.name || item.pickup_name || "Pickup Location",
            address: item.pickup_location?.address || item.pickup_address || "Address not available",
          },
          dropoff: {
            name: item.dropoff_location?.name || item.dropoff_name || "Dropoff Location", 
            address: item.dropoff_location?.address || item.dropoff_address || "Address not available",
          },
          progress: item.progress || item.completion_percentage || 0,
          transportFee: item.transport_fee || item.fee || 0,
          status: item.status || "In Progress",
          originalData: item, // Keep original data for actions
        };
      });
      
      setData(mappedData);
      showSuccessToast("Accepted jobs loaded successfully!", "Jobs");
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || "Failed to fetch accepted jobs.");
      showErrorToast(err, "Accepted jobs");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcceptedJobs();
  }, []);

  if (loading) {
    return (
      <div>
        <Breadcrumbs 
          items={[
            { label: "Dashboard", href: "/" },
            { label: "Accepted Jobs" }
          ]} 
        />
        <Card className="mt-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading accepted jobs...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Breadcrumbs 
          items={[
            { label: "Dashboard", href: "/" },
            { label: "Accepted Jobs" }
          ]} 
        />
        <Card className="mt-6">
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button type="primary" onClick={fetchAcceptedJobs}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs 
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Accepted Jobs" }
        ]} 
      />
      <Card className="mt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Accepted Jobs</h1>
            <p className="text-gray-600">Manage your active transportation jobs</p>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleOutlined className="text-green-600 text-xl" />
            <span className="text-lg font-semibold">{data.length} Active Jobs</span>
          </div>
        </div>
        
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          className="custom-table"
        />
      </Card>
    </div>
  );
}
