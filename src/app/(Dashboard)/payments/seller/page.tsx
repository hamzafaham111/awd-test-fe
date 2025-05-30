import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function SellerPaymentPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Payments", href: "/payments" }, { label: "Seller Payment" }]} />
      <div>Seller Payment Page</div>
    </div>
  );
} 