"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Form, Input, Button, Select } from "antd";
import React, { useState } from "react";

export default function AddTicketStatusPage() {
  const [form] = Form.useForm();
  const [color, setColor] = useState("#000000");

  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "Statuses", href: "/tickets/statuses" }, { label: "Add" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <Form
          form={form}
          layout="vertical"
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          initialValues={{ color: "#000000", type: "All", typeChange: "Select..." }}
          onFinish={(values) => {
            // Handle save
          }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 60, height: 32, padding: 0, border: 'none', background: 'none' }} />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select options={[{ value: "All", label: "All" }]} />
          </Form.Item>
          <Form.Item label="Type can be change" name="typeChange">
            <Select options={[{ value: "Select...", label: "Select..." }]} />
          </Form.Item>
        </Form>
        <div className=" flex justify-end">
            <button className="bg-sky-600 text-white px-8 py-2 rounded-md" type="submit">Update Status</button>
          </div>
      </div>
    </div>
  );
} 