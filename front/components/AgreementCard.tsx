import React from "react";
import Link from "next/link";
import { Agreement } from "@/types/Agreement";

interface AgreementCardProps {
    agreement: Agreement;
}

const AgreementCard: React.FC<AgreementCardProps> = ({ agreement }) => {
    return (
        <div className="border rounded p-4 mb-4">
            <h3 className="text-lg font-medium">{agreement.propertyAddress}</h3>
            <p className="text-gray-600">Rent: {agreement.rentAmount} ETH</p>
            <p className="text-gray-600">Status: {agreement.status}</p>
            <Link href={`/agreements/${agreement.id}`} className="text-blue-500 hover:underline">
                View Details
            </Link>
        </div>
    );
};

export default AgreementCard;
