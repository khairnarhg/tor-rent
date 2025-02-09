import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Dummy payment history data (replace with your actual data fetching)
const dummyPaymentHistory = [
    { tenant: "john.smith@example.com", amount: 1500, date: "2024-09-20", status: "Paid" },
    { tenant: "jane.doe@example.com", amount: 1800, date: "2024-09-15", status: "Paid" },
    { tenant: "michael.brown@example.com", amount: 1200, date: "2024-09-10", status: "Pending" },
    { tenant: "sarah.lee@example.com", amount: 1600, date: "2024-09-05", status: "Paid" },
    // ... more payment history
];

const PaymentHistory = ({ paymentHistory = dummyPaymentHistory }) => { // Make paymentHistory prop optional
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((payment, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                    <td className="px-4 py-2 whitespace-nowrap">{payment.tenant}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">${payment.amount}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{payment.date}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default PaymentHistory;
