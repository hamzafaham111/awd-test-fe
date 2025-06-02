"use client"

import { useState } from "react"
import { Form, Button, message, Radio } from "antd"
import type { UploadFile } from "antd/es/upload/interface"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { FormField } from "@/components/common/FormField"
import { ProgressIndicator } from "@/components/common/ProgressIndicator"

import { CheckCircleFilled } from "@ant-design/icons"
import Image from "next/image"
interface FormData {
  // Step 1
  hasDealer: string
  // Step 2
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  cellNumber: string
  contactPreference: string

  // Step 3
  dealershipType: string
  interest: string
  numberOfLocations: string
  carsInStock: string

  // Step 4
  dealershipName: string
  dealershipStreetName: string
  taxId: string
  website: string
  city: string
  state: string
  zipcode: string
  dealerLicense: UploadFile[]
  businessLicense: UploadFile[]
  certificateOfRetail: UploadFile[]
}

const steps = [
  { id: 1, title: "Sign Up to Getting Started", subtitle: "Do you have a valid dealer license?" },
  { id: 2, title: "Personal Information", subtitle: "Introduce yourself for better acquaintance." },
  { id: 3, title: "Dealership Information", subtitle: "Please tell us about your dealership." },
  { id: 4, title: "Dealership Information", subtitle: "What is the address on your dealership license?" },
  { id: 5, title: "Preference setting", subtitle: "What is the address on your dealership license?" },
  { id: 6, title: "Verification", subtitle: "Complete your registration." },
]

const contactOptions = [
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Text Message", value: "text" },
]

const dealershipTypeOptions = [
  { label: "Franchise", value: "franchise" },
  { label: "Independent", value: "independent" },
  { label: "Wholesale", value: "wholesale" },
]

const interestOptions = [
  { label: "Sell a vehicle", value: "sell" },
  { label: "Buy a vehicle", value: "buy" },
  { label: "Both buy and sell", value: "both" },
]

const stateOptions = [
  { label: "Alabama (AL)", value: "AL" },
  { label: "Alaska (AK)", value: "AK" },
  { label: "Arizona (AZ)", value: "AZ" },
  { label: "Arkansas (AR)", value: "AR" },
  { label: "California (CA)", value: "CA" },
  { label: "Florida (FL)", value: "FL" },
  { label: "Georgia (GA)", value: "GA" },
  { label: "Texas (TX)", value: "TX" },
  { label: "New York (NY)", value: "NY" },
]

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [form] = Form.useForm()
  const hasDealer = Form.useWatch("hasDealer", form)

  // Animation state
  const [animating, setAnimating] = useState(false)
  const [animationClass, setAnimationClass] = useState("in")
  const [pendingStep, setPendingStep] = useState<number | null>(null)

  // Animation handler
  const animateStep = (dir: number) => {
    setAnimating(true)
    setAnimationClass(dir > 0 ? "out-right" : "out-left")
    setTimeout(() => {
      setPendingStep(currentStep + dir)
      setAnimationClass(dir > 0 ? "in-left" : "in-right")
      setTimeout(() => {
        setCurrentStep((prev) => prev + dir)
        setAnimationClass("in")
        setAnimating(false)
        setPendingStep(null)
      }, 20)
    }, 500)
  }

  const nextStep = async () => {
    try {
      await form.validateFields()
      if (currentStep < steps.length && !animating) {
        animateStep(1)
      }
    } catch (error) {
      message.error("Please fill in all required fields")
    }
  }

  const prevStep = () => {
    if (currentStep > 1 && !animating) {
      animateStep(-1)
    }
  }

  const onFinish = (values: FormData) => {
    console.log("Form submitted:", values)
    message.success("Registration successful!")
  }

  // Animation classes for Tailwind
  const getStepClass = (phase: string) => {
    switch (phase) {
      case "in":
        return "opacity-100 rotate-y-0 z-10"
      case "out-left":
        return "opacity-0 -rotate-y-90 z-0"
      case "out-right":
        return "opacity-0 rotate-y-90 z-0"
      case "in-left":
        return "opacity-0 rotate-y-90 z-0"
      case "in-right":
        return "opacity-0 -rotate-y-90 z-0"
      default:
        return ""
    }
  }

  // Custom animated radio card for step 1
  const DealerRadioCards = () => {
    const value = hasDealer;
    const setValue = (val: string) => form.setFieldsValue({ hasDealer: val });
    const options = [
      { label: "Yes, I have a valid dealer license", value: "yes" },
      { label: "No, I don't have a valid dealer license", value: "no" },
    ];
    return (
      <Form.Item
        name="hasDealer"
        rules={[{ required: true, message: "Please select an option" }]}
        className="w-full mb-0 font-poppins"
      >
        <div className="flex flex-col gap-4 w-full items-center">
          {options.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => setValue(opt.value)}
                className={`w-full max-w-2xl flex items-center justify-between px-6 py-4 rounded-lg border transition-all duration-200
                  ${selected ? "border-blue-500 bg-blue-50 shadow" : "border-gray-200 bg-white"}
                  focus:outline-none`}
              >
                <span className={`text-lg transition-all duration-200 ${selected ? "font-[500] text-black" : "font-light text-gray-400"}`}>{opt.label}</span>
                <span className="ml-4 flex items-center justify-center">
                  <span
                    className={`relative w-7 h-7 flex items-center justify-center rounded-full border-2 transition-all duration-200
                      ${selected ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"}
                    `}
                  >
                    <span
                      className={`absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-white transition-all duration-200
                        ${selected ? "scale-0" : "-translate-x-1/2 -translate-y-1/2 scale-100"}
                      `}
                      style={{ transform: "translate(-50%, -50%)" }}
                    />
                    <CheckCircleFilled
                      className={`text-white text-xl transition-all duration-200 ${selected ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                      style={{ transition: "all 0.2s" }}
                    />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Form.Item>
    );
  };

  // Step content generator
  const renderStepContent = (step: number) => (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="max-w-3xl mx-auto w-full font-poppins"
    >
      {/* Step Title & Subtitle */}
      <div className="mb-8 text-center flex flex-col items-center">
        <Image src="/awd-logo.png"  alt="AWD Auctions" width={200} height={200} />
        <h2 className="text-[22px] font-bold text-sky-600 mb-1">{steps[step-1].title}</h2>
        <p className="text-gray-500 text-base">{steps[step-1].subtitle}</p>
      </div>
      {step === 1 && (
        <div className="flex flex-col items-center w-full">
          <DealerRadioCards />
        </div>
      )}
      {step === 2 && (
        <div className="w-full">
          <div className="flex flex-row gap-2">
          <FormField name="firstName" className="w-4/4 md:w-2/4" label="First Name" rules={[{ required: true, message: "Please enter your first name" }]} />
          <FormField name="lastName" className="w-4/4 md:w-2/4" label="Last Name" rules={[{ required: true, message: "Please enter your last name" }]} />
          </div>
          <FormField name="email" type="email" label="Email" rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" }
          ]} />
          <div className="flex flex-row gap-2">
          <FormField name="contactPreference" className="w-6/6 md:w-2/6" type="select" label="Contact Preference" rules={[{ required: true, message: "Please select your contact preference" }]} options={contactOptions} />
          <FormField name="phoneNumber" className="w-6/6 md:w-2/6" label="Phone Number" rules={[{ required: true, message: "Please enter your phone number" }]} />
          <FormField name="cellNumber" className="w-6/6 md:w-2/6" label="Cell Number" />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="w-full">
          <div className="flex flex-row gap-2">
            <FormField name="dealershipName" className="w-4/4 md:w-2/4" label="Dealership Name" rules={[{ required: true, message: "Please enter dealership name" }]} />
            <FormField name="dealershipStreetName" className="w-4/4 md:w-2/4" label="Dealership Street Name" rules={[{ required: true, message: "Please enter street name" }]} />
          </div>
          <div className="flex flex-row gap-2">
          <FormField name="taxId" className="w-6/6 md:w-2/6" label="Tax ID" rules={[{ required: true, message: "Please enter tax ID" }]} />
          <FormField name="website" className="w-6/6 md:w-2/6" label="Website" />
          <FormField name="city" className="w-6/6 md:w-2/6" label="City" rules={[{ required: true, message: "Please enter city" }]} />
          </div>
          <div className="flex flex-row gap-2">
          <FormField name="dealerLicense" className="w-6/6 md:w-2/6" type="upload" label="Dealer license" rules={[{ required: true, message: "Please upload dealer license" }]} />
          <FormField name="businessLicense" className="w-6/6 md:w-2/6" type="upload" label="Business license" rules={[{ required: true, message: "Please upload business license" }]} />
          <FormField name="certificateOfRetail" className="w-6/6 md:w-2/6" type="upload" label="Certificate of retail (CRT-61)" rules={[{ required: true, message: "Please upload certificate of retail" }]} />
          </div>
          <div className="flex flex-row gap-2">
          <FormField name="zipcode" className="w-4/4 md:w-2/4" label="Zipcode" rules={[{ required: true, message: "Please enter zipcode" }]} />
          <FormField name="state" className="w-4/4 md:w-2/4" type="select" label="State" rules={[{ required: true, message: "Please select state" }]} options={stateOptions} />
          </div>
          </div>
      )}
      {step === 4 && (
        <div className="grid grid-cols-1 w-full">
          <FormField name="dealershipType" type="select" label="Dealership Type" rules={[{ required: true, message: "Please select your dealership type" }]} options={dealershipTypeOptions} />
          <FormField name="interest" type="select" label="What is your interest" rules={[{ required: true, message: "Please select your interest" }]} options={interestOptions} />
          <FormField name="numberOfLocations" label="No of Locations" rules={[{ required: true, message: "Please enter number of locations" }]} />
          <FormField name="carsInStock" label="How many cars do you stock?" rules={[{ required: true, message: "Please enter number of cars in stock" }]} />
        </div>
      )}
      {step === 5 && (
        <div className="w-full">
          <FormField
            name="referralCode"
            // label="Referral Code (Optional)"
            placeholder="Enter referral code"
            className="mb-4"
          />
          <FormField
            name="heardAbout"
            type="select"
            placeholder="How did you hear about AWD?"
            options={[
              { label: "Google Search", value: "google" },
              { label: "Friend/Colleague", value: "friend" },
              { label: "Social Media", value: "social" },
              { label: "Other", value: "other" },
            ]}
            className="mb-4"
          />
          <Form.Item name="textUpdates" valuePropName="checked" className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Text me updates <a href="#" className="text-blue-600 underline ml-1">(Text message Policy)</a>
            </label>
          </Form.Item>
          <Form.Item
            name="agreeTerms"
            valuePropName="checked"
            rules={[{ required: true, message: "You must agree to Terms and Conditions" }]}
            className="mb-6"
          >
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              I agree to <a href="#" className="text-blue-600 underline ml-1">Terms and Conditions</a> *
            </label>
          </Form.Item>
        </div>
      )}
      {step === 6 && (
        <div className="flex flex-col items-center justify-center min-h-[260px] w-full space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-sky-600">Registration Complete!</h3>
            <p className="text-gray-600">
              Thank you for registering with AWD Auctions. We&apos;ll review your information and get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}
    </Form>
  )

  return (
    <AuthLayout maxWidth="4xl">
      <div className="flex flex-col h-full items-center font-poppins">
        <div className="max-w-3xl w-full mx-auto flex flex-col flex-1">
          {/* Content Area */}
          <div className="relative flex-1 flex flex-col items-center justify-center w-full">
            {/* Step Content with Animation */}
            {/* Current step */}
            <div
              className={`w-full left-0 top-0 transition-all duration-500 ease-in-out transform ${getStepClass(animationClass)}`}
              style={{ backfaceVisibility: "hidden" }}
            >
              {renderStepContent(currentStep)}
            </div>
            {/* Pending step (for animation) */}
            {animating && pendingStep && (
              <div
                className={`absolute w-full left-0 top-0 transition-all duration-500 ease-in-out transform ${getStepClass(animationClass)}`}
                style={{ backfaceVisibility: "hidden" }}
              >
                {renderStepContent(pendingStep)}
              </div>
            )}
          </div>
          {/* Navigation Buttons - always at the bottom */}
          <div className="flex justify-center space-x-4 w-full">
            {currentStep > 1 && (
              <Button
                onClick={prevStep}
                className="px-8 py-2 h-11 border-sky-600 text-sky-600 hover:bg-sky-50 rounded-lg font-[600]"
                disabled={animating}
              >
                Back
              </Button>
            )}
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className={`px-12 py-2 h-11 bg-sky-600 hover:bg-sky-700 rounded-lg text-white ${currentStep === 1 && !hasDealer ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={(currentStep === 1 && !hasDealer) || animating}
              >
                Continue
              </button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="px-8 py-2 h-11 bg-sky-600 hover:bg-sky-700 rounded-lg"
                onClick={() => form.submit()}
                disabled={animating}
              >
                Complete Registration
              </Button>
            )}
          </div>
          {/* Progress Indicator - always at the bottom */}
          <div className="mt-6 w-full">
            <ProgressIndicator steps={steps} currentStep={currentStep} />
          </div>
        </div>
      </div>
    </AuthLayout>
  )
} 