"use client"
import React, { useState } from 'react';
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
  AlertCircleIcon,
  HouseIcon
} from 'lucide-react';
import PaymentModal from '@/components/PaymentModal'
import ViewHouses from "@/components/ViewHouses";

const Page = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Rent due in 5 days', type: 'warning' },
    { id: 2, text: 'New message from landlord', type: 'info' },
  ]);

  const propertyTypes = ['Apartment', 'House', 'Condo', 'Studio'];
  const amenities = ['Parking', 'Pool', 'Gym', 'Pet Friendly', 'Furnished'];

  const handleInterested = () => {
    try {


    } catch (e) {
      console.log('err in handling user interest', e);
    }
  }

  const properties = [
    {
      id: 1,
      address: '123 Main St',
      landlord: 'John Doe',
      landlordRating: 4.5,
      rent: 1500,
      rating: 4.5,
      available: true,
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      amenities: ['Parking', 'Pool'],
      images: ['https://wallpaperaccess.com/full/2315968.jpg'],
      location: { lat: 40.7128, lng: -74.0060 },
      reviews: [
        { user: 'Alice', rating: 4, comment: 'Great location and amenities' },
        { user: 'Bob', rating: 5, comment: 'Responsive landlord' }
      ]
    },
    {
      id: 2,
      address: '456 Oak Ave',
      landlord: 'Jane Smith',
      landlordRating: 4.8,
      rent: 1800,
      rating: 4.8,
      available: true,
      type: 'House',
      bedrooms: 3,
      bathrooms: 2,
      amenities: ['Gym', 'Pet Friendly'],
      images: ['https://wallpapercave.com/wp/wp3982615.jpg'],
      location: { lat: 40.7142, lng: -74.0064 },
      reviews: [
        { user: 'Charlie', rating: 5, comment: 'Beautiful property' },
        { user: 'Diana', rating: 4.5, comment: 'Well maintained' }
      ]
    }
  ];

  const connectWallet = async () => {
    setIsConnected(true);
  };

  const FilterSection = () => (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FilterIcon className="w-5 h-5" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label>Property Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Price Range</Label>
          <div className="mt-2">
            <Slider
              value={priceRange}
              min={500}
              max={5000}
              step={100}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-1 text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
        <div>
          <Label>Bedrooms</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, '5+'].map(num => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Amenities</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select amenities" />
            </SelectTrigger>
            <SelectContent>
              {amenities.map(amenity => (
                <SelectItem key={amenity} value={amenity}>{amenity}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const PropertyCard = ({ property }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img
          src={property.images}
          alt={property.address}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-green-500">
          ${property.rent}/month
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-gray-500" />
              {property.address}
            </h3>
            <div className="flex items-center mt-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="ml-1 font-medium">{property.rating}/5</span>
              <span className="ml-2 text-gray-600">({property.reviews.length} reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{property.bedrooms} Beds</Badge>
              <Badge variant="outline">{property.bathrooms} Baths</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{property.type}</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map(amenity => (
                <Badge key={amenity} variant="secondary">{amenity}</Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Landlord</p>
                <p className="font-medium">{property.landlord}</p>
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1 text-sm">{property.landlordRating}</span>
                </div>
              </div>
              <Button onClick={() => setSelectedProperty(prev => (prev?.id === property.id ? null : property))}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const NotificationsPanel = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellIcon className="w-5 h-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`flex items-center gap-2 p-3 rounded-lg ${notification.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}
            >
              {notification.type === 'warning' ? (
                <AlertCircleIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <CheckCircleIcon className="w-5 h-5 text-blue-500" />
              )}
              <span>{notification.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const PaymentsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WalletIcon className="w-5 h-5" />
            Monthly Rent Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold">$1,500.00</p>
                <p className="text-gray-600">Due on February 15, 2025</p>
              </div>
              <Button size="lg" onClick={() => setModalOpen(true)}>Pay Now</Button>
              <PaymentModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Payment Progress</span>
                <span>75% paid</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-600">Rent</p>
                  <p className="text-xl font-bold">$1,200</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-600">Utilities</p>
                  <p className="text-xl font-bold">$200</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-600">Other Fees</p>
                  <p className="text-xl font-bold">$100</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: 'Jan 15, 2025', amount: 1500, status: 'Paid', method: 'Credit Card' },
              { date: 'Dec 15, 2024', amount: 1500, status: 'Paid', method: 'Bank Transfer' }
            ].map((payment, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.date}</p>
                  <p className="text-sm text-gray-600">{payment.method}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${payment.amount}</p>
                  <Badge variant="success">{payment.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MessagingSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { sender: 'John Doe', message: 'Hi, I noticed the maintenance request...', time: '2h ago' },
            { sender: 'Jane Smith', message: 'Your rent payment was received...', time: '1d ago' }
          ].map((msg, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium">{msg.sender}</p>
                <span className="text-sm text-gray-600">{msg.time}</span>
              </div>
              <p className="text-gray-700">{msg.message}</p>
              <Button variant="outline" size="sm" className="mt-2">
                Reply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tenant Dashboard</h1>
            <p className="text-gray-600">Manage your rental properties and payments</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={connectWallet}>
              <WalletIcon className="mr-2 h-4 w-4" />
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </Button>
            <Button variant="outline">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <NotificationsPanel />

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="bg-white p-1">
            <TabsTrigger value="search">
              <HomeIcon className="mr-2 h-4 w-4" />
              Find Property
            </TabsTrigger>
            <TabsTrigger value="agreements">
              {/* <DocumentIcon className="mr-2 h-4 w-4" /> */}
              Agreements
            </TabsTrigger>
            <TabsTrigger value="payments">
              <WalletIcon className="mr-2 h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageCircleIcon className="mr-2 h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendar
            </TabsTrigger>

            <TabsTrigger value="view">
              <HouseIcon className="mr-2 h-4 w-4" />
              View House
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Input
                  placeholder="Search by location, property type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button variant="outline">
                <MapPinIcon className="mr-2 h-4 w-4" />
                Use My Location
              </Button>
            </div>

            <FilterSection />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {selectedProperty && (
              <div>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProperty(null)}
                      className="absolute top-4 right-4"
                    >
                      Close
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={selectedProperty.images[0]}
                          alt={selectedProperty.address}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold">{selectedProperty.address}</h3>
                            <p className="text-gray-600">${selectedProperty.rent}/month</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge>{selectedProperty.bedrooms} Beds</Badge>
                            <Badge>{selectedProperty.bathrooms} Baths</Badge>
                            <Badge>{selectedProperty.type}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Reviews</h4>
                          <div className="space-y-4">
                            {selectedProperty.reviews.map((review, i) => (
                              <div key={i} className="border-b pb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium">{review.user}</span>
                                  <div className="flex items-center">
                                    <StarIcon className="w-4 h-4 text-yellow-400" />
                                    <span className="ml-1">{review.rating}</span>
                                  </div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button className="flex-1" style={{ backgroundColor: 'green' }}>
                            Interested
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Contact Landlord
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

          </TabsContent>

          <TabsContent value="agreements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Agreements</CardTitle>
                <CardDescription>View and manage your current rental agreements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      property: '123 Main St',
                      startDate: '2024-01-01',
                      endDate: '2025-01-01',
                      status: 'Active',
                      documents: ['Lease Agreement', 'Insurance Policy']
                    }
                  ].map(agreement => (
                    <div key={agreement.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{agreement.property}</h3>
                          <p className="text-gray-600">
                            {agreement.startDate} to {agreement.endDate}
                          </p>
                        </div>
                        <Badge>{agreement.status}</Badge>
                      </div>

                      <div className="space-y-4 w-full">
                        <div>
                          <h4 className="font-medium mb-2">Documents</h4>
                          <div className="flex gap-2">
                            {agreement.documents.map(doc => (
                              <Button key={doc} variant="outline" size="sm">
                                {/* <DocumentIcon className="mr-2 h-4 w-4" /> */}
                                {doc}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"

                            onClick={() => setShowAgreement(!showAgreement)}
                          >
                            {showAgreement ? "Hide Details" : "View Details"}
                          </Button>

                          {/* ✅ Conditionally Render Agreement Details */}
                          {showAgreement && (
                            <div className="mt-4 border p-4 rounded bg-gray-100">
                              <p>
                                <strong>Property Address:</strong> panvel
                              </p>
                              <p>
                                <strong>Landlord ETH Address:</strong> 0x1234567890abcdef
                              </p>
                              <p>
                                <strong>Tenant ETH Address:</strong> 0xabcdef1234567890
                              </p>
                              <p>
                                <strong>Rent Amount:</strong> 2.5 ETH
                              </p>
                              <p>
                                <strong>Deposit Amount:</strong> 5 ETH
                              </p>
                              <p>
                                <strong>Policy Start Date:</strong> 2025-02-01
                              </p>
                              <p>
                                <strong>Policy End Date:</strong> 2026-02-01
                              </p>
                              <p>
                                <strong>Rent Due Date:</strong> 1st of every month
                              </p>
                            </div>
                          )}
                          <Button variant="outline">Request Changes</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsSection />
          </TabsContent>

          <TabsContent value="messages">
            <MessagingSection />
          </TabsContent>


          <TabsContent value="view">
            <ViewHouses />
          </TabsContent>




          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>Important dates and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      date: '2025-02-15',
                      title: 'Rent Due',
                      type: 'payment',
                      description: 'Monthly rent payment'
                    },
                    {
                      date: '2025-02-20',
                      title: 'Maintenance Visit',
                      type: 'maintenance',
                      description: 'Regular HVAC maintenance'
                    }
                  ].map((event, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-sm font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-xl font-bold">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>


      </div>
    </div>
  );
};

export default Page;