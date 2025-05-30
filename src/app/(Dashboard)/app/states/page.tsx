"use client";

import { Table, Card, Button, Input, Space, Tag, Modal, Form, Select } from "antd";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const columns = [
  {
    title: "State Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    render: (code: string) => <Tag color="blue">{code}</Tag>,
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
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
    name: "California",
    code: "CA",
    country: "United States",
    status: "Active",
  },
  {
    key: "2",
    name: "New York",
    code: "NY",
    country: "United States",
    status: "Active",
  },
  {
    key: "3",
    name: "Ontario",
    code: "ON",
    country: "Canada",
    status: "Active",
  },
];

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
];

const tableData = {};

export default function StatesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddState = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "States", href: "/app/states" }]} />
      <div className="p-6">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">States Management</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddState}>
              Add New State
            </Button>
          </div>
          <div className="mb-4">
            <Input
              placeholder="Search states..."
              prefix={<SearchOutlined />}
              className="max-w-xs"
            />
          </div>
          <DataTable columns={columns} data={data} tableData={tableData} />

          <Modal
            title="Add New State"
            open={isModalOpen}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText="Save"
            cancelText="Cancel"
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="State Name"
                rules={[{ required: true, message: "Please enter state name" }]}
              >
                <Input placeholder="Enter state name" />
              </Form.Item>
              <Form.Item
                name="code"
                label="State Code"
                rules={[{ required: true, message: "Please enter state code" }]}
              >
                <Input placeholder="Enter state code" />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: "Please select country" }]}
              >
                <Select
                  placeholder="Select country"
                  options={countries}
                />
              </Form.Item>
              <Form.Item
                name="status"
                label="Status"
                initialValue="Active"
              >
                <Input placeholder="Enter status" />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </div>
  );
} 