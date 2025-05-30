"use client"

import { useState } from "react"
import { Form, Button, Checkbox, message } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { Logo } from "@/components/common/Logo"
import { FormField } from "@/components/common/FormField"
import Image from "next/image"
interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [form] = Form.useForm()

  async function onSubmit(values: LoginForm) {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(values)
      message.success("Login successful!")
      // In a real app, you would authenticate here
      // router.push("/dashboard")
    } catch (error) {
      message.error("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center px-4 sm:px-6">
        <Image src="/awd-logo.png" alt="Logo" className="my-4" width={200} height={100} />
        <h1 className="text-xl sm:text-2xl font-bold text-sky-600">Sign in to your Account</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Enter your details to proceed further</p>
      </div>
      <div className="px-4 sm:px-6 my-8">
        <Form
          form={form}
          name="login"
          onFinish={onSubmit}
          layout="vertical"
          requiredMark={false}
          className="space-y-4 sm:space-y-5"
        >
          <FormField
            name="email"
            type="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" }
            ]}
            prefix={<UserOutlined />}
            placeholder="Email"
            disabled={isLoading}
          />

          <FormField
            name="password"
            type="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" }
            ]}
            prefix={<LockOutlined />}
            placeholder="Password"
            disabled={isLoading}
          />

          <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full space-y-3 sm:space-y-0">
            <Form.Item name="rememberMe" valuePropName="checked" className="mb-0 flex-1">
              <Checkbox disabled={isLoading}>Remember for logged in</Checkbox>
            </Form.Item>
            <Link href="/forgot-password" className="text-sky-600 hover:underline font-medium">
              Forgot Password
            </Link>
          </div>

          <Form.Item className="mb-0 text-center">
            <button
              className="px-12 rounded-lg text-white bg-sky-600 hover:bg-sky-700 p-3"
            >
              {isLoading ? "Signing in..." : "Log in"}
            </button>
          </Form.Item>
        </Form>

        <div className="mt-5 sm:mt-6 text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/registration" className="text-sky-600 hover:underline font-medium">
              sign up for free
            </Link>
          </p>
        </div>
        <div className="text-center text-xs text-gray-500 flex items-center justify-center">
          <p className="text-[10px]">Download Our Free App To Transact-On-The-Go!</p>
          <Image src="/images/download-app.png" alt="Logo" className="my-4" width={250} height={150} />
        </div>
      </div>
    </AuthLayout>
  )
} 