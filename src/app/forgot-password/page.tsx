"use client";

import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { AuthLayout } from "@/components/layout/AuthLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { email: string }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Password reset link sent to your email.");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-poppins">
      {/* Background overlay and car image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/car-bg.jpg" // Make sure this image exists in your public folder
          alt="Car background"
          layout="fill"
          objectFit="cover"
          className="pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-sky-900 bg-opacity-60" />
      </div>
      {/* Centered Card */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full flex flex-col items-center">
          <Image src="/awd-logo.png" alt="AWD Auctions" width={160} height={60} className="mb-4" />
          <h2 className="text-2xl font-bold text-sky-600 mb-1 text-center">Password reset</h2>
          <p className="text-gray-500 text-base mb-8 text-center">Enter your registered email and we will send you password reset link.</p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              className="mb-8"
            >
              <Input size="large" placeholder="Email" className="font-poppins" />
            </Form.Item>
            <div className="flex justify-between items-center w-full gap-4 mt-2">
              <Button
                type="default"
                className="px-8 py-2 h-11 rounded-lg font-[600] bg-white text-black border-0 shadow-none hover:bg-gray-100"
                onClick={() => router.back()}
                block
              >
                Go Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="px-8 py-2 h-11 bg-sky-600 hover:bg-sky-700 rounded-lg font-[600] text-white border-0"
                loading={loading}
                block
              >
                Reset now
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
} 