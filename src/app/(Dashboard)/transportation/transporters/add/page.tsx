"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Form, Button, Row, Col, Select, Upload, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function AddTransporterPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Transporters", href: "/transportation/transporters" }, { label: "Add" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-end items-center mb-6">
          {/* <span className="text-2xl font-bold text-sky-700">Transporter <span className="text-black font-normal">/ Add</span></span> */}
          <div className="flex gap-2">
            <button className="bg-sky-600 text-white px-4 py-2 rounded-md" type="button">Create Password</button>
            <button className="bg-sky-600 text-white px-4 py-2 rounded-md" type="submit">Save</button>
          </div>
        </div>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item label="Business Name" name="businessName"><Input /></Form.Item>
              <Form.Item label="Street Name" name="streetName"><Input /></Form.Item>
              <Form.Item label="City" name="city"><Input /></Form.Item>
              <Form.Item label="State" name="state"><Select><Select.Option value="AZ">AZ</Select.Option></Select></Form.Item>
              <Form.Item label="Zipcode" name="zipcode"><Input /></Form.Item>
              <Form.Item label="Website" name="website"><Input /></Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="First Name" name="firstName"><Input /></Form.Item>
              <Form.Item label="Last Name" name="lastName"><Input /></Form.Item>
              <Form.Item label="Email" name="email"><Input /></Form.Item>
              <Form.Item label="Phone Number" name="phoneNumber"><Input /></Form.Item>
              <Form.Item label="Ext" name="ext"><Input /></Form.Item>
              <Form.Item label="Cell Phone Number" name="cellPhoneNumber"><Input /></Form.Item>
              <Form.Item label="Approved" name="approved"><Select><Select.Option value="Approved">Approved</Select.Option><Select.Option value="Pending">Pending</Select.Option></Select></Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className="mt-4">
            <Col xs={24} md={6}>
              <Form.Item label="Commercial Driver License (CDL)" name="cdl">
                <Upload.Dragger className="min-h-[140px]">
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Drag File</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Business License" name="businessLicense">
                <Upload.Dragger className="min-h-[140px]">
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Drag File</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Proof of Insurance" name="proofOfInsurance">
                <Upload.Dragger className="min-h-[140px]">
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Drag File</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Motor Carrier (MC)" name="mc">
                <Upload.Dragger className="min-h-[140px]">
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Drag File</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
} 