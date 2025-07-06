"use client";
import { useState } from "react";
import VerticalTabs from "@/components/common/VerticalTabs";
import { Form, Button } from "antd";
import { FormField } from "@/components/common/FormField";
import { useParams } from "next/navigation";

// Field name mapping: UI field name -> API field name
const fieldNameMap: Record<string, string> = {
  frontRightCorner: "exterior_front_right_corner",
  backRightCorner: "exterior_back_right_corner",
  rightSide: "exterior_right_side",
  sunroof: "exterior_sunroof",
  // ...add all mappings here as needed
};

const TABS = [
  { key: "exterior", label: "Exterior" },
  { key: "interior", label: "Interior" },
  { key: "mechanical", label: "Mechanical" },
  { key: "damage_rust", label: "Demage & Rust" },
  { key: "wheels", label: "Wheels" },
  { key: "warning_lights", label: "Warning Lights" },
  { key: "frame_unibody", label: "Frame/Unibody" },
  { key: "drivability", label: "Drivability" },
];

// List of all yes/no fields
const defaultYesNoFields = [
  "glassDamaged", "lightsDamaged", "surfaceRust", "rust", "previousRepair", "poorQualityRepairs", "hailDamage", "aftermarketParts", "paintMeterReadings",
  // Add all other yes/no field names used in your form here
];
const defaultState: Record<string, any> = {};
defaultYesNoFields.forEach(field => { defaultState[field] = 0; });

export default function InspectionFormPage() {
  const params = useParams();
  const inspectionId = params.id;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const [activeTab, setActiveTab] = useState("exterior");
  const [form] = Form.useForm();
  // Centralized state for all fields, with yes/no fields defaulting to 0
  const [inspectionData, setInspectionData] = useState<Record<string, any>>(defaultState);
  // Centralized file state for uploads (optional, for AntD Upload controlled mode)
  const [fileLists, setFileLists] = useState<Record<string, any[]>>({});

  // Handle field changes for all types
  const handleFieldChange = (field: string, e: any) => {
    if (e && e.fileList !== undefined) {
      // Upload field
      setFileLists(prev => ({ ...prev, [field]: e.fileList }));
      setInspectionData(prev => ({ ...prev, [field]: e.fileList }));
    } else if (e && e.target) {
      setInspectionData(prev => ({ ...prev, [field]: e.target.value }));
    } else {
      setInspectionData(prev => ({ ...prev, [field]: e }));
    }
  };

  // Submit handler
  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(inspectionData).forEach(([uiKey, value]) => {
      const apiKey = fieldNameMap[uiKey] || uiKey;
      if (Array.isArray(value) && value[0]?.originFileObj) {
        value.forEach((fileObj: any) => {
          if (fileObj.originFileObj) {
            formData.append(apiKey, fileObj.originFileObj);
          }
        });
      } else if (typeof value === 'string' || typeof value === 'number' || value instanceof Blob) {
        formData.append(apiKey, value as string | Blob);
      }
    });
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("access") : null;
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
      await fetch(`${API_BASE_URL}/inspections/api/v1/inspection-report/${inspectionId}/`, {
        method: "POST",
        body: formData,
        headers,
      });
      // Optionally show success message or redirect
    } catch (error) {
      // Optionally handle error
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "exterior":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Images */}
              <div className="space-y-4">
                <div className="font-bold text-lg mb-2">Images</div>
                <FormField
                  type="upload"
                  label="Front Right Corner"
                  name="frontRightCorner"
                  fileList={fileLists.frontRightCorner}
                  onChange={(e: any) => handleFieldChange("frontRightCorner", e)}
                />
                <FormField
                  type="upload"
                  label="Back Right Corner"
                  name="backRightCorner"
                  fileList={fileLists.backRightCorner}
                  onChange={(e: any) => handleFieldChange("backRightCorner", e)}
                />
                <FormField
                  type="upload"
                  label="Right Side"
                  name="rightSide"
                  fileList={fileLists.rightSide}
                  onChange={(e: any) => handleFieldChange("rightSide", e)}
                />
                <FormField
                  type="upload"
                  label="Sunroof"
                  name="sunroof"
                  fileList={fileLists.sunroof}
                  onChange={(e: any) => handleFieldChange("sunroof", e)}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  type="upload"
                  label="Front"
                  name="front"
                  fileList={fileLists.front}
                  onChange={(e: any) => handleFieldChange("front", e)}
                />
                <FormField
                  type="upload"
                  label="Back"
                  name="back"
                  fileList={fileLists.back}
                  onChange={(e: any) => handleFieldChange("back", e)}
                />
                <FormField
                  type="upload"
                  label="Car Model Badge"
                  name="carModelBadge"
                  fileList={fileLists.carModelBadge}
                  onChange={(e: any) => handleFieldChange("carModelBadge", e)}
                />
                <FormField
                  type="upload"
                  label="Windshield Vin"
                  name="windshieldVin"
                  fileList={fileLists.windshieldVin}
                  onChange={(e: any) => handleFieldChange("windshieldVin", e)}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  type="upload"
                  label="Front Left Corner"
                  name="frontLeftCorner"
                  fileList={fileLists.frontLeftCorner}
                  onChange={(e: any) => handleFieldChange("frontLeftCorner", e)}
                />
                <FormField
                  type="upload"
                  label="Back Left Corner"
                  name="backLeftCorner"
                  fileList={fileLists.backLeftCorner}
                  onChange={(e: any) => handleFieldChange("backLeftCorner", e)}
                />
                <FormField
                  type="upload"
                  label="Roof"
                  name="roof"
                  fileList={fileLists.roof}
                  onChange={(e: any) => handleFieldChange("roof", e)}
                />
                <FormField
                  type="upload"
                  label="Gas Fill Area Open"
                  name="gasFillAreaOpen"
                  fileList={fileLists.gasFillAreaOpen}
                  onChange={(e: any) => handleFieldChange("gasFillAreaOpen", e)}
                />
              </div>
            </div>
            {/* Wheels Images */}
            <div className="font-bold text-lg mt-8 mb-2">Wheels Images</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                type="upload"
                label="Front Driver Wheel"
                name="frontDriverWheel"
                fileList={fileLists.frontDriverWheel}
                onChange={(e: any) => handleFieldChange("frontDriverWheel", e)}
              />
              <FormField
                type="upload"
                label="Front Passenger Wheel"
                name="frontPassengerWheel"
                fileList={fileLists.frontPassengerWheel}
                onChange={(e: any) => handleFieldChange("frontPassengerWheel", e)}
              />
              <FormField
                type="upload"
                label="Back Driver Wheel"
                name="backDriverWheel"
                fileList={fileLists.backDriverWheel}
                onChange={(e: any) => handleFieldChange("backDriverWheel", e)}
              />
              <FormField
                type="upload"
                label="Back Passenger Wheel"
                name="backPassengerWheel"
                fileList={fileLists.backPassengerWheel}
                onChange={(e: any) => handleFieldChange("backPassengerWheel", e)}
              />
            </div>
            {/* Undercarriage Images */}
            <div className="font-bold text-lg mt-8 mb-2">Undercarriage Images</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                type="upload"
                label="Front Driver Wheel"
                name="undercarFrontDriverWheel"
                fileList={fileLists.undercarFrontDriverWheel}
                onChange={(e: any) => handleFieldChange("undercarFrontDriverWheel", e)}
              />
              <FormField
                type="upload"
                label="Under Front Bumper"
                name="underFrontBumper"
                fileList={fileLists.underFrontBumper}
                onChange={(e: any) => handleFieldChange("underFrontBumper", e)}
              />
              <FormField
                type="upload"
                label="Front Passenger Wheel"
                name="undercarFrontPassengerWheel"
                fileList={fileLists.undercarFrontPassengerWheel}
                onChange={(e: any) => handleFieldChange("undercarFrontPassengerWheel", e)}
              />
              <FormField
                type="upload"
                label="Back Driver Wheel"
                name="undercarBackDriverWheel"
                fileList={fileLists.undercarBackDriverWheel}
                onChange={(e: any) => handleFieldChange("undercarBackDriverWheel", e)}
              />
              <FormField
                type="upload"
                label="Under Back Bumper"
                name="underBackBumper"
                fileList={fileLists.underBackBumper}
                onChange={(e: any) => handleFieldChange("underBackBumper", e)}
              />
              <FormField
                type="upload"
                label="Back Passenger Wheel"
                name="undercarBackPassengerWheel"
                fileList={fileLists.undercarBackPassengerWheel}
                onChange={(e: any) => handleFieldChange("undercarBackPassengerWheel", e)}
              />
              <FormField
                type="upload"
                label="Panoramic Photo (front half)"
                name="panoramicFront"
                fileList={fileLists.panoramicFront}
                onChange={(e: any) => handleFieldChange("panoramicFront", e)}
              />
              <FormField
                type="upload"
                label="Panoramic Photo (back half)"
                name="panoramicBack"
                fileList={fileLists.panoramicBack}
                onChange={(e: any) => handleFieldChange("panoramicBack", e)}
              />
            </div>
            {/* Questions */}
            <div className="font-bold text-lg mt-8 mb-2">Questions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                type="button-group"
                label="Body Damage"
                name="bodyDamage"
                value={inspectionData.bodyDamage ?? 0}
                onChange={(e: any) => handleFieldChange("bodyDamage", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "MODERATE", value: 1 },
                  { label: "MAJOR", value: 2 },
                ]}
              />
              <FormField
                type="button-group"
                label="Glass Damaged/Cracked"
                name="glassDamaged"
                value={inspectionData.glassDamaged ?? 0}
                onChange={(e: any) => handleFieldChange("glassDamaged", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Lights Damaged/Cracked"
                name="lightsDamaged"
                value={inspectionData.lightsDamaged ?? 0}
                onChange={(e: any) => handleFieldChange("lightsDamaged", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Surface Rust"
                name="surfaceRust"
                value={inspectionData.surfaceRust ?? 0}
                onChange={(e: any) => handleFieldChange("surfaceRust", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Rust"
                name="rust"
                value={inspectionData.rust ?? 0}
                onChange={(e: any) => handleFieldChange("rust", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Previous Repair"
                name="previousRepair"
                value={inspectionData.previousRepair ?? 0}
                onChange={(e: any) => handleFieldChange("previousRepair", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Poor Quality Repairs"
                name="poorQualityRepairs"
                value={inspectionData.poorQualityRepairs ?? 0}
                onChange={(e: any) => handleFieldChange("poorQualityRepairs", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Hail Damage"
                name="hailDamage"
                value={inspectionData.hailDamage ?? 0}
                onChange={(e: any) => handleFieldChange("hailDamage", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Aftermarket Parts - Exterior"
                name="aftermarketParts"
                value={inspectionData.aftermarketParts ?? 0}
                onChange={(e: any) => handleFieldChange("aftermarketParts", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Paint Meter Readings"
                name="paintMeterReadings"
                value={inspectionData.paintMeterReadings ?? 0}
                onChange={(e: any) => handleFieldChange("paintMeterReadings", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Color Tag Indication"
                name="colorTagIndication"
                value={inspectionData.colorTagIndication ?? 0}
                onChange={(e: any) => handleFieldChange("colorTagIndication", e)}
                options={[
                  { label: "GREEN", value: 0 },
                  { label: "RED", value: 1 },
                ]}
              />
            </div>
          </div>
        );
      case "interior":
        return (
          <div className="space-y-8">
            {/* Images */}
            <div className="font-bold text-lg mb-2">Images</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                type="upload"
                label="Front Driver Side"
                name="interiorFrontDriverSide"
                fileList={fileLists.interiorFrontDriverSide}
                onChange={(e: any) => handleFieldChange("interiorFrontDriverSide", e)}
              />
              <FormField
                type="upload"
                label="Front Passenger Side"
                name="interiorFrontPassengerSide"
                fileList={fileLists.interiorFrontPassengerSide}
                onChange={(e: any) => handleFieldChange("interiorFrontPassengerSide", e)}
              />
              <FormField
                type="upload"
                label="Backseat Picture From Right Side"
                name="interiorBackseatRight"
                fileList={fileLists.interiorBackseatRight}
                onChange={(e: any) => handleFieldChange("interiorBackseatRight", e)}
              />
              <FormField
                type="upload"
                label="Backseat Picture From Left Side"
                name="interiorBackseatLeft"
                fileList={fileLists.interiorBackseatLeft}
                onChange={(e: any) => handleFieldChange("interiorBackseatLeft", e)}
              />
              <FormField
                type="upload"
                label="Center Stack"
                name="interiorCenterStack"
                fileList={fileLists.interiorCenterStack}
                onChange={(e: any) => handleFieldChange("interiorCenterStack", e)}
              />
              <FormField
                type="upload"
                label="Center Console"
                name="interiorCenterConsole"
                fileList={fileLists.interiorCenterConsole}
                onChange={(e: any) => handleFieldChange("interiorCenterConsole", e)}
              />
              <FormField
                type="upload"
                label="Odometer / Dashboard Full View"
                name="interiorOdometerDashboard"
                fileList={fileLists.interiorOdometerDashboard}
                onChange={(e: any) => handleFieldChange("interiorOdometerDashboard", e)}
              />
              <FormField
                type="upload"
                label="Navigation"
                name="interiorNavigation"
                fileList={fileLists.interiorNavigation}
                onChange={(e: any) => handleFieldChange("interiorNavigation", e)}
              />
              <FormField
                type="upload"
                label="Odometer Mileage"
                name="interiorOdometerMileage"
                fileList={fileLists.interiorOdometerMileage}
                onChange={(e: any) => handleFieldChange("interiorOdometerMileage", e)}
              />
              <FormField
                type="upload"
                label="Trunk Interior"
                name="interiorTrunk"
                fileList={fileLists.interiorTrunk}
                onChange={(e: any) => handleFieldChange("interiorTrunk", e)}
              />
              <FormField
                type="upload"
                label="Under trunk space"
                name="interiorUnderTrunk"
                fileList={fileLists.interiorUnderTrunk}
                onChange={(e: any) => handleFieldChange("interiorUnderTrunk", e)}
              />
              <FormField
                type="upload"
                label="Full View Front Dash & Center Console"
                name="interiorFullDashConsole"
                fileList={fileLists.interiorFullDashConsole}
                onChange={(e: any) => handleFieldChange("interiorFullDashConsole", e)}
              />
              <FormField
                type="upload"
                label="Sunroof"
                name="interiorSunroof"
                fileList={fileLists.interiorSunroof}
                onChange={(e: any) => handleFieldChange("interiorSunroof", e)}
              />
              <FormField
                type="upload"
                label="Car Manual"
                name="interiorCarManual"
                fileList={fileLists.interiorCarManual}
                onChange={(e: any) => handleFieldChange("interiorCarManual", e)}
              />
            </div>
            {/* Questions */}
            <div className="font-bold text-lg mt-8 mb-2">Questions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                type="button-group"
                label="Seat Damage"
                name="seatDamage"
                value={inspectionData.seatDamage ?? 0}
                onChange={(e: any) => handleFieldChange("seatDamage", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "MODERATE", value: 1 },
                  { label: "MAJOR", value: 2 },
                ]}
              />
              <FormField
                type="button-group"
                label="Carpet Damage"
                name="carpetDamage"
                value={inspectionData.carpetDamage ?? 0}
                onChange={(e: any) => handleFieldChange("carpetDamage", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Dash/Instrument Panel Damage?"
                name="dashPanelDamage"
                value={inspectionData.dashPanelDamage ?? 0}
                onChange={(e: any) => handleFieldChange("dashPanelDamage", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Interior Trim Damage"
                name="interiorTrimDamage"
                value={inspectionData.interiorTrimDamage ?? 0}
                onChange={(e: any) => handleFieldChange("interiorTrimDamage", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Interior Odor"
                name="interiorOdor"
                value={inspectionData.interiorOdor ?? 0}
                onChange={(e: any) => handleFieldChange("interiorOdor", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Not Equipped with Factory A/C?"
                name="noFactoryAC"
                value={inspectionData.noFactoryAC ?? 0}
                onChange={(e: any) => handleFieldChange("noFactoryAC", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Electronics Issue?"
                name="electronicsIssue"
                value={inspectionData.electronicsIssue ?? 0}
                onChange={(e: any) => handleFieldChange("electronicsIssue", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Five Digit Odometer"
                name="fiveDigitOdometer"
                value={inspectionData.fiveDigitOdometer ?? 0}
                onChange={(e: any) => handleFieldChange("fiveDigitOdometer", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Sunroof"
                name="interiorSunroofQ"
                value={inspectionData.interiorSunroofQ ?? 0}
                onChange={(e: any) => handleFieldChange("interiorSunroofQ", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Navigation"
                name="interiorNavigationQ"
                value={inspectionData.interiorNavigationQ ?? 0}
                onChange={(e: any) => handleFieldChange("interiorNavigationQ", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Backup camera"
                name="backupCamera"
                value={inspectionData.backupCamera ?? 0}
                onChange={(e: any) => handleFieldChange("backupCamera", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Aftermarket Interior Accessories"
                name="aftermarketInteriorAccessories"
                value={inspectionData.aftermarketInteriorAccessories ?? 0}
                onChange={(e: any) => handleFieldChange("aftermarketInteriorAccessories", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Airbag Deployed"
                name="airbagDeployed"
                value={inspectionData.airbagDeployed ?? 0}
                onChange={(e: any) => handleFieldChange("airbagDeployed", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Climate Control Not Working"
                name="climateControlNotWorking"
                value={inspectionData.climateControlNotWorking ?? 0}
                onChange={(e: any) => handleFieldChange("climateControlNotWorking", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Leather or Leather Type Seats"
                name="leatherSeats"
                value={inspectionData.leatherSeats ?? 0}
                onChange={(e: any) => handleFieldChange("leatherSeats", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
            </div>
          </div>
        );
      case "mechanical":
        return (
          <div className="space-y-8">
            {/* Images */}
            <div className="font-bold text-lg mb-2">Images</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                type="upload"
                label="Oil Stick"
                name="mechOilStick"
                fileList={fileLists.mechOilStick}
                onChange={(e: any) => handleFieldChange("mechOilStick", e)}
              />
              <FormField
                type="upload"
                label="Emission/Vin Sticker"
                name="mechEmissionVinSticker"
                fileList={fileLists.mechEmissionVinSticker}
                onChange={(e: any) => handleFieldChange("mechEmissionVinSticker", e)}
              />
              <FormField
                type="upload"
                label="Engine Full View"
                name="mechEngineFullView"
                fileList={fileLists.mechEngineFullView}
                onChange={(e: any) => handleFieldChange("mechEngineFullView", e)}
              />
              <FormField
                type="upload"
                label="Coolant"
                name="mechCoolant"
                fileList={fileLists.mechCoolant}
                onChange={(e: any) => handleFieldChange("mechCoolant", e)}
              />
              <FormField
                type="upload"
                label="Starting Sound"
                name="mechStartingSound"
                fileList={fileLists.mechStartingSound}
                onChange={(e: any) => handleFieldChange("mechStartingSound", e)}
              />
              <FormField
                type="upload"
                label="Idle Sound"
                name="mechIdleSound"
                fileList={fileLists.mechIdleSound}
                onChange={(e: any) => handleFieldChange("mechIdleSound", e)}
              />
            </div>
            {/* Questions */}
            <div className="font-bold text-lg mt-8 mb-2">Questions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                type="button-group"
                label="Cold Start"
                name="mechColdStart"
                value={inspectionData.mechColdStart ?? 0}
                onChange={(e: any) => handleFieldChange("mechColdStart", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Jump Start Required"
                name="mechJumpStart"
                value={inspectionData.mechJumpStart ?? 0}
                onChange={(e: any) => handleFieldChange("mechJumpStart", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Problem: Engine Does Not Crank"
                name="mechNoCrank"
                value={inspectionData.mechNoCrank ?? 0}
                onChange={(e: any) => handleFieldChange("mechNoCrank", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Cranks, Does Not Start"
                name="mechCrankNoStart"
                value={inspectionData.mechCrankNoStart ?? 0}
                onChange={(e: any) => handleFieldChange("mechCrankNoStart", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Noise"
                name="mechEngineNoise"
                value={inspectionData.mechEngineNoise ?? 0}
                onChange={(e: any) => handleFieldChange("mechEngineNoise", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Knock"
                name="mechEngineKnock"
                value={inspectionData.mechEngineKnock ?? 0}
                onChange={(e: any) => handleFieldChange("mechEngineKnock", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Rough Idle"
                name="mechRoughIdle"
                value={inspectionData.mechRoughIdle ?? 0}
                onChange={(e: any) => handleFieldChange("mechRoughIdle", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Not Enough Power?"
                name="mechNotEnoughPower"
                value={inspectionData.mechNotEnoughPower ?? 0}
                onChange={(e: any) => handleFieldChange("mechNotEnoughPower", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Transmission"
                name="mechTransmission"
                value={inspectionData.mechTransmission ?? "ok"}
                onChange={(e: any) => handleFieldChange("mechTransmission", e)}
                options={[
                  { label: "OK", value: "ok" },
                  { label: "DELAYED RESPONSE", value: "delayed" },
                  { label: "SLIP", value: "slip" },
                ]}
              />
              <FormField
                type="button-group"
                label="Odometer"
                name="mechOdometer"
                value={inspectionData.mechOdometer ?? "ok"}
                onChange={(e: any) => handleFieldChange("mechOdometer", e)}
                options={[
                  { label: "OK", value: "ok" },
                  { label: "ROLL BACK", value: "rollback" },
                  { label: "EXACT MILEAGE UNSURE", value: "unsure" },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Problem: Engine Does Not Stay Running"
                name="mechNoStayRunning"
                value={inspectionData.mechNoStayRunning ?? 0}
                onChange={(e: any) => handleFieldChange("mechNoStayRunning", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Problem: Internal Engine Noise"
                name="mechInternalNoise"
                value={inspectionData.mechInternalNoise ?? 0}
                onChange={(e: any) => handleFieldChange("mechInternalNoise", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Problem: Runs Rough/Hesitation"
                name="mechRunsRough"
                value={inspectionData.mechRunsRough ?? 0}
                onChange={(e: any) => handleFieldChange("mechRunsRough", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Problem: Timing Chain/Camshaft Issue"
                name="mechTimingChain"
                value={inspectionData.mechTimingChain ?? 0}
                onChange={(e: any) => handleFieldChange("mechTimingChain", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Problem: Excessive Smoke from Exhaust"
                name="mechExcessiveSmoke"
                value={inspectionData.mechExcessiveSmoke ?? 0}
                onChange={(e: any) => handleFieldChange("mechExcessiveSmoke", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Problem: Head Gasket Issue"
                name="mechHeadGasket"
                value={inspectionData.mechHeadGasket ?? 0}
                onChange={(e: any) => handleFieldChange("mechHeadGasket", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Problem: Oil/Coolant Intermix on Dipstick"
                name="mechOilCoolantIntermix"
                value={inspectionData.mechOilCoolantIntermix ?? 0}
                onChange={(e: any) => handleFieldChange("mechOilCoolantIntermix", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Turbo/Supercharger Issue"
                name="mechTurbo"
                value={inspectionData.mechTurbo ?? 0}
                onChange={(e: any) => handleFieldChange("mechTurbo", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Excessive Exhaust Noise"
                name="mechExcessiveExhaustNoise"
                value={inspectionData.mechExcessiveExhaustNoise ?? 0}
                onChange={(e: any) => handleFieldChange("mechExcessiveExhaustNoise", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Exhaust Modifications"
                name="mechExhaustMod"
                value={inspectionData.mechExhaustMod ?? 0}
                onChange={(e: any) => handleFieldChange("mechExhaustMod", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Suspension Modifications"
                name="mechSuspensionMod"
                value={inspectionData.mechSuspensionMod ?? 0}
                onChange={(e: any) => handleFieldChange("mechSuspensionMod", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Emissions Modifications"
                name="mechEmissionsMod"
                value={inspectionData.mechEmissionsMod ?? 0}
                onChange={(e: any) => handleFieldChange("mechEmissionsMod", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Emissions Sticker Issue"
                name="mechEmissionsSticker"
                value={inspectionData.mechEmissionsSticker ?? 0}
                onChange={(e: any) => handleFieldChange("mechEmissionsSticker", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Catalytic Converters Missing"
                name="mechCatalyticMissing"
                value={inspectionData.mechCatalyticMissing ?? 0}
                onChange={(e: any) => handleFieldChange("mechCatalyticMissing", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Aftermarket Parts - Mechanical"
                name="mechAftermarketParts"
                value={inspectionData.mechAftermarketParts ?? 0}
                onChange={(e: any) => handleFieldChange("mechAftermarketParts", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Engine Accessory Issue"
                name="mechAccessoryIssue"
                value={inspectionData.mechAccessoryIssue ?? 0}
                onChange={(e: any) => handleFieldChange("mechAccessoryIssue", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Active Fluid Leak"
                name="mechFluidLeak"
                value={inspectionData.mechFluidLeak ?? 0}
                onChange={(e: any) => handleFieldChange("mechFluidLeak", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Oil Level Issue"
                name="mechOilLevel"
                value={inspectionData.mechOilLevel ?? 0}
                onChange={(e: any) => handleFieldChange("mechOilLevel", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Oil Condition Issue"
                name="mechOilCondition"
                value={inspectionData.mechOilCondition ?? 0}
                onChange={(e: any) => handleFieldChange("mechOilCondition", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Coolant Level Issue"
                name="mechCoolantLevel"
                value={inspectionData.mechCoolantLevel ?? 0}
                onChange={(e: any) => handleFieldChange("mechCoolantLevel", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
            </div>
          </div>
        );
      case "wheels":
        return (
          <div className="space-y-8">
            {/* Tire Measurements */}
            <div className="font-bold text-lg mb-2">Tire Measurements</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormField
                type="text"
                label="Front Right Tire"
                name="tireFrontRight"
                value={inspectionData.tireFrontRight}
                onChange={(e: any) => handleFieldChange("tireFrontRight", e)}
              />
              <FormField
                type="text"
                label="Front Left Tire"
                name="tireFrontLeft"
                value={inspectionData.tireFrontLeft}
                onChange={(e: any) => handleFieldChange("tireFrontLeft", e)}
              />
              <FormField
                type="text"
                label="Back Left Tire"
                name="tireBackLeft"
                value={inspectionData.tireBackLeft}
                onChange={(e: any) => handleFieldChange("tireBackLeft", e)}
              />
              <FormField
                type="text"
                label="Back Right Tire"
                name="tireBackRight"
                value={inspectionData.tireBackRight}
                onChange={(e: any) => handleFieldChange("tireBackRight", e)}
              />
            </div>
            {/* Questions */}
            <div className="font-bold text-lg mt-8 mb-2">Questions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                type="button-group"
                label="Aftermarket Rims / Tires"
                name="aftermarketRimsTires"
                value={inspectionData.aftermarketRimsTires ?? 0}
                onChange={(e: any) => handleFieldChange("aftermarketRimsTires", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Damaged Wheels"
                name="damagedWheels"
                value={inspectionData.damagedWheels ?? 0}
                onChange={(e: any) => handleFieldChange("damagedWheels", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Incorrectly Sized Tires"
                name="incorrectlySizedTires"
                value={inspectionData.incorrectlySizedTires ?? 0}
                onChange={(e: any) => handleFieldChange("incorrectlySizedTires", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Damaged Tires"
                name="damagedTires"
                value={inspectionData.damagedTires ?? 0}
                onChange={(e: any) => handleFieldChange("damagedTires", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Uneven Tread Wear"
                name="unevenTreadWear"
                value={inspectionData.unevenTreadWear ?? 0}
                onChange={(e: any) => handleFieldChange("unevenTreadWear", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Mismatched Tires"
                name="mismatchedTires"
                value={inspectionData.mismatchedTires ?? 0}
                onChange={(e: any) => handleFieldChange("mismatchedTires", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Missing Spare Tire and / or Equipment"
                name="missingSpareTire"
                value={inspectionData.missingSpareTire ?? 0}
                onChange={(e: any) => handleFieldChange("missingSpareTire", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
            </div>
          </div>
        );
      case "warning_lights":
        return (
          <div className="space-y-8">
            {/* Questions */}
            <div className="font-bold text-lg mb-2">Questions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                type="button-group"
                label="Check Engine Light"
                name="checkEngineLight"
                value={inspectionData.checkEngineLight ?? 0}
                onChange={(e: any) => handleFieldChange("checkEngineLight", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Airbag Light"
                name="airbagLight"
                value={inspectionData.airbagLight ?? 0}
                onChange={(e: any) => handleFieldChange("airbagLight", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Brake/ABS Light"
                name="brakeAbsLight"
                value={inspectionData.brakeAbsLight ?? 0}
                onChange={(e: any) => handleFieldChange("brakeAbsLight", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Traction Control Light"
                name="tractionControlLight"
                value={inspectionData.tractionControlLight ?? 0}
                onChange={(e: any) => handleFieldChange("tractionControlLight", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="TPMS Light"
                name="tpmsLight"
                value={inspectionData.tpmsLight ?? 0}
                onChange={(e: any) => handleFieldChange("tpmsLight", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Battery/Charging Light"
                name="batteryChargingLight"
                value={inspectionData.batteryChargingLight ?? 0}
                onChange={(e: any) => handleFieldChange("batteryChargingLight", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Other Warning Light"
                name="otherWarningLight"
                value={inspectionData.otherWarningLight ?? 0}
                onChange={(e: any) => handleFieldChange("otherWarningLight", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
            </div>
            {/* OBDII Codes */}
            <div className="font-bold text-lg mt-8 mb-2 flex items-center gap-4">OBDII Codes <FormField type="upload" name="obdiiFile" inputClassName="!p-0 !m-0" labelClassName="!hidden" /></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormField
                type="text"
                label="Code 1"
                name="obdiiCode1"
                value={inspectionData.obdiiCode1}
                onChange={(e: any) => handleFieldChange("obdiiCode1", e)}
              />
              <FormField
                type="text"
                label="Code 2"
                name="obdiiCode2"
                value={inspectionData.obdiiCode2}
                onChange={(e: any) => handleFieldChange("obdiiCode2", e)}
              />
              <FormField
                type="text"
                label="Code 3"
                name="obdiiCode3"
                value={inspectionData.obdiiCode3}
                onChange={(e: any) => handleFieldChange("obdiiCode3", e)}
              />
              <FormField
                type="text"
                label="Code 4"
                name="obdiiCode4"
                value={inspectionData.obdiiCode4}
                onChange={(e: any) => handleFieldChange("obdiiCode4", e)}
              />
              <FormField
                type="text"
                label="Code 5"
                name="obdiiCode5"
                value={inspectionData.obdiiCode5}
                onChange={(e: any) => handleFieldChange("obdiiCode5", e)}
              />
              <FormField
                type="text"
                label="Code 6"
                name="obdiiCode6"
                value={inspectionData.obdiiCode6}
                onChange={(e: any) => handleFieldChange("obdiiCode6", e)}
              />
              <FormField
                type="text"
                label="Code 7"
                name="obdiiCode7"
                value={inspectionData.obdiiCode7}
                onChange={(e: any) => handleFieldChange("obdiiCode7", e)}
              />
              <FormField
                type="text"
                label="Code 8"
                name="obdiiCode8"
                value={inspectionData.obdiiCode8}
                onChange={(e: any) => handleFieldChange("obdiiCode8", e)}
              />
              <FormField
                type="text"
                label="Code 9"
                name="obdiiCode9"
                value={inspectionData.obdiiCode9}
                onChange={(e: any) => handleFieldChange("obdiiCode9", e)}
              />
              <FormField
                type="text"
                label="Code 10"
                name="obdiiCode10"
                value={inspectionData.obdiiCode10}
                onChange={(e: any) => handleFieldChange("obdiiCode10", e)}
              />
            </div>
            {/* Incomplete Readiness Monitors */}
            <div className="font-bold text-lg mt-8 mb-2">Incomplete Readiness Monitors</div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <FormField
                type="text"
                label="Monitor 1"
                name="monitor1"
                value={inspectionData.monitor1}
                onChange={(e: any) => handleFieldChange("monitor1", e)}
              />
              <FormField
                type="text"
                label="Monitor 2"
                name="monitor2"
                value={inspectionData.monitor2}
                onChange={(e: any) => handleFieldChange("monitor2", e)}
              />
              <FormField
                type="text"
                label="Monitor 3"
                name="monitor3"
                value={inspectionData.monitor3}
                onChange={(e: any) => handleFieldChange("monitor3", e)}
              />
              <FormField
                type="text"
                label="Monitor 4"
                name="monitor4"
                value={inspectionData.monitor4}
                onChange={(e: any) => handleFieldChange("monitor4", e)}
              />
              <FormField
                type="text"
                label="Monitor 5"
                name="monitor5"
                value={inspectionData.monitor5}
                onChange={(e: any) => handleFieldChange("monitor5", e)}
              />
            </div>
          </div>
        );
      case "frame_unibody":
        return (
          <div className="space-y-8">
            {/* Questions */}
            <div className="font-bold text-lg mb-2">Questions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                type="button-group"
                label="Structural Announcements"
                name="structuralAnnouncements"
                value={inspectionData.structuralAnnouncements ?? 0}
                onChange={(e: any) => handleFieldChange("structuralAnnouncements", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Undercarriage Surface Rust"
                name="undercarriageSurfaceRust"
                value={inspectionData.undercarriageSurfaceRust ?? 0}
                onChange={(e: any) => handleFieldChange("undercarriageSurfaceRust", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Undercarriage Heavy Rust"
                name="undercarriageHeavyRust"
                value={inspectionData.undercarriageHeavyRust ?? 0}
                onChange={(e: any) => handleFieldChange("undercarriageHeavyRust", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Penetrating Rust"
                name="penetratingRust"
                value={inspectionData.penetratingRust ?? 0}
                onChange={(e: any) => handleFieldChange("penetratingRust", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
            </div>
          </div>
        );
      case "drivability":
        return (
          <div className="space-y-8">
            {/* Questions */}
            <div className="font-bold text-lg mb-2">Questions</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                type="button-group"
                label="Vehicle INOP (Does Not Move)"
                name="vehicleInop"
                value={inspectionData.vehicleInop ?? 0}
                onChange={(e: any) => handleFieldChange("vehicleInop", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Transmission Issue"
                name="transmissionIssue"
                value={inspectionData.transmissionIssue ?? 0}
                onChange={(e: any) => handleFieldChange("transmissionIssue", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="OBDII codes present"
                name="obdiiCodesPresent"
                value={inspectionData.obdiiCodesPresent ?? 0}
                onChange={(e: any) => handleFieldChange("obdiiCodesPresent", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="4x4 / 4WD / Drivetrain Issue"
                name="drivetrainIssue"
                value={inspectionData.drivetrainIssue ?? 0}
                onChange={(e: any) => handleFieldChange("drivetrainIssue", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Steering Issue"
                name="steeringIssue"
                value={inspectionData.steeringIssue ?? 0}
                onChange={(e: any) => handleFieldChange("steeringIssue", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Brake Issue"
                name="brakeIssue"
                value={inspectionData.brakeIssue ?? 0}
                onChange={(e: any) => handleFieldChange("brakeIssue", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
              <FormField
                type="button-group"
                label="Suspension Issue"
                name="suspensionIssue"
                value={inspectionData.suspensionIssue ?? 0}
                onChange={(e: any) => handleFieldChange("suspensionIssue", e)}
                options={[
                  { label: "NO", value: 0 },
                  { label: "YES", value: 1 },
                ]}
              />
            </div>
          </div>
        );
      case "damage_rust":
        return (
          <div className="space-y-8">
            {/* Damages Section */}
            <div>
              <div className="font-bold text-lg mb-2">Damages</div>
              <FormField
                type="textarea"
                label="Notes"
                name="damageNotes"
                value={inspectionData.damageNotes ?? ""}
                onChange={(e: any) => handleFieldChange("damageNotes", e)}
              />
              <FormField
                type="upload"
                label="Add File"
                name="damageFiles"
                fileList={fileLists.damageFiles}
                onChange={(e: any) => handleFieldChange("damageFiles", e)}
              />
            </div>
            {/* Rust Section */}
            <div>
              <div className="font-bold text-lg mb-2">Rust</div>
              <FormField
                type="textarea"
                label="Notes"
                name="rustNotes"
                value={inspectionData.rustNotes ?? ""}
                onChange={(e: any) => handleFieldChange("rustNotes", e)}
              />
              <FormField
                type="upload"
                label="Add File"
                name="rustFiles"
                fileList={fileLists.rustFiles}
                onChange={(e: any) => handleFieldChange("rustFiles", e)}
              />
            </div>
          </div>
        );
      // TODO: Add other tab contents (mechanical, etc.)
      default:
        return <div className="text-gray-400">Coming soon...</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64">
        <VerticalTabs
          items={TABS.map(tab => ({ key: tab.key, label: tab.label }))}
          activeKey={activeTab}
          onChange={setActiveTab}
          variant="sidebar"
        />
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-md p-8">
        <Form form={form} layout="vertical" className="space-y-8" onFinish={handleSubmit}>
          {renderTabContent()}
          <div className="flex justify-end mt-8">
            <Button type="primary" htmlType="submit" className="bg-sky-700 text-white px-8 py-2 rounded-md">Submit Inspection</Button>
          </div>
        </Form>
      </div>
    </div>
  );
} 