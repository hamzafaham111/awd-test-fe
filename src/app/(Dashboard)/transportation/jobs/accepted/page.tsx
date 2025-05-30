"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function JobsAcceptedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Transportation", href: "/transportation" }, { label: "Jobs", href: "/transportation/jobs" }, { label: "Accepted" }]} />
      <div>Jobs Accepted Page</div>
    </div>
  );
} 