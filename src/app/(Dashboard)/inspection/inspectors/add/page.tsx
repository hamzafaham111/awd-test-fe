"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, Form, Input, Button, DatePicker, Select, Checkbox, TimePicker } from "antd";

const { Option } = Select;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AddInspectorPage() {
  const [form] = Form.useForm();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Inspectors", href: "/inspection/inspectors" }, { label: "Add" }]} />
      <div className="p-6">
        <Card>
          <Form
            form={form}
            layout="vertical"
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
              <Form.Item label="First Name" name="firstName" className="mb-0">
                <Input />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" className="mb-0">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" className="mb-0">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Date Of Birth" name="dob" className="mb-0">
                <DatePicker className="w-full" format="MM/DD/YYYY" />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone" className="mb-0">
                <Input />
              </Form.Item>
              <Form.Item label="Whatsapp Number" name="whatsapp" className="mb-0">
                <Input />
              </Form.Item>
              <Form.Item label="State" name="state" className="mb-0">
                <Select placeholder="Select...">
                  <Option value="Alaska">Alaska</Option>
                  <Option value="Alabama">Alabama</Option>
                  <Option value="Arizona">Arizona</Option>
                  <Option value="Illinois">Illinois</Option>
                  <Option value="Florida">Florida</Option>
                  <Option value="Tennessee">Tennessee</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Password" name="password" className="mb-0">
                <Input.Password />
                <div className="text-xs text-gray-500">(Leave empty, if unchanged)</div>
              </Form.Item>
              <Form.Item label="Working Hours" name="workingHours" className="mb-0 md:col-span-2">
                <Input disabled value="" />
              </Form.Item>
              <Form.Item label="Shift Start" name="shiftStart" className="mb-0">
                <TimePicker use12Hours format="h:mm A" className="w-full" />
              </Form.Item>
              <Form.Item label="Shift End" name="shiftEnd" className="mb-0">
                <TimePicker use12Hours format="h:mm A" className="w-full" />
              </Form.Item>
              <Form.Item label="Days" name="days" className="mb-0 md:col-span-2">
                <Checkbox.Group>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {daysOfWeek.map(day => (
                      <Checkbox key={day} value={day}>{day}</Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </div>
            <div className="flex justify-end mt-10">
              <Button type="primary" htmlType="submit" className="bg-sky-600 hover:bg-sky-700 rounded-md px-8 py-2">
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
} 