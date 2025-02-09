import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button"; // ✅ Correct import for Button


const ViewHouses = () => (
  <Card>
    <CardHeader>
      <CardTitle>Available Houses</CardTitle>
    </CardHeader>
    <CardContent>
      <Button className="mb-4">View Houses</Button>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            id: 1,
            address: "123 Main St",
            rent: 2.5,
            bedrooms: 3,
            bathrooms: 2,
            type: "House",
            description: "A cozy home with a great backyard.",
            imageUrl: "https://www.familyhandyman.com/wp-content/uploads/2019/03/shutterstock_197794196-house.jpg",
          },
          {
            id: 2,
            address: "456 Elm St",
            rent: 1.8,
            bedrooms: 2,
            bathrooms: 1,
            type: "Apartment",
            description: "Modern apartment in a great location.",
            imageUrl: "https://www.familyhandyman.com/wp-content/uploads/2019/03/shutterstock_197794196-house.jpg",
          },
          {
            id: 3,
            address: "789 Oak St",
            rent: 3.0,
            bedrooms: 4,
            bathrooms: 3,
            type: "House",
            description: "Spacious home with a beautiful garden.",
            imageUrl: "https://www.familyhandyman.com/wp-content/uploads/2019/03/shutterstock_197794196-house.jpg",
          },
        ].map((house) => (
          <Card key={house.id}>
            <CardHeader>
              <CardTitle>{house.address}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-48 h-48 overflow-hidden rounded">
                <img
                  src={house.imageUrl}
                  alt="Property"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <p>
                <strong>Rent:</strong> {house.rent} ETH
              </p>
              <p>
                <strong>Bedrooms:</strong> {house.bedrooms} |{" "}
                <strong>Bathrooms:</strong> {house.bathrooms}
              </p>
              <p>
                <strong>Type:</strong> {house.type}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {house.description || "No description provided."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ViewHouses;
