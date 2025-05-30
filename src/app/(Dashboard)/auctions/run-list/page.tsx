"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function AuctionsRunListPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Auctions", href: "/auctions" }, { label: "Run List" }]} />
      <div>Auctions Run List Page</div>
    </div>
  );
} 