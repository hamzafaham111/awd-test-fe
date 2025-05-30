"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function DealershipsCreditsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "Credits" }]} />
      <div>Dealerships Credits Page</div>
    </div>
  );
} 