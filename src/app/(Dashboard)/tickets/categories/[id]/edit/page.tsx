"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Form, Input, Button } from "antd";
import React, { useEffect } from "react";

export default function EditTicketCategoryPage() {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ name: "Request new location" });
  }, [form]);

  return (
    <div className="flex flex-col w-full bg-gray-50">
      <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "Categories", href: "/tickets/categories" }, { label: "Edit" }]} />
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col w-full">
        <div className="flex justify-end mb-4">
          <button className="bg-sky-600 text-white px-8 py-2 rounded-md" type="submit" form="edit-category-form">Update Category</button>
        </div>
        <Form
          id="edit-category-form"
          form={form}
          layout="vertical"
          onFinish={(values) => {
            // Handle save
          }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name' }]}> 
            <Input />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
} 