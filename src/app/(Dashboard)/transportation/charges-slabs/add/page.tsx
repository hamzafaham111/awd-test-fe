"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Form, Input, Button, Select } from "antd";
import { useRouter } from "next/navigation";

export default function AddChargesSlabPage() {
  const [form] = Form.useForm();
  const router = useRouter();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Charges Slabs", href: "/transportation/charges-slabs" }, { label: "Add" }]} />
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-sky-700">Transportation Charges Slabs <span className="text-black font-normal">/ Add</span></h2>
          <Button type="primary" className="bg-sky-600 hover:bg-sky-700 rounded-md px-8 py-2" onClick={() => form.submit()}>Save</Button>
        </div>
        <Form
          form={form}
          layout="vertical"
          className="w-full"
          onFinish={values => { /* handle submit */ }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2 mb-6">
            <Form.Item label="Slab Name" name="slabName" className="mb-0" rules={[{ required: true }]}> <Input /> </Form.Item>
            <Form.Item label="Range Start" name="rangeStart" className="mb-0" rules={[{ required: true }]}> <Input addonAfter="miles" type="number" /> </Form.Item>
            <Form.Item label="Range End" name="rangeEnd" className="mb-0" rules={[{ required: true }]}> <Input addonAfter="miles" type="number" /> </Form.Item>
            <Form.Item label="Buyer Charges (miles)" name="buyerCharges" className="mb-0" rules={[{ required: true }]}> <Input addonBefore="$" type="number" /> </Form.Item>
            <Form.Item label="Transporter Charges (miles)" name="transporterCharges" className="mb-0" rules={[{ required: true }]}> <Input addonBefore="$" type="number" /> </Form.Item>
            <Form.Item label="Status" name="status" className="mb-0" rules={[{ required: true }]}> <Select options={[{ value: "Active" }, { value: "Inactive" }]} placeholder="Select..." /> </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
} 