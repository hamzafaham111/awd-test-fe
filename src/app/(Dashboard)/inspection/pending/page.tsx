import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function Page() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Pending" }]} />
      <h1>/dashboard/inspection/pending</h1>
    </main>
  );
} 