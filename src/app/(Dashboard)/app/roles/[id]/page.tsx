"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Input, Select, Button, Card, message } from "antd";
import Breadcrumbs from "@/components/common/Breadcrumbs";

// Dummy roles data for demonstration
const roles = [
  { key: 1, name: "Super admin", type: "Fixed", status: "Active" },
  { key: 2, name: "Admin", type: "Fixed", status: "Active" },
  { key: 3, name: "Manager", type: "Fixed", status: "Active" },
  { key: 4, name: "Inspector", type: "Fixed", status: "Inactive" },
  { key: 5, name: "Transporter", type: "Fixed", status: "Inactive" },
  { key: 7, name: "Data Analyser", type: "Fixed", status: "Active" },
];

type RoleForm = {
  key?: number;
  name: string;
  type: string;
  status: string;
};

const defaultRole: RoleForm = {
  name: "",
  type: "Fixed",
  status: "Active",
};

export default function EditViewRolePage() {
  const { id } = useParams();
  const role = roles.find(r => String(r.key) === String(id));
  const [form, setForm] = useState<RoleForm>(role ? { ...role } : defaultRole);
  const [loading, setLoading] = useState(false);

  if (!role) return <div className="p-6">Role not found</div>;

  const handleChange = (field: keyof RoleForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Role updated successfully!");
      // In a real app, update state or redirect here
    }, 1000);
  };

  return (
    <div className="p-6 w-full">
      <Breadcrumbs items={[{ label: "Roles", href: "/app/roles" }, { label: "Edit Role" }]} />
      <Card className="max-w-2xl mx-auto mt-6">
        <h2 className="text-xl font-bold mb-6">Edit Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-semibold">Role Name</label>
            <Input
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              placeholder="Enter role name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Type</label>
            <Select
              value={form.type}
              onChange={value => handleChange("type", value)}
              options={[
                { value: "Fixed", label: "Fixed" },
                { value: "Flexible", label: "Flexible" },
              ]}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Status</label>
            <Select
              value={form.status}
              onChange={value => handleChange("status", value)}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="primary" loading={loading} onClick={handleSave} className="px-8 py-2 bg-sky-600 hover:bg-sky-700 rounded-md">
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
} 