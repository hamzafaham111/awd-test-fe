"use client";

import { Card, Form, Input, Button, Upload, Select, Row, Col, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function MerchantProfilePage() {
  const role = useSelector((state: RootState) => state.user.role);
  if (role === "ds") return <div>Merchant Profile Page</div>;
  return (
    <div>
      <Breadcrumbs items={[{ label: "Merchant Profile", href: "/app/merchant" }]} />
      <div className="p-6">
        <Card>
          <h1 className="text-2xl font-semibold mb-6">Merchant Profile</h1>
          
          <Form layout="vertical">
            {/* Company Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Company Information</h2>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Company Name" name="companyName" rules={[{ required: true }]}>
                    <Input placeholder="Enter company name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Business Type" name="businessType" rules={[{ required: true }]}>
                    <Select
                      options={[
                        { value: "franchise", label: "Franchise" },
                        { value: "independent", label: "Independent" },
                        { value: "wholesale", label: "Wholesale" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Company Description" name="description">
                <Input.TextArea rows={4} placeholder="Enter company description" />
              </Form.Item>
            </div>

            <Divider />

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Contact Information</h2>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Contact Person" name="contactPerson" rules={[{ required: true }]}>
                    <Input placeholder="Enter contact person name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                    <Input placeholder="Enter email address" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Website" name="website">
                    <Input placeholder="Enter website URL" />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Divider />

            {/* Address Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Address Information</h2>
              <Form.Item label="Street Address" name="street" rules={[{ required: true }]}>
                <Input placeholder="Enter street address" />
              </Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="City" name="city" rules={[{ required: true }]}>
                    <Input placeholder="Enter city" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="State" name="state" rules={[{ required: true }]}>
                    <Input placeholder="Enter state" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="ZIP Code" name="zip" rules={[{ required: true }]}>
                    <Input placeholder="Enter ZIP code" />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Divider />

            {/* Documents */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Documents</h2>
              <Form.Item label="Business License" name="businessLicense">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload Business License</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Tax Certificate" name="taxCertificate">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload Tax Certificate</Button>
                </Upload>
              </Form.Item>
            </div>

            {/* Save Button */}
            <Form.Item>
              <Button type="primary" size="large">
                Save Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
} 