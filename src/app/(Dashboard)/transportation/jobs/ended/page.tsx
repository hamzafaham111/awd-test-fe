"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function JobsEndedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Jobs", href: "/transportation/jobs" }, { label: "Ended" }]} />
      <div>Jobs Ended Page</div>
    </div>
  );
} 