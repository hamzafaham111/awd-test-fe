import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TransporterPaymentPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Payments", href: "/payments" }, { label: "Transporter Payment" }]} />
      <div>Transporter Payment Page</div>
    </div>
  );
} 