"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Property {
  id: number;
  address: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  description: string;
  imageUrl: string;
}

const HomesTab: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      address: "123 Main St, New York",
      rent: 2.5,
      bedrooms: 2,
      bathrooms: 1,
      type: "Apartment",
      description: "Cozy 2-bedroom apartment in the heart of the city.",
      imageUrl: "https://i.pinimg.com/originals/c1/f9/5a/c1f95a5d814bb204e25a4f72ee6142b5.jpg",
    },
    {
      id: 2,
      address: "456 Elm St, San Francisco",
      rent: 3.0,
      bedrooms: 3,
      bathrooms: 2,
      type: "House",
      description: "Spacious 3-bedroom house with a garden.",
      imageUrl: "https://i.pinimg.com/originals/c1/f9/5a/c1f95a5d814bb204e25a4f72ee6142b5.jpg",
    },
    {
      id: 3,
      address: "789 Oak St, Los Angeles",
      rent: 4.2,
      bedrooms: 4,
      bathrooms: 3,
      type: "Villa",
      description: "Luxury villa with a pool and stunning views.",
      imageUrl: "https://i.pinimg.com/originals/c1/f9/5a/c1f95a5d814bb204e25a4f72ee6142b5.jpg",
    },
  ]);

  const [newProperty, setNewProperty] = useState<Property>({
    id: Date.now(),
    address: "",
    rent: 0,
    bedrooms: 1,
    bathrooms: 1,
    type: "Apartment",
    description: "",
    imageUrl: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const addProperty = () => {
    if (newProperty.address && newProperty.rent) {
      setProperties([...properties, { ...newProperty, id: Date.now() }]);
      setShowModal(false);
      setNewProperty({ id: Date.now(), address: "", rent: 0, bedrooms: 1, bathrooms: 1, type: "Apartment", description: "", imageUrl: "" });
    }
  };

  return (
    <div>
      {/* Add Property Button */}
      <Button onClick={() => setShowModal(true)} className="mb-4">Add Property</Button>

      {/* Property List in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <CardTitle>{property.address}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 overflow-hidden rounded">
                {property.imageUrl ? (
                  <img
                    src={property.imageUrl}
                    alt="Property"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
              </div>
              <p><strong>Rent:</strong> {property.rent} ETH</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
              <p><strong>Type:</strong> {property.type}</p>
              <p><strong>Description:</strong> {property.description || "No description provided."}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inline Modal for Adding Property */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add Property</h2>
            
            <label className="block mb-1">Property Address</label>
            <input type="text" name="address" value={newProperty.address} onChange={handleChange} className="border rounded p-2 w-full mb-2" />
            
            <label className="block mb-1">Rent Amount (ETH)</label>
            <input type="number" name="rent" value={newProperty.rent} onChange={handleChange} className="border rounded p-2 w-full mb-2" />
            
            <label className="block mb-1">Property Image URL</label>
            <input type="text" name="imageUrl" value={newProperty.imageUrl} onChange={handleChange} className="border rounded p-2 w-full mb-2" />
            
            <label className="block mb-1">Property Type</label>
            <select name="type" value={newProperty.type} onChange={handleChange} className="border rounded p-2 w-full mb-2">
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>
            
            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="block mb-1">Number of Bedrooms</label>
                <input type="number" name="bedrooms" value={newProperty.bedrooms} onChange={handleChange} className="border rounded p-2 w-full" />
              </div>
              <div className="w-1/2">
                <label className="block mb-1">Number of Bathrooms</label>
                <input type="number" name="bathrooms" value={newProperty.bathrooms} onChange={handleChange} className="border rounded p-2 w-full" />
              </div>
            </div>
            
            <label className="block mb-1 mt-2">Short Description</label>
            <input type="text" name="description" value={newProperty.description} onChange={handleChange} className="border rounded p-2 w-full mt-2" />
            
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={addProperty}>Add Property</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomesTab;
