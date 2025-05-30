import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function Page() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Inspection", href: "/inspection" }, { label: "Inspectors" }]} />
      <h1>/dashboard/inspection/inspectors</h1>
    </main>
  );
} 