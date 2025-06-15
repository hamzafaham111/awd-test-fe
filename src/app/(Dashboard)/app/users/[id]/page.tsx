"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { users } from "@/data/dummyUsers";
import { Button, Input, Select } from "antd";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import axios from "axios";
import { showToast } from "@/components/common/Toaster";

export default function UserViewEditPage() {
  const { id } = useParams();
  const isAddMode = id === "add";
  const defaultUser = {
    email: "",
    first_name: "",
    last_name: "",
    personal_email: "",
    mobile_no: "",
    address: "",
    role_name: "ADMIN",
    password: "",
    status: "1",
  };
  const [userValues, setUserValues] = useState(
    isAddMode
      ? defaultUser
      : { ...defaultUser }
  );
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!isAddMode);
  const [fetchError, setFetchError] = useState<string | null>(null);

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
          setUserValues({ ...defaultUser, ...res.data });
        } catch (err: any) {
          setFetchError(err?.response?.data?.detail || err?.message || "Failed to fetch user data.");
        } finally {
          setFetching(false);
        }
      };
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAddMode]);

  if (!isAddMode && fetching) return <div className="p-6">Loading user data...</div>;
  if (!isAddMode && fetchError) return <div className="p-6 text-red-500">{fetchError}</div>;

  const handleChange = (field: string, value: string) => {
    setUserValues({ ...userValues, [field]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Prepare payload for JSON
    const payload = { ...userValues };
    if (!userValues.password) {
      delete (payload as any).password;
    }
    const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    try {
      if (isAddMode) {
        await axios.post(`${apiUrl}/users/api/v1/admin/add-user/`, payload, {
          headers,
        });
        showToast({ type: "success", message: "User added successfully!" });
      } else {
        await axios.patch(`${apiUrl}/users/api/v1/admin/user/${id}/`, payload, {
          headers,
        });
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
      onSaveButtonClick={handleSave}
      />
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-semibold">First Name</label>
            <Input
              value={userValues.first_name}
              onChange={e => handleChange("first_name", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Last Name</label>
            <Input
              value={userValues.last_name}
              onChange={e => handleChange("last_name", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <Input
              value={userValues.email}
              onChange={e => handleChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Personal Email</label>
            <Input
              value={userValues.personal_email}
              onChange={e => handleChange("personal_email", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Mobile No</label>
            <Input
              value={userValues.mobile_no}
              onChange={e => handleChange("mobile_no", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold">Address</label>
            <Input.TextArea
              value={userValues.address}
              onChange={e => handleChange("address", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Role</label>
            <Select
              value={userValues.role_name}
              onChange={value => handleChange("role_name", value)}
              options={[
                { value: "ADMIN", label: "Admin" },
                { value: "INSPECTOR", label: "Inspector" },
                { value: "MANAGER", label: "Manager" },
                { value: "TRANSPORTER", label: "Transporter" },
                { value: "SUPER_ADMIN", label: "Super Admin" },
              ]}
              className="w-full"
              disabled={!isAddMode}
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold">Email (Username)</label>
              <Input
                value={userValues.email}
                onChange={e => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <Input.Password
                value={userValues.password}
                onChange={e => handleChange("password", e.target.value)}
                placeholder={isAddMode ? "Enter password" : "(Leave empty, if unchanged)"}
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Status</label>
          <Select
            value={userValues.status}
            onChange={value => handleChange("status", value)}
            options={[
              { value: "1", label: "Active" },
              { value: "0", label: "In-Active" },
            ]}
            className="w-40"
          />
        </div>
        {/* <div className="flex justify-end">
          <button className="bg-sky-600 text-white px-12 py-2 rounded-md" onClick={handleSave} disabled={loading}>
            {loading ? (isAddMode ? "Adding..." : "Saving...") : (isAddMode ? "Add User" : "Save")}
          </button>
        </div> */}
      </div>
    </div>
  );
} 