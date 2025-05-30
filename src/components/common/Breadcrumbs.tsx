"use client";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <nav>
        <ol className="flex items-center space-x-2 text-2xl font-bold">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center">
              {item.href ? (
                <Link href={item.href} className={idx === 0 ? "text-blue-800 hover:underline" : "text-gray-500 font-normal hover:underline"}>
                  {item.label}
                </Link>
              ) : (
                <span className={idx === 0 ? "text-blue-800" : "text-gray-500 font-normal"}>
                  {item.label}
                </span>
              )}
              {idx < items.length - 1 && (
                <span className="mx-2 text-gray-400 font-normal">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
} 