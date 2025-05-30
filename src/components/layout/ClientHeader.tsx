"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Header from "./Header";
import { navItemsByRole } from "@/data/navItems";

export default function ClientHeader() {
  const role = useSelector((state: RootState) => state.user.role);
  const navItems = navItemsByRole[role] || [];
  const roleLabel = role === "inspector" ? "Inspector" : role === "ds" ? "D/S" : "Super Admin";
  const dsMode = role === "ds";
  return <Header navItems={navItems} roleLabel={roleLabel} dsMode={dsMode} />;
} 