"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Form, Input, Button, Select } from "antd";
import React, { useState } from "react";

export default function EditTicketStatusPage() {
  const [form] = Form.useForm();
  const [color, setColor] = useState("#000000");

  React.useEffect(() => {
    form.setFieldsValue({
      name: "Resolved",
      color: "#000000",
      type: "All",
      typeChange: "No"
    });
    setColor("#000000");
  }, [form]);

  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "Statuses", href: "/tickets/statuses" }, { label: "Edit" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <Form
          form={form}
          layout="vertical"
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
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
            <Select options={[{ value: "No", label: "No" }]} />
          </Form.Item>
        </Form>
        <div className=" flex justify-end">
            <button className="bg-sky-600 text-white px-8 py-2 rounded-md" type="submit">Add Status</button>
          </div>
      </div>
    </div>
  );
} 