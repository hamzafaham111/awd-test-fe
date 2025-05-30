import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TitlesPage() {
  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Titles", href: "/titles" }, { label: "List" }]} />
      <div>Titles Page</div>
    </div>
  );
} 