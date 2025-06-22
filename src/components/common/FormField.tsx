import { Form, Input, Select, Radio, Upload, Button, Checkbox } from "antd"
import { PaperClipOutlined } from "@ant-design/icons"
import type { FormItemProps } from "antd"
import type { UploadFile } from "antd/es/upload/interface"
import { ReactNode } from "react"

interface FormFieldProps extends Omit<FormItemProps, "children"> {
  type?: "text" | "password" | "email" | "select" | "radio" | "upload" | "checkbox" | "textarea"
  options?: { label: string; value: any }[]
  uploadProps?: {
    maxCount?: number
    listType?: "text" | "picture" | "picture-card"
  }
  prefix?: ReactNode
  placeholder?: string
  disabled?: boolean
  loading?: boolean
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
  loading,
  inputClassName = "",
  labelClassName = "",
  label,
  required,
  value,
  onChange,
  fileList,
  name,
  ...props
}: FormFieldProps & { value?: any; onChange?: any; fileList?: any; name?: string }) {
  const renderField = () => {
    switch (type) {
      case "password":
        return <Input.Password name={name} size="large" prefix={prefix} placeholder={placeholder} disabled={disabled} className={inputClassName} value={value} onChange={onChange} />
      case "email":
        return <Input name={name} type="email" size="large" prefix={prefix} placeholder={placeholder} disabled={disabled} className={inputClassName} value={value} onChange={onChange} />
      case "textarea":
        return <Input.TextArea name={name} size="large" placeholder={placeholder} disabled={disabled} className={inputClassName} value={value} onChange={onChange} />
      case "select":
        return (
          <Select
            size="large"
            placeholder={placeholder}
            disabled={disabled}
            loading={loading}
            className={inputClassName}
            value={value}
            onChange={onChange}
          >
            {options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )
      case "radio":
        return (
          <Radio.Group
            name={name}
            className={inputClassName}
            disabled={disabled}
            value={value}
            onChange={onChange}
          >
            {options.map((option) => (
              <Radio.Button
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        )
      case "checkbox":
        return (
          <Checkbox name={name} disabled={disabled} className={inputClassName} checked={value} onChange={onChange}>
            {label}
          </Checkbox>
        )
      case "upload":
        return (
          <Upload
            listType={uploadProps.listType}
            maxCount={uploadProps.maxCount}
            beforeUpload={() => false}
            disabled={disabled}
            fileList={fileList}
            onChange={onChange}
            className="w-full"
          >
            <div className="w-full">
              <button type="button" className="bg-gray-100 text-sky-700 rounded-md border-none py-1 px-12">
                <PaperClipOutlined />
                Attachment
              </button>
            </div>
          </Upload>
        )
      default:
        return <Input name={name} size="large" prefix={prefix} placeholder={placeholder} disabled={disabled} className={inputClassName} value={value} onChange={onChange} />
    }
  }

  return (
    <Form.Item
      name={name}
      {...props}
      label={type === 'checkbox' ? undefined : label ? (
        <span className={labelClassName}>
          {label}
          {/* {required && <span className="text-red-500 ml-1">*</span>} */}
        </span>
      ) : undefined}
      required={required}
      valuePropName={type === 'checkbox' ? 'checked' : 'value'}
    >
      {renderField()}
    </Form.Item>
  )
} 