import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TicketStatusesPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "Statuses" }]} />
      <div>Ticket Statuses Page</div>
    </div>
  );
} 