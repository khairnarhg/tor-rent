


"use client"; // Important for components that use hooks or browser APIs

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AgreementsTab from '@/components/AgreementsTab'; // Import your tab components
// import AgreementListTab from '@/components/AgreementsListTab'
import AgreementsPage from '@/components/AgreementsPage';
import PaymentsTab from '@/components/PaymentsTab';
import PaymentsHistory from '@/components/PaymentHistory';
// import DisputesTab from '@/components/DisputesTab';
import DocumentsTab from '@/components/DocumentsTab';
import HomesTab from '@/components/HomesTab';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    BellIcon,
    CheckCircleIcon,
    AlertCircleIcon
} from 'lucide-react';

const Page = () => {
    const [isConnected, setIsConnected] = useState(false);

    const connectWallet = async () => {
        setIsConnected(true);
    };

    const notifications = [
        { id: 1, text: "New payment received", type: "info" },
        { id: 2, text: "Lease agreement expiring soon", type: "warning" }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
                    <CardDescription>Manage your blockchain-secured rental agreements</CardDescription>
                </div>
                <Button
                    onClick={connectWallet}
                    className={isConnected ? 'bg-green-600' : 'bg-blue-600'}
                >
                    {isConnected ? 'Connected to MetaMask' : 'Connect MetaMask'}
                </Button>
            </div>

            {/* Notification Panel */}
            <Card className="mb-6 border border-gray-300 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <BellIcon className="w-6 h-6 text-blue-500" />
                        Notifications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`flex items-center gap-2 p-3 rounded-lg ${
                                        notification.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-blue-50 border-l-4 border-blue-500'
                                    }`}
                                >
                                    {notification.type === 'warning' ? (
                                        <AlertCircleIcon className="w-5 h-5 text-yellow-500" />
                                    ) : (
                                        <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                                    )}
                                    <span className="text-gray-700">{notification.text}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No new notifications</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="agreements" className="mb-8">
                <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="agreements">Agreements</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="disputes">Disputes</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="My Homes">My Homes</TabsTrigger>
                </TabsList>

                <TabsContent value="agreements">
                    <AgreementsPage />
                </TabsContent>
                <TabsContent value="payments">
                    <PaymentsHistory />
                </TabsContent>
                <TabsContent value="disputes">
                    <DisputeListTab />
                </TabsContent>
                <TabsContent value="documents">
                    <DocumentsTab />
                </TabsContent>
                <TabsContent value="My Homes">
                    <HomesTab />
                </TabsContent>

            </Tabs>
        </div>
    );
};

export default Page;
