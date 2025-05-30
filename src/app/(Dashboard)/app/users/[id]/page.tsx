"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { users } from "@/data/dummyUsers";
import { Button, Input, Select } from "antd";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function UserViewEditPage() {
  const { id } = useParams();
  const isAddMode = id === "add";
  const defaultUser = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    role: "Inspector",
    password: "",
    status: "Active",
  };
  const user = isAddMode ? null : users.find(u => String(u.key) === String(id));
  const [form, setForm] = useState(
    isAddMode
      ? defaultUser
      : { ...defaultUser, ...user }
  );

  if (!isAddMode && !user) return <div className="p-6">User not found</div>;

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = () => {
    if (isAddMode) {
      // Handle add new user
      console.log("Added user:", form);
    } else {
      // Handle update user
      console.log("Saved user:", form);
    }
    // In a real app, dispatch Redux or call API here
  };

  return (
    <div className="p-6 w-full">
      <Breadcrumbs items={[{ label: "Users", href: "/app/app/users" }, { label: isAddMode ? "Add New User" : "Edit" }]} />
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-semibold">First Name</label>
            <Input
              value={form?.name?.split(" ")[0] || ""}
              onChange={e => handleChange("name", e.target.value + " " + (form?.name?.split(" ")[1] || ""))}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Last Name</label>
            <Input
              value={form?.name?.split(" ")[1] || ""}
              onChange={e => handleChange("name", (form?.name?.split(" ")[0] || "") + " " + e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Personal Email Address</label>
            <Input
              value={form?.email}
              onChange={e => handleChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Mobile</label>
            <Input
              value={form?.mobile}
              onChange={e => handleChange("mobile", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">Address</label>
            <Input.TextArea
              value={form?.address || ""}
              onChange={e => handleChange("address", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Role</label>
            <Select
              value={form?.role}
              onChange={value => handleChange("role", value)}
              options={[
                { value: "Inspector", label: "Inspector" },
                { value: "Admin", label: "Admin" },
                { value: "Manager", label: "Manager" },
                { value: "Transporter", label: "Transporter" },
                { value: "Super admin", label: "Super admin" },
              ]}
              className="w-full"
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold">Email Address (Username)</label>
              <Input
                value={form?.email}
                onChange={e => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <Input.Password
                value={form?.password || ""}
                onChange={e => handleChange("password", e.target.value)}
                placeholder={isAddMode ? "Enter password" : "(Leave empty, if unchanged)"}
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Status</label>
          <Select
            value={form?.status}
            onChange={value => handleChange("status", value)}
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "In-Active" },
            ]}
            className="w-40"
          />
        </div>
        <div className="flex justify-end">
          <button className="bg-sky-600 text-white px-12 py-2 rounded-md" onClick={handleSave}>
            {isAddMode ? "Add User" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
} 