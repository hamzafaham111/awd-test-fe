import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AuctionCardProps {
    image: string;
    title: string;
    vin?: string;
    colors?: { color: string; label: string }[];
    specs?: { label: string; value: string }[];
    status: string;
    onBuyNow?: () => void;
    labelText?: string;
    labelColor?: string;
    price?: string | number;
    id?: string | number;
    routePath?: string;
}

const statusColors: Record<string, string> = {
    "Coming Soon": "bg-gray-200 text-gray-500",
    "In Negotiation": "bg-yellow-100 text-yellow-700",
    "Live": "bg-green-100 text-green-700",
    "Ended": "bg-red-100 text-red-700",
};

export default function AuctionCard({ image, title, vin, colors = [], specs = [], status, onBuyNow, labelText, labelColor, price, id, routePath }: AuctionCardProps) {
    const miles = specs.find(s => s.label.toLowerCase().includes('mile'))?.value;
    const router = useRouter();
    
    const handleTitleClick = () => {
        if (routePath && id) {
            router.push(`${routePath}`);
        }
    };
    
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md p-4 gap-4 w-full max-w-3xl min-h-[160px] relative">
            <div className="w-full md:w-32 h-32 md:h-24 flex-shrink-0 relative rounded-lg overflow-hidden mx-auto md:mx-0">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <div className="flex flex-row justify-between items-start">
                    <div 
                        className={`font-bold text-lg truncate ${routePath && id ? 'text-blue-600 cursor-pointer hover:text-blue-800' : 'text-gray-900'}`}
                        onClick={handleTitleClick}
                    >
                        {title}
                    </div>
                    <div className="flex flex-col items-end min-w-[90px]">
                        {labelText ? (
                            <span className="text-xs font-bold px-2 py-1 rounded" style={{ color: labelColor || '#ef4444' }}>{labelText}</span>
                        ) : (
                            <span className="h-5 block" />
                        )}
                        {miles && <span className="text-xs text-gray-400 font-semibold mt-1">{miles} Miles</span>}
                    </div>
                </div>
                {vin && <div className="text-xs text-gray-500 font-mono mb-1">{vin}</div>}
                {colors.length > 0 && (
                    <div className="flex flex-row gap-3 items-center mb-1">
                        {colors.map((c, i) => (
                            <span key={i} className="flex items-center gap-1 text-xs">
                                <span className="inline-block w-3 h-3 rounded-full" style={{ background: c.color }}></span>
                                {c.label}
                            </span>
                        ))}
                    </div>
                )}
                {specs.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-2">
                        {specs.filter(s => !s.label.toLowerCase().includes('mile')).map((s, i) => (
                            <span key={i}>{s.value} {s.label}</span>
                        ))}
                    </div>
                )}
                <div className="flex-1" />
                <div className="flex flex-row items-center gap-4 mt-2 w-full">
                    {price && <div className="text-lg font-bold text-gray-800">$ {price}</div>}
                    {status && (
                        <div className={`rounded-lg px-4 py-1 text-sm font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-500'}`}>{labelText || status}</div>
                    )}
                </div>
            </div>
        </div>
    );
} 