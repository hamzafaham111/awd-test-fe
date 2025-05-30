"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function JobsUnpickedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Jobs", href: "/transportation/jobs" }, { label: "Un-Picked" }]} />
      <div>Jobs Un-Picked Page</div>
    </div>
  );
} 