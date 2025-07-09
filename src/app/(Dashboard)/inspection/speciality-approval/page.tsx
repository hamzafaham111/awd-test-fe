"use client";
import { useParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import axios from "axios";
import { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/errorHandler";
import { Button, Tag, Dropdown, Menu } from "antd";
import { CheckOutlined, DeleteOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons";
import ConfirmModal from "@/components/modals/ConfirmModal";

// Status code to label and color mapping
const STATUS_MAP: Record<number, { label: string; color: string }> = {
  0: { label: 'Pending', color: 'default' },
  1: { label: 'Waiting for speciality approval', color: 'gold' },
  2: { label: 'Inspector Assigned', color: 'blue' },
  3: { label: 'Inspection started', color: 'geekblue' },
  4: { label: 'Inspection Completed', color: 'green' },
  5: { label: 'On Auction', color: 'cyan' },
  6: { label: 'Waiting for buyer confirmation', color: 'purple' },
  7: { label: 'Payment pending', color: 'magenta' },
  8: { label: 'Delivered', color: 'lime' },
};

export default function SpecialityApprovalPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const router = useRouter();

  // Approve handler
  const handleApprove = async (task: any) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const expected_price = task.expected_price || "0";
      await axios.patch(
        `${apiUrl}/inspections/api/v1/speciality-vehicle/${task.id}/approve/`,
        { expected_price },
        { headers }
      );
      showSuccessToast("Vehicle marked as complete!", "Speciality Approval");
      // Optionally refresh the list here
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to approve vehicle.";
      showErrorToast(errorMsg, "Speciality Approval");
    }
  };

  // Delete handler
  const handleDelete = async (task: any) => {
    // TODO: Call your delete API here
    // Optionally refresh the list or show a toast
    // Example: showSuccessToast('Deleted!', 'Speciality Approval');
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${apiUrl}/inspections/api/v1/speciality-vehicle/requests/`, { headers });
        setTasks(res.data.results || res.data.data || (Array.isArray(res.data) ? res.data : []));
      } catch (err: any) {
        setError(err?.response?.data?.detail || err?.message || "Failed to fetch data.");
        showErrorToast(err, "Speciality Approval data");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div className="p-6">Loading data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!tasks.length) return <div className="p-6">No records found</div>;

  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Speciality Approval List", href: "/inspection/speciality-approval" }]} />
      <div className="bg-white rounded-xl shadow-md px-6 mb-8">
        {/* <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-gray-800 mb-1">Speciality Approval List</div>
        </div> */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => {
              const statusNum = typeof task.status === 'number' ? task.status : Number(task.status);
              const statusObj = STATUS_MAP[statusNum] || { label: task.status_label || task.status || 'N/A', color: 'default' };
              return (
                <tr key={task.id}>
                  <td className="px-4 py-2 whitespace-nowrap">{task.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{task.vehicle || task.vehicle_name || 'N/A'}</td>
                  <td className="px-4 py-2 whitespace-nowrap"><Tag color={statusObj.color}>{statusObj.label}</Tag></td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "approve",
                            icon: <CheckOutlined className="text-green-600" />,
                            label: (
                              <span
                                className="cursor-pointer hover:underline"
                                onClick={() => {
                                  setSelectedTask(task);
                                  setConfirmModalOpen(true);
                                }}
                              >
                                Approve
                              </span>
                            ),
                          },
                          {
                            key: "delete",
                            icon: <DeleteOutlined className="text-red-600" />,
                            label: (
                              <span
                                className="cursor-pointer hover:underline"
                                onClick={() => handleDelete(task)}
                              >
                                Delete
                              </span>
                            ),
                          },
                        ],
                      }}
                      trigger={["click"]}
                    >
                      <span className="inline-flex items-center gap-1 px-2 py-1 border rounded cursor-pointer hover:bg-gray-50">
                        <SettingOutlined className="text-blue-700" />
                        <DownOutlined className="text-blue-700" />
                      </span>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={confirmModalOpen}
        onOk={async () => {
          if (selectedTask) await handleApprove(selectedTask);
          setConfirmModalOpen(false);
          setSelectedTask(null);
        }}
        onCancel={() => {
          setConfirmModalOpen(false);
          setSelectedTask(null);
        }}
        title="Confirm Approval"
        content={
          <span>Are you sure you want to approve this vehicle for auction?</span>
        }
        okText="Yes, Approve"
        cancelText="Cancel"
      />
    </div>
  );
} 