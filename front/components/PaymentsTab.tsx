"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentsTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View and manage your rental payments</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-gray-500">Payment history coming soon...</p>
            </CardContent>
        </Card>
    );
};

export default PaymentsTab;