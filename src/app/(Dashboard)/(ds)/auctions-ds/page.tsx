'use client'
import React, { useState, useMemo } from "react";
import AuctionSearchBar from "@/components/ds/AuctionSearchBar";
import AuctionFiltersSidebar from "@/components/ds/AuctionFiltersSidebar";
import AuctionCard from "@/components/ds/AuctionCard";
import AuctionListPagination from "@/components/ds/AuctionListPagination";
import AuctionListEmptyState from "@/components/ds/AuctionListEmptyState";

const mockAuctions = [
  {
    image: "/images/auth-background.jpg",
    title: "1975 Mazda Aerostar 4D SUV AWD",
    vin: "BC5RYuHWoZtGREDT2",
    colors: [{ color: "#eab308", label: "Yellow" }],
    specs: [
      { label: "Miles", value: "1,548" },
      { label: "ENG", value: "" },
      { label: "Cyl", value: "" },
    ],
    status: "Ended",
    labelText: "Ended",
    labelColor: "#ef4444",
    price: 1800,
  },
  {
    image: "/images/auth-background.jpg",
    title: "1977 Hummer Millenia 4D SUV",
    vin: "AqvPvMVGgkKVdCSw8",
    colors: [{ color: "#eab308", label: "Yellow" }],
    specs: [
      { label: "Miles", value: "8,415" },
      { label: "ENG", value: "" },
      { label: "Cyl", value: "" },
    ],
    status: "Ended",
    labelText: "Ended",
    labelColor: "#ef4444",
    price: 100,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2017 Ford Accent 4D SUV RWD",
    vin: "QxU0RFYnezo4s1RG",
    colors: [{ color: "#eab308", label: "Yellow" }],
    specs: [
      { label: "Miles", value: "2,203" },
      { label: "ENG", value: "" },
      { label: "Cyl", value: "" },
    ],
    status: "Ended",
    labelText: "Ended",
    labelColor: "#ef4444",
    price: 5000,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2018 Toyota Camry SE",
    vin: "4T1B11HK5JU123456",
    colors: [{ color: "#f43f5e", label: "Red" }],
    specs: [
      { label: "Miles", value: "60,000" },
      { label: "ENG", value: "2.5L" },
    ],
    status: "In Negotiation",
    labelText: "In Negotiation",
    labelColor: "#eab308",
    price: 12000,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2019 Chevrolet Silverado",
    vin: "3GCUKREC1FG123456",
    colors: [{ color: "#eab308", label: "Yellow" }],
    specs: [
      { label: "Miles", value: "12,000" },
      { label: "ENG", value: "5.3L" },
      { label: "Cyl", value: "8" },
    ],
    status: "Live",
    labelText: "Active",
    labelColor: "#22c55e",
    price: 25000,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2020 BMW X5 xDrive40i",
    vin: "5UXCR6C08L9B12345",
    colors: [{ color: "#2563eb", label: "Blue" }],
    specs: [
      { label: "Miles", value: "45,000" },
      { label: "ENG", value: "3.0L" },
      { label: "Cyl", value: "6" },
    ],
    status: "Live",
    labelText: "Live",
    labelColor: "#22c55e",
    price: 32000,
  },
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
    labelText: "Coming Soon",
    labelColor: "#64748b",
    price: 18000,
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
    labelText: "Ended",
    labelColor: "#ef4444",
    price: 9000,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2015 Nissan Altima S",
    vin: "1N4AL3AP7FC123456",
    colors: [{ color: "#2563eb", label: "Blue" }],
    specs: [
      { label: "Miles", value: "70,000" },
      { label: "ENG", value: "2.5L" },
    ],
    status: "In Negotiation",
    labelText: "Sale Pending",
    labelColor: "#38bdf8",
    price: 11000,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2018 Kia Sorento LX",
    vin: "5XYPGDA30JG123456",
    colors: [{ color: "#eab308", label: "Yellow" }],
    specs: [
      { label: "Miles", value: "50,000" },
      { label: "ENG", value: "2.4L" },
    ],
    status: "Live",
    labelText: "Live",
    labelColor: "#22c55e",
    price: 21000,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2019 Audi Q5 Premium",
    vin: "WA1BNAFY7K2123456",
    colors: [{ color: "#f43f5e", label: "Red" }],
    specs: [
      { label: "Miles", value: "30,000" },
      { label: "ENG", value: "2.0L" },
    ],
    status: "Ended",
    labelText: "Ended",
    labelColor: "#ef4444",
    price: 27000,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2016 Hyundai Elantra SE",
    vin: "5NPDH4AE0GH123456",
    colors: [{ color: "#22c55e", label: "Green" }],
    specs: [
      { label: "Miles", value: "40,000" },
      { label: "ENG", value: "1.8L" },
    ],
    status: "Coming Soon",
    labelText: "Coming Soon",
    labelColor: "#64748b",
    price: 13000,
  },
  {
    image: "/images/auth-background.jpg",
    title: "2017 Chevrolet Malibu LT",
    vin: "1G1ZE5ST5HF123456",
    colors: [{ color: "#eab308", label: "Yellow" }],
    specs: [
      { label: "Miles", value: "55,000" },
      { label: "ENG", value: "1.5L" },
    ],
    status: "Live",
    labelText: "Active",
    labelColor: "#22c55e",
    price: 19500,
  },
];

const filterOptions = {
  makeModel: [
    { value: "Ford", label: "Ford", count: 2 },
    { value: "BMW", label: "BMW", count: 1 },
    { value: "Toyota", label: "Toyota", count: 1 },
    { value: "Honda", label: "Honda", count: 1 },
    { value: "Chevrolet", label: "Chevrolet", count: 2 },
    { value: "Mazda", label: "Mazda", count: 1 },
    { value: "Hummer", label: "Hummer", count: 1 },
    { value: "Nissan", label: "Nissan", count: 1 },
    { value: "Kia", label: "Kia", count: 1 },
    { value: "Audi", label: "Audi", count: 1 },
    { value: "Hyundai", label: "Hyundai", count: 1 },
  ],
  price: { range: [100, 40000], marks: { 100: "$100", 40000: "$40k" } },
  year: { range: [1975, 2023], marks: { 1975: "1975", 2023: "2023" } },
  mileage: { range: [1000, 120000], marks: { 1000: "1k Miles", 120000: "120k Miles" } },
  fuelType: [
    { value: "Gas", label: "Gas", count: 8 },
    { value: "Hybrid", label: "Hybrid", count: 2 },
    { value: "Diesel", label: "Diesel", count: 2 },
  ],
  transmission: [
    { value: "Automatic", label: "Automatic", count: 10 },
    { value: "Manual", label: "Manual", count: 2 },
  ],
};

const defaultFilters = {
  makeModel: [],
  price: [100, 40000],
  year: [1975, 2023],
  mileage: [1000, 120000],
  fuelType: [],
  transmission: [],
};

export default function DsAuctions() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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
      <h1 className="text-2xl font-bold mt-2">Marketplace</h1>
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
            pageSizeOptions={[5, 10, 20]}
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