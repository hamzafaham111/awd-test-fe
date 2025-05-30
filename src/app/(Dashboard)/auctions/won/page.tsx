"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function AuctionsWonPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Auctions", href: "/auctions" }, { label: "Won" }]} />
      <div>Auctions Won Page</div>
    </div>
  );
} 