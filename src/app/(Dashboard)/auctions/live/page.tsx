"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function AuctionsLivePage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Auctions", href: "/auctions" }, { label: "Live" }]} />
      <div>Auctions Live Page</div>
    </div>
  );
} 