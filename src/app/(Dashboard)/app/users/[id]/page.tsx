"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FormField } from "@/components/common/FormField";
import axios from "axios";
import { showToast } from "@/components/common/Toaster";

export default function UserViewEditPage() {
  const { id } = useParams();
  const isAddMode = id === "add";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!isAddMode);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const currentUserRole = useSelector((state: RootState) => state.user.role);

  useEffect(() => {
    if (!isAddMode && id) {
      const fetchUser = async () => {
        setFetching(true);
        setFetchError(null);
        try {
          const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const res = await axios.get(`${apiUrl}/users/api/v1/admin/user/${id}/`, { headers });
          const userData = res.data;
          if (userData.status !== undefined) {
            userData.status = String(userData.status);
          }
          if (userData.role) {
            userData.role_name = userData.role.name;
          }
          form.setFieldsValue(userData);
        } catch (err: any) {
          setFetchError(err?.response?.data?.detail || err?.message || "Failed to fetch user data.");
        } finally {
          setFetching(false);
        }
      };
      fetchUser();
    }
  }, [id, isAddMode, form]);

  if (!isAddMode && fetching) return <div className="p-6">Loading user data...</div>;
  if (!isAddMode && fetchError) return <div className="p-6 text-red-500">{fetchError}</div>;

  const handleSave = async (values: any) => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const payload = { ...values };
    if (payload.role_name) {
      payload.role = payload.role_name;
      delete payload.role_name;
    }
    if (!payload.password) {
      delete payload.password;
    }
    const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    try {
      if (isAddMode) {
        await axios.post(`${apiUrl}/users/api/v1/admin/add-user/`, payload, { headers });
        showToast({ type: "success", message: "User added successfully!" });
      } else {
        await axios.patch(`${apiUrl}/users/api/v1/admin/user/${id}/`, payload, { headers });
        showToast({ type: "success", message: "User updated successfully!" });
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.detail || error?.message || "Something went wrong.";
      showToast({ type: "error", message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <Breadcrumbs 
        items={[{ label: "Users", href: "/app/app/users" }, { label: isAddMode ? "Add New User" : "Edit" }]} 
        showSaveButton={true}
        saveButtonLabel={isAddMode ? "Add User" : "Save Changes"}
        onSaveButtonClick={() => form.submit()}
      />
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormField
              name="first_name"
              label="First Name"
              type="text"
              required
              rules={[{ required: true, message: "First name is required" }]}
            />
            <FormField
              name="last_name"
              label="Last Name"
              type="text"
              required
              rules={[{ required: true, message: "Last name is required" }]}
            />
            <FormField
              name="personal_email"
              label="Personal Email"
              type="email"
            />
            <FormField
              name="mobile_no"
              label="Mobile No"
              type="text"
            />
            <FormField
              name="address"
              label="Address"
              type="text"
            />
            <FormField
              name="role_name"
              label="Role"
              type="select"
              options={[
                { value: "ADMIN", label: "Admin" },
                { value: "INSPECTOR", label: "Inspector" },
                { value: "MANAGER", label: "Manager" },
                { value: "TRANSPORTER", label: "Transporter" },
                { value: "SUPER_ADMIN", label: "Super Admin" },
              ]}
              required
              rules={[{ required: true, message: "Role is required" }]}
              disabled={!isAddMode && currentUserRole !== 'superadmin'}
            />
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="email"
                label="Email (Username)"
                type="email"
                required
                rules={[{ required: true, message: "Email is required" }]}
              />
              <FormField
                name="password"
                label="Password"
                type="password"
                required={isAddMode}
                rules={isAddMode ? [{ required: true, message: "Password is required" }] : []}
                placeholder={isAddMode ? "Enter password" : "(Leave empty, if unchanged)"}
              />
            </div>
          </div>
          <div className="mb-6">
            <FormField
              name="status"
              label="Status"
              type="select"
              options={[
                { value: "1", label: "Active" },
                { value: "0", label: "In-Active" },
              ]}
            />
          </div>
        </Form>
      </div>
    </div>
  );
} 