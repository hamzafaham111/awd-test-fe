"use client";

import { Card, Form, Input, Button, Select, InputNumber, Switch, Space, Table, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const { Option } = Select;

const feeTypes = [
  { value: "percentage", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
];

const feeCategories = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "vip", label: "VIP" },
];

const columns = [
  {
    title: "Fee Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => (
      <Tag color={type === "percentage" ? "blue" : "green"}>
        {type === "percentage" ? "Percentage" : "Fixed Amount"}
      </Tag>
    ),
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    render: (value: number, record: any) => (
      <span>{record.type === "percentage" ? `${value}%` : `$${value}`}</span>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) => (
      <Tag color={status ? "green" : "red"}>
        {status ? "Active" : "Inactive"}
      </Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space>
        <Button type="link" icon={<EditOutlined />}>Edit</Button>
        <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "Standard Buyer Fee",
    type: "percentage",
    value: 2.5,
    category: "Standard",
    status: true,
  },
  {
    key: "2",
    name: "Premium Buyer Fee",
    type: "fixed",
    value: 100,
    category: "Premium",
    status: true,
  },
  {
    key: "3",
    name: "VIP Buyer Fee",
    type: "percentage",
    value: 1.5,
    category: "VIP",
    status: true,
  },
];

const tableData = {};

export default function BuyerFeePage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "Buyer Fee", href: "/app/buyer-fee" }]} />
      <div className="p-6">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Buyer Fee Management</h1>
            <Button type="primary" icon={<PlusOutlined />}>
              Add New Fee
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fee Configuration Form */}
            <Card title="Fee Configuration">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  label="Fee Name"
                  rules={[{ required: true, message: "Please enter fee name" }]}
                >
                  <Input placeholder="Enter fee name" />
                </Form.Item>

                <Form.Item
                  name="type"
                  label="Fee Type"
                  rules={[{ required: true, message: "Please select fee type" }]}
                >
                  <Select placeholder="Select fee type">
                    {feeTypes.map(type => (
                      <Option key={type.value} value={type.value}>{type.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="value"
                  label="Fee Value"
                  rules={[{ required: true, message: "Please enter fee value" }]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter fee value"
                    min={0}
                    precision={2}
                  />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true, message: "Please select category" }]}
                >
                  <Select placeholder="Select category">
                    {feeCategories.map(category => (
                      <Option key={category.value} value={category.value}>{category.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="status"
                  label="Status"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Configuration
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            {/* Fee List */}
            <Card title="Current Fees">
              <DataTable columns={columns} data={data} tableData={tableData} />
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
} 