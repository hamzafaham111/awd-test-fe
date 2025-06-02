"use client";

import { useState } from "react";
import { Input, Select, Button, Card, message } from "antd";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function AddRolePage() {
  const [form, setForm] = useState({
    name: "",
    type: "Fixed",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Role added successfully!");
      // In a real app, redirect or update state here
    }, 1000);
  };

  return (
    <div className="p-6 w-full">
      <Breadcrumbs items={[{ label: "Roles", href: "/app/roles" }, { label: "Add New Role" }]} />
      <Card className="mx-auto mt-6">
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
          <button onClick={handleSave} className="px-8 text-white py-2 bg-sky-600 hover:bg-sky-700 rounded-md">
            Save
            {loading && <span className="ml-2">Saving...</span>}
          </button>
        </div>
      </Card>
    </div>
  );
} 