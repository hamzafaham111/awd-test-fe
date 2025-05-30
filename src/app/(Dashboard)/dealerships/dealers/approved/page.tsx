import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function DealersApprovedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "Dealers", href: "/dealerships/dealers" }, { label: "Approved" }]} />
      <div>Dealers Approved Page</div>
    </div>
  );
} 