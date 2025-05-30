import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function DealershipsPage() {
  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "List" }]} />
      <div>Dealerships Page</div>
    </div>
  );
} 