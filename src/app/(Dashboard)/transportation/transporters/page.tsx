"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TransportersPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Transporters" }]} />
      <div>Transporters Page</div>
    </div>
  );
} 