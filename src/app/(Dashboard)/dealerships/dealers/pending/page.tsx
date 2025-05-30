import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function DealersPendingPage() {
  const role = useSelector((state: RootState) => state.user.role);
  if (role === "ds") return <div>Dealers Pending Page</div>;
  return (
    <div>
      <Breadcrumbs items={[{ label: "Dealerships", href: "/dealerships" }, { label: "Dealers", href: "/dealerships/dealers" }, { label: "Pending" }]} />
      <div>Dealers Pending Page</div>
    </div>
  );
} 