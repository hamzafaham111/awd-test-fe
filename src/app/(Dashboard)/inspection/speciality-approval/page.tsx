"use client";
import { useParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import axios from "axios";
import { useState, useEffect } from "react";
import { showErrorToast } from "@/utils/errorHandler";
import { Button, Tag } from "antd";

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
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${apiUrl}/inspections/api/v1/inspector-task/`, { headers });
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
      <Breadcrumbs items={[{ label: "Speciality Approval", href: "/inspection/speciality-approval" }]} />
      <div className="bg-white rounded-xl shadow-md px-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-gray-800 mb-1">Speciality Approval List</div>
        </div>
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
                    <Button type="link" onClick={() => router.push(`/inspection/speciality-approval/${task.id}`)}>View Details</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 