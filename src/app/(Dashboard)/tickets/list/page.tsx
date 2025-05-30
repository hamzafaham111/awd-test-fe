import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TicketListPage() {
 
  return (
    <div>
      <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "List" }]} />
      <div>Ticket List Page</div>
    </div>
  );
} 