"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Button, Dropdown, Menu, Tag } from "antd";
import { EditOutlined, FileSearchOutlined, SettingOutlined, DownOutlined } from "@ant-design/icons";
import DataTable from "@/components/common/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AssignCarAttributesModal from "@/components/modals/AssignCarAttributesModal";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

  const openModal = (requestId: number) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequestId(null);
    setIsModalOpen(false);
  };

  const columns = [
    { title: "VIN", dataIndex: "vin", key: "vin" },
    { title: "Inspection Location", dataIndex: "location", key: "location" },
    { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
    { title: "Expected Price", dataIndex: "price", key: "price", render: (v: number) => `$${v}` },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Inspector Assigned" ? "blue" : "default"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        const baseMenuItems = [
          {
            key: "view",
            label: "View",
            icon: <EditOutlined />,
          },
          {
            key: "assign-car-attributes",
            label: "Assign Car Attributes",
            icon: <EditOutlined />,
          },
        ];

        const menuItems =
          record.status !== "Inspector Assigned"
            ? [
                ...baseMenuItems.slice(0, 1),
                {
                  key: "assign-inspector",
                  label: "Assign Inspector",
                  icon: <FileSearchOutlined />,
                },
                ...baseMenuItems.slice(1),
              ]
            : baseMenuItems;

        const handleMenuClick = (e: { key: string }) => {
          if (e.key === 'view') {
            router.push(`/inspection/requests/${record.key}`);
          }
          if (e.key === 'assign-inspector') {
            router.push(`/inspection/requests/${record.key}/assign-inspector`);
          }
          if (e.key === 'assign-car-attributes') {
            openModal(record.key);
          }
        };

        const menu = <Menu onClick={handleMenuClick} items={menuItems} />;

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              <span className="flex items-center gap-1">
                <SettingOutlined /> <DownOutlined />
              </span>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchInspectionRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(`${apiUrl}/inspections/api/v1/admin-requests/`, { headers });
        
        const transformedData = response.data.map((item: any) => ({
          key: item.id.toString(),
          vin: item.vin || "N/A",
          location: (
            <div>
              <b>{item.inspection_location?.title || "N/A"}</b><br />
              {item.inspection_location?.address || "N/A"}<br />
              {item.inspection_location?.phone || "N/A"}
            </div>
          ),
          vehicle: (
            <div>
              Year : {item.year || "N/A"}<br />
              Make : {item.make || "N/A"}<br />
              Model : {item.model || "N/A"}
            </div>
          ),
          price: item.expected_price || 0,
          status: item.inspector_assigned ? "Inspector Assigned" : "Pending",
        }));

        setData(transformedData);
      } catch (err: any) {
        setError(err?.response?.data?.detail || err?.message || "Failed to fetch inspection requests.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInspectionRequests();
  }, []);

  if (error) {
    return (
      <main>
        <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Requests" }]} />
        <div className="p-6">
          <Card>
            <div className="text-red-500 text-center py-8">{error}</div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Requests" }]} />
      <div className="p-6">
          <DataTable columns={columns} data={data} tableData={{}} loading={loading} />
      </div>
      <AssignCarAttributesModal
        isOpen={isModalOpen}
        onClose={closeModal}
        requestId={selectedRequestId}
      />
    </main>
  );
} 