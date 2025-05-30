import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TicketCategoriesPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Tickets", href: "/tickets" }, { label: "Categories" }]} />
      <div>Ticket Categories Page</div>
    </div>
  );
} 