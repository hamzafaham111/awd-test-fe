import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function Page() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Requests" }]} />
      <h1>/dashboard/inspection/requests</h1>
    </main>
  );
} 