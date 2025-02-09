import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Dummy dispute data (replace with your actual data fetching)
const dummyDisputes = [
    {
        id: 1,
        raisedBy: "john.smith@example.com", // Tenant
        raisedAgainst: "acme.properties@example.com", // Landlord
        reason: "Leaky Roof in Apartment 3B",
        details: "The roof in apartment 3B has been leaking for several weeks, causing water damage to the ceiling and walls. The tenant has reported the issue multiple times, but the landlord has not yet taken action.",
        status: "Open",
        timestamp: "2024-10-27T10:00:00Z" // Example timestamp
    },
    {
        id: 2,
        raisedBy: "acme.properties@example.com", // Landlord
        raisedAgainst: "jane.doe@example.com", // Tenant
        reason: "Unpaid Rent - Unit 2A",
        details: "Tenant Jane Doe has failed to pay rent for the past two months for unit 2A. The total outstanding amount is $2,000.",
        status: "Open",
        timestamp: "2024-10-26T14:30:00Z"
    },
    {
        id: 3,
        raisedBy: "michael.brown@example.com", // Tenant
        raisedAgainst: "reliable.rentals@example.com", // Landlord
        reason: "Broken Air Conditioner - House 12 Oak St",
        details: "The air conditioning unit at 12 Oak Street has been malfunctioning for several days, leaving the house unbearably hot during a heatwave. The tenant has contacted the landlord, but no repairs have been made.",
        status: "Closed",
        timestamp: "2024-10-25T09:15:00Z"
    },
    {
        id: 4,
        raisedBy: "sarah.lee@example.com", // Tenant
        raisedAgainst: "david.wilson@example.com", // Tenant (neighbor)
        reason: "Noise Complaint - Apartment 4C",
        details: "Tenant Sarah Lee (apartment 4B) is complaining about loud parties and excessive noise coming from apartment 4C, occupied by David Wilson, late at night, disrupting her sleep.",
        status: "Open",
        timestamp: "2024-10-24T23:00:00Z"
    },
    {
        id: 5,
        raisedBy: "emily.davis@example.com", // Tenant
        raisedAgainst: "citywide.rentals@example.com", // Landlord
        reason: "Dispute over Security Deposit - Unit 102",
        details: "Tenant Emily Davis is disputing the deductions made from her security deposit by the landlord for alleged damages to unit 102. She claims the damages were pre-existing.",
        status: "Open",
        timestamp: "2024-10-23T11:00:00Z"
    },
    {
        id: 6,
        raisedBy: "kevin.nguyen@example.com", // Tenant
        raisedAgainst: "community.association@example.com", // HOA/Building Management
        reason: "Pet Policy Violation - Condo 5A",
        details: "Tenant Kevin Nguyen is accused of violating the building's no-pets policy by keeping a dog in condo unit 5A. Other residents have reported hearing barking.",
        status: "Open",
        timestamp: "2024-10-22T16:20:00Z"
    },
    {
        id: 7,
        raisedBy: "maria.garcia@example.com", // Tenant
        raisedAgainst: "parking.management@example.com", // Parking Management
        reason: "Parking Dispute - Lot B",
        details: "Tenant Maria Garcia reports that another vehicle has been repeatedly parking in her reserved parking spot in Lot B without authorization.",
        status: "Open",
        timestamp: "2024-10-21T10:30:00Z"
    },
    {
        id: 8,
        raisedBy: "lisa.rodriguez@example.com", // Tenant
        raisedAgainst: "prime.properties@example.com", // Landlord
        reason: "Lease Renewal Dispute - Apartment 2C",
        details: "Tenant Lisa Rodriguez is disputing the proposed rent increase for the lease renewal of apartment 2C. She believes the increase is excessive.",
        status: "Open",
        timestamp: "2024-10-20T17:15:00Z"
    },
    {
        id: 9,
        raisedBy: "carlos.perez@example.com", // Tenant
        raisedAgainst: "citywide.rentals@example.com", // Landlord
        reason: "Property Damage - Unit 4B",
        details: "Landlord reports a broken window and a damaged door in unit 4B, occupied by Carlos Perez. The cause of the damage is under investigation.",
        status: "Open",
        timestamp: "2024-10-19T09:50:00Z"
    },
    {
        id: 10,
        raisedBy: "david.lee@example.com", // Tenant
        raisedAgainst: "reliable.rentals@example.com", // Landlord
        reason: "Utility Bill Dispute - House 8 Elm St",
        details: "Tenant David Lee is disputing the amount of the latest water bill for the property at 8 Elm Street. He believes the bill is too high and may contain errors.",
        status: "Open",
        timestamp: "2024-10-18T13:25:00Z"
    },
];

const DisputeListTab = ({ disputes = dummyDisputes, landlordEmail }) => { // Make props optional
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dispute List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Raised By</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Raised Against</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disputes.map((dispute, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                    <td className="px-4 py-2 whitespace-nowrap">{dispute.raisedBy}</td>
                                    <td className={`px-4 py-2 whitespace-nowrap ${dispute.raisedAgainst === landlordEmail ? "text-red-500" : ""}`}>{dispute.raisedAgainst}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{dispute.reason}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{dispute.status}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <Button variant="outline" size="sm">View</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default DisputeListTab;