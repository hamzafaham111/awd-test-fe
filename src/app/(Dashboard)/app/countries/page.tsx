"use client";

import { Table, Card, Button, Input, Space, Tag, Modal, Form } from "antd";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const columns = [
  {
    title: "Country Name",
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
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
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
    name: "United States",
    code: "US",
    currency: "USD",
    status: "Active",
  },
  {
    key: "2",
    name: "Canada",
    code: "CA",
    currency: "CAD",
    status: "Active",
  },
  {
    key: "3",
    name: "United Kingdom",
    code: "GB",
    currency: "GBP",
    status: "Active",
  },
];

const tableData = {};

export default function CountriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddCountry = () => {
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
      <Breadcrumbs items={[{ label: "Countries", href: "/app/countries" }]} />
      <div className="p-6">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Countries</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCountry}>
              Add New Country
            </Button>
          </div>
          <div className="mb-4">
            <Input
              placeholder="Search countries..."
              prefix={<SearchOutlined />}
              className="max-w-xs"
            />
          </div>
          <DataTable columns={columns} data={data} tableData={tableData} />

          <Modal
            title="Add New Country"
            open={isModalOpen}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText="Save"
            cancelText="Cancel"
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Country Name"
                rules={[{ required: true, message: "Please enter country name" }]}
              >
                <Input placeholder="Enter country name" />
              </Form.Item>
              <Form.Item
                name="code"
                label="Country Code"
                rules={[{ required: true, message: "Please enter country code" }]}
              >
                <Input placeholder="Enter country code" />
              </Form.Item>
              <Form.Item
                name="currency"
                label="Currency"
                rules={[{ required: true, message: "Please enter currency" }]}
              >
                <Input placeholder="Enter currency" />
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