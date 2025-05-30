import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function FinancialReportPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Reports", href: "/reports" }, { label: "Financial" }]} />
      <div>Financial Report Page</div>
    </div>
  );
} 