import { Form, Input, Select, Radio, Upload, Button } from "antd"
import { PaperClipOutlined } from "@ant-design/icons"
import type { FormItemProps } from "antd"
import type { UploadFile } from "antd/es/upload/interface"
import { ReactNode } from "react"

interface FormFieldProps extends Omit<FormItemProps, "children"> {
  type?: "text" | "password" | "email" | "select" | "radio" | "upload"
  options?: { label: string; value: string }[]
  uploadProps?: {
    maxCount?: number
    listType?: "text" | "picture" | "picture-card"
  }
  prefix?: ReactNode
  placeholder?: string
  disabled?: boolean
  inputClassName?: string
  labelClassName?: string
}

export function FormField({
  type = "text",
  options = [],
  uploadProps = { maxCount: 1, listType: "picture" },
  prefix,
  placeholder,
  disabled,
  inputClassName = "",
  labelClassName = "",
  label,
  required,
  ...props
}: FormFieldProps) {
  const renderField = () => {
    switch (type) {
      case "password":
        return <Input.Password size="large" prefix={prefix} placeholder={placeholder} disabled={disabled} className={inputClassName} />
      case "email":
        return <Input type="email" size="large" prefix={prefix} placeholder={placeholder} disabled={disabled} className={inputClassName} />
      case "select":
        return (
          <Select size="large" placeholder={placeholder} disabled={disabled} className={inputClassName}>
            {options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )
      case "radio":
        return (
          <Radio.Group className={`space-y-4 ${inputClassName}`} disabled={disabled}>
            {options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        )
      case "upload":
        return (
          <Upload
            listType={uploadProps.listType}
            maxCount={uploadProps.maxCount}
            beforeUpload={() => false}
            disabled={disabled}
          >
            <Button icon={<PaperClipOutlined />} disabled={disabled}>Attachment</Button>
          </Upload>
        )
      default:
        return <Input size="large" prefix={prefix} placeholder={placeholder} disabled={disabled} className={inputClassName} />
    }
  }

  return (
    <Form.Item
      {...props}
      label={label ? (
        <span className={labelClassName}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      ) : undefined}
      required={required}
    >
      {renderField()}
    </Form.Item>
  )
} 