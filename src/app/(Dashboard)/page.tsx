"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SuperAdminInspectorDashboard from "@/components/dashboard/SuperAdminInspectorDashboard";
import DsDashboard from "@/components/dashboard/DsDashboard";

export default function DashboardPage() {
  const role = useSelector((state: RootState) => state.user.role);

  if (role === "ds") {
    return <DsDashboard />;
  }
  return <SuperAdminInspectorDashboard />;
} 