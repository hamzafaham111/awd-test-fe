'use client'
import React, { useState, useMemo } from "react";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";
import AuctionFiltersSidebar from "@/components/ds/AuctionFiltersSidebar";
import AuctionCard from "@/components/ds/AuctionCard";
import AuctionListPagination from "@/components/ds/AuctionListPagination";
import AuctionListEmptyState from "@/components/ds/AuctionListEmptyState";

// Mock data for auctions
const mockAuctions = [
  {
    image: "/images/auth-background.jpg",
    title: "2016 Ford F150 Supercrew 4WD",
    vin: "JN8AZ2NF1F9572710",
    colors: [
      { color: "#22c55e", label: "Green" },
      { color: "#eab308", label: "Yellow" },
      { color: "#f43f5e", label: "Red" },
      { color: "#2563eb", label: "Blue" },
    ],
    specs: [
      { label: "Miles", value: "114,324" },
      { label: "ENG", value: "2.7L" },
      { label: "Cyl", value: "6" },
      { label: "4WD", value: "" },
    ],
    status: "Coming Soon",
  },
  {
    image: "/images/auth-background.jpg",
    title: "2020 BMW X5 xDrive40i",
    vin: "5UXCR6C08L9B12345",
    colors: [
      { color: "#2563eb", label: "Blue" },
    ],
    specs: [
      { label: "Miles", value: "45,000" },
      { label: "ENG", value: "3.0L" },
      { label: "Cyl", value: "6" },
    ],
    status: "Live",
  },
  {
    image: "/images/auth-background.jpg",
    title: "2018 Toyota Camry SE",
    vin: "4T1B11HK5JU123456",
    colors: [
      { color: "#f43f5e", label: "Red" },
    ],
    specs: [
      { label: "Miles", value: "60,000" },
      { label: "ENG", value: "2.5L" },
    ],
    status: "In Negotiation",
  },
  {
    image: "/images/auth-background.jpg",
    title: "2017 Honda Accord LX",
    vin: "1HGCR2F3XHA123456",
    colors: [],
    specs: [
      { label: "Miles", value: "80,000" },
    ],
    status: "Ended",
  },
  {
    image: "/images/auth-background.jpg",
    title: "2019 Chevrolet Silverado",
    vin: "3GCUKREC1FG123456",
    colors: [
      { color: "#eab308", label: "Yellow" },
    ],
    specs: [],
    status: "Live",
  },
];

// Mock filter options
const filterOptions = {
  makeModel: [
    { value: "Ford", label: "Ford", count: 2 },
    { value: "BMW", label: "BMW", count: 1 },
    { value: "Toyota", label: "Toyota", count: 1 },
    { value: "Honda", label: "Honda", count: 1 },
    { value: "Chevrolet", label: "Chevrolet", count: 1 },
  ],
  price: { range: [100, 900], marks: { 100: "$100", 900: "$900" } },
  year: { range: [2002, 2023], marks: { 2002: "2002", 2023: "2023" } },
  mileage: { range: [10, 120000], marks: { 10: "10 Miles", 120000: "120k Miles" } },
  fuelType: [
    { value: "Gas", label: "Gas", count: 3 },
    { value: "Hybrid", label: "Hybrid", count: 1 },
    { value: "Diesel", label: "Diesel", count: 1 },
  ],
  transmission: [
    { value: "Automatic", label: "Automatic", count: 4 },
    { value: "Manual", label: "Manual", count: 1 },
  ],
};

const defaultFilters = {
  makeModel: [],
  price: [100, 900],
  year: [2002, 2023],
  mileage: [10, 120000],
  fuelType: [],
  transmission: [],
};

export default function DsUpcomingAuctions() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filtering logic
  const filteredAuctions = useMemo(() => {
    let data = mockAuctions;
    if (search.trim()) {
      data = data.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (filters.makeModel.length) {
      data = data.filter(a => filters.makeModel.some((m: string) => a.title.toLowerCase().includes(m.toLowerCase())));
    }
    // (Add more filter logic as needed)
    return data;
  }, [search, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAuctions.length / pageSize);
  const pagedAuctions = filteredAuctions.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col gap-4 w-full">
      <AuctionSearchBar value={search} onChange={setSearch} onSearch={() => {}} />
      {/* Filters button for mobile */}
      <div className="md:hidden flex justify-end mb-2">
        <button
          className="border rounded-lg px-4 py-2 flex items-center gap-2 text-sky-700 font-semibold bg-white shadow"
          onClick={() => setFiltersOpen(true)}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M6 12h12M10 18h4" stroke="#0369a1" strokeWidth="2" strokeLinecap="round"/></svg>
          Filters
        </button>
      </div>
      {/* Mobile Filters Modal */}
      {filtersOpen && (
        <AuctionFiltersSidebar
          filters={filters}
          onChange={setFilters}
          filterOptions={filterOptions}
          onApply={() => { setPage(1); setFiltersOpen(false); }}
          open={true}
          onClose={() => setFiltersOpen(false)}
        />
      )}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Auction List */}
        <div className="flex-1 flex flex-col gap-4">
          {pagedAuctions.length === 0 ? (
            <AuctionListEmptyState />
          ) : (
            pagedAuctions.map((auction, idx) => (
              <AuctionCard key={idx} {...auction} />
            ))
          )}
          <AuctionListPagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            pageSizeOptions={[3, 5, 10]}
            onPageChange={setPage}
            onPageSizeChange={size => { setPageSize(size); setPage(1); }}
          />
        </div>
        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-80 w-full flex-shrink-0">
          <AuctionFiltersSidebar
            filters={filters}
            onChange={setFilters}
            filterOptions={filterOptions}
            onApply={() => setPage(1)}
          />
        </div>
      </div>
    </div>
  );
} 