"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function ChargesSlabsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Charges Slabs" }]} />
      <div>Charges Slabs Page</div>
    </div>
  );
} 