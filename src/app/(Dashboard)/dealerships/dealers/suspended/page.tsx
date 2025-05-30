import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function DealersSuspendedPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "Dealers", href: "/dealerships/dealers" }, { label: "Suspended" }]} />
      <div>Dealers Suspended Page</div>
    </div>
  );
} 