"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react'; // Import the Upload icon
import { Button } from '@/components/ui/button'; // Import the Button component

const DocumentsTab = () => {
    const mockDocuments = [ // Mock document data
        { name: "Lease Agreement", url: "/documents/lease.pdf" },
        { name: "Property Inspection", url: "/documents/inspection.pdf" },
        { name: "Rent Receipts", url: "/documents/receipts.zip" },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Storage</CardTitle>
                <CardDescription>Access and manage your rental documents</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4"> {/* Add spacing between document items */}
                    {mockDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between"> {/* Use flexbox for layout */}
                            <div className="flex items-center"> {/* Group icon and name */}
                                <Upload className="h-5 w-5 mr-2" /> {/* Add icon */}
                                <span>{doc.name}</span>
                            </div>
                            <Button size="sm" variant="outline"> {/* Download Button */}
                                Download
                            </Button>
                        </div>
                    ))}
                    {mockDocuments.length === 0 && <p className="text-gray-500">No documents uploaded yet.</p>}
                </div>
            </CardContent>
        </Card>
    );
};

export default DocumentsTab;