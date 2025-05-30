import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function Page() {
  return (
    <main>
      <Breadcrumbs items={[
        { label: "Inspection", href: "/inspection" },
        { label: "Completed", href: "/inspection/completed" },
        { label: "Denied" }
      ]} />
      <h1>/dashboard/inspection/completed/denied</h1>
    </main>
  );
} 