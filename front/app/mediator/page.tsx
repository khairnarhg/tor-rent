"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import {
    StarIcon,
    HomeIcon,
    WalletIcon,
    MessageCircleIcon,
    BellIcon,
    SettingsIcon,
    CalendarIcon,
    ImageIcon,
    MapPinIcon,
    FilterIcon,
    CheckCircleIcon,
    AlertCircleIcon
} from 'lucide-react';
import PaymentModal from '@/components/PaymentModal';
import DisputesTab from '@/components/DisputesTab'; // Import DisputesTab
import NotificationsModal from '@/components/NotificationsModal';
import { useRouter } from 'next/navigation';
import { getDisputes, getNotifications } from '@/utils/api'; // Import API functions
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // For charts


const Page = () => {
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [priceRange, setPriceRange] = useState([500, 5000]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [disputes, setDisputes] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const disputesData = await getDisputes();
                setDisputes(disputesData);

                const notificationsData = await getNotifications(); // Fetch notifications
                setNotifications(notificationsData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const connectWallet = async () => {
        setIsConnected(true);
    };


    const handleNotificationClick = (notification) => {
        setIsNotificationOpen(false);
        router.push(`/dispute/${notification.disputeId}`);
    };
    
    const handleViewDetails = (dispute) => {
        router.push(`/dispute/${dispute.id}`);
    };
    

    const voteOnDispute = async (disputeId, voteType) => {
        try {
            const updatedDispute = await voteOnDisputeApi(disputeId, voteType); // Call API function
            setDisputes(prevDisputes =>
                prevDisputes.map(dispute =>
                    dispute.id === disputeId ? updatedDispute : dispute
                )
            );
        } catch (error) {
            console.error("Error voting:", error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Mediator Dashboard</h1>
                        <p className="text-gray-600">Manage disputes and agreements</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={connectWallet}>
                            <WalletIcon className="mr-2 h-4 w-4" />
                            {isConnected ? 'Connected' : 'Connect Wallet'}
                        </Button>
                        <Button variant="outline" onClick={() => setIsNotificationOpen(true)}>
                            <BellIcon className="mr-2 h-4 w-4" />
                            Notifications {notifications.length > 0 && <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-2">{notifications.length}</span>}
                        </Button>
                        <Button variant="outline">
                            <SettingsIcon className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </div>
                </div>

                <NotificationsModal
                    isOpen={isNotificationOpen}
                    onClose={() => setIsNotificationOpen(false)}
                    notifications={notifications}
                    onNotificationClick={handleNotificationClick}
                />

                {/* Tabs */}
                <Tabs defaultValue="disputes" className="space-y-6">
                    <TabsList className="bg-white p-1">
                        <TabsTrigger value="disputes">
                            <MessageCircleIcon className="mr-2 h-4 w-4" />
                            Disputes
                        </TabsTrigger>
                      
                    </TabsList>

                    {/* Disputes Tab */}
                    <TabsContent value="disputes">
                        <DisputesTab disputes={disputes} onViewDetails={handleViewDetails} voteOnDispute={voteOnDispute} />
                    </TabsContent>

                

                  

                    
                </Tabs>


            </div>
        </div>
    );
};

export default Page;