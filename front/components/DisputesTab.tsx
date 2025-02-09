import { useState } from "react";
import { CheckCircleIcon, AlertCircleIcon, Clock, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface Dispute {
  id: string;
  title: string;
  description: string;
  complainant: string;
  respondent: string;
  timestamp: string;
  status: string;
  userVoted: boolean;
  userVote?: "accept" | "reject";  // Added this property
  votes: { accept: number; reject: number };
  reason: string;
  details: string;
}

const DisputeTab = ({ voteOnDispute }: { voteOnDispute: (id: string, type: string) => void }) => {
  // Added state for managing disputes
  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: "1",
      title: "Leaky Roof in Apartment 3B",
      description: "Water damage from persistent leak",
      complainant: "john.smith@example.com", // Tenant
      respondent: "acme.properties@example.com", // Landlord
      timestamp: new Date('2024-09-25T11:30:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 2, reject: 1 },
      reason: "Roof Leak",
      details: "The roof in apartment 3B has been leaking for several weeks, causing water damage to the ceiling and walls.  The tenant has reported the issue multiple times, but the landlord has not yet taken action."
    },
    {
      id: "2",
      title: "Unpaid Rent - Unit 2A",
      description: "Two months' rent outstanding",
      complainant: "acme.properties@example.com", // Landlord
      respondent: "jane.doe@example.com", // Tenant
      timestamp: new Date('2024-09-20T16:45:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 5, reject: 0 },
      reason: "Rent Arrears",
      details: "Tenant Jane Doe has failed to pay rent for the past two months for unit 2A.  The total outstanding amount is $2,000."
    },
    {
      id: "3",
      title: "Broken Air Conditioner - House 12 Oak St",
      description: "AC unit malfunctioning during heatwave",
      complainant: "michael.brown@example.com", // Tenant
      respondent: "reliable.rentals@example.com", // Landlord
      timestamp: new Date('2024-09-15T08:15:00Z').toISOString(),
      status: "Closed",
      userVoted: true,
      votes: { accept: 7, reject: 0 },
      reason: "AC Malfunction",
      details: "The air conditioning unit at 12 Oak Street has been malfunctioning for several days, leaving the house unbearably hot during a heatwave. The tenant has contacted the landlord, but no repairs have been made."
    },
    {
      id: "4",
      title: "Noise Complaint - Apartment 4C",
      description: "Loud parties late at night",
      complainant: "sarah.lee@example.com", // Tenant
      respondent: "david.wilson@example.com", // Tenant (neighbor)
      timestamp: new Date('2024-09-12T23:00:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 1, reject: 3 },
      reason: "Noise Disturbance",
      details: "Tenant Sarah Lee (apartment 4B) is complaining about loud parties and excessive noise coming from apartment 4C, occupied by David Wilson, late at night, disrupting her sleep."
    },
    {
      id: "5",
      title: "Dispute over Security Deposit - Unit 102",
      description: "Disagreement about deductions",
      complainant: "emily.davis@example.com", // Tenant
      respondent: "citywide.rentals@example.com", // Landlord
      timestamp: new Date('2024-09-08T14:00:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 0, reject: 2 },
      reason: "Security Deposit",
      details: "Tenant Emily Davis is disputing the deductions made from her security deposit by the landlord for alleged damages to unit 102. She claims the damages were pre-existing."
    },
    {
      id: "6",
      title: "Pet Policy Violation - Condo 5A",
      description: "Unauthorized dog in no-pets building",
      complainant: "community.association@example.com", // HOA/Building Management
      respondent: "kevin.nguyen@example.com", // Tenant
      timestamp: new Date('2024-09-05T10:20:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 4, reject: 0 },
      reason: "Pet Violation",
      details: "Tenant Kevin Nguyen is accused of violating the building's no-pets policy by keeping a dog in condo unit 5A. Other residents have reported hearing barking."
    },
    {
      id: "7",
      title: "Parking Dispute - Lot B",
      description: "Unauthorized parking in reserved spot",
      complainant: "maria.garcia@example.com", // Tenant
      respondent: "parking.management@example.com", // Parking Management
      timestamp: new Date('2024-09-02T17:15:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 2, reject: 1 },
      reason: "Parking Issue",
      details: "Tenant Maria Garcia reports that another vehicle has been repeatedly parking in her reserved parking spot in Lot B without authorization."
    },
    {
      id: "8",
      title: "Lease Renewal Dispute - Apartment 2C",
      description: "Disagreement over rent increase",
      complainant: "lisa.rodriguez@example.com", // Tenant
      respondent: "prime.properties@example.com", // Landlord
      timestamp: new Date('2024-08-30T09:50:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 1, reject: 4 },
      reason: "Lease Renewal",
      details: "Tenant Lisa Rodriguez is disputing the proposed rent increase for the lease renewal of apartment 2C. She believes the increase is excessive."
    },
    {
      id: "9",
      title: "Property Damage - Unit 4B",
      description: "Broken window and damaged door",
      complainant: "citywide.rentals@example.com", // Landlord
      respondent: "carlos.perez@example.com", // Tenant
      timestamp: new Date('2024-08-28T13:25:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 3, reject: 0 },
      reason: "Property Damage",
      details: "Landlord reports a broken window and a damaged door in unit 4B, occupied by Carlos Perez. The cause of the damage is under investigation."
    },
    {
      id: "10",
      title: "Utility Bill Dispute - House 8 Elm St",
      description: "Disagreement over water bill amount",
      complainant: "david.lee@example.com", // Tenant
      respondent: "reliable.rentals@example.com", // Landlord
      timestamp: new Date('2024-08-25T16:00:00Z').toISOString(),
      status: "Open",
      userVoted: false,
      votes: { accept: 0, reject: 2 },
      reason: "Utility Bill",
      details: "Tenant David Lee is disputing the amount of the latest water bill for the property at 8 Elm Street. He believes the bill is too high and may contain errors."
    }
  ]);

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Handle voting locally
  const handleVote = (id: string, type: "accept" | "reject") => {
    setDisputes(prevDisputes =>
      prevDisputes.map(dispute =>
        dispute.id === id
          ? {
            ...dispute,
            userVoted: true,
            userVote: type,
            votes: {
              ...dispute.votes,
              [type]: dispute.votes[type] + 1
            }
          }
          : dispute
      )
    );
    voteOnDispute(id, type);
  };

  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedDispute(null);
  };

  return (
    <>
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {disputes.map((dispute) => (
            <Card
              key={dispute.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 ${dispute.status === "Closed" ? "bg-gray-50" : "bg-white"
                } border-0 shadow-lg rounded-xl`}
            >
              <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${dispute.status === "Closed"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-blue-50 text-blue-600"
                }`}>
                <Clock className="w-3 h-3" />
                {dispute.status}
              </div>

              <CardHeader className="pt-6 pb-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                    {dispute.title}
                  </CardTitle>
                  <div className="h-px bg-gradient-to-r from-blue-100 to-transparent"></div>
                </div>
                <CardDescription className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg flex-1">
                      <User className="w-4 h-4 text-blue-500" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Complainant</span>
                        <span className="font-medium truncate">{dispute.complainant}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg flex-1">
                      <User className="w-4 h-4 text-purple-500" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Respondent</span>
                        <span className="font-medium truncate">{dispute.respondent}</span>
                      </div>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-4">
                <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-gray-400 mt-1" />
                  <p className="text-sm text-gray-600 leading-relaxed">{dispute.reason}</p>
                </div>

                {!dispute.userVoted ? (
                  <div className="flex items-center justify-between gap-3 mt-6">
                    <Button
                      onClick={() => handleVote(dispute.id, "accept")}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span className="mr-2">{dispute.votes.accept}</span>
                      <CheckCircleIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleVote(dispute.id, "reject")}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span className="mr-2">{dispute.votes.reject}</span>
                      <AlertCircleIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className={`mt-6 p-4 rounded-xl text-center font-medium shadow-sm ${dispute.userVote === "accept"
                      ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-100"
                      : "bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border border-rose-100"
                    }`}>
                    <div className="flex items-center justify-center gap-2">
                      Your Vote: {dispute.userVote === "accept" ? (
                        <span className="flex items-center gap-2 bg-emerald-100 px-3 py-1 rounded-full">
                          Accept <CheckCircleIcon className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 bg-rose-100 px-3 py-1 rounded-full">
                          Reject <AlertCircleIcon className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="px-6 py-4 bg-gradient-to-b from-transparent to-gray-50">
                <Button
                  onClick={() => handleViewDetails(dispute)}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-xl font-bold text-gray-900">
                {selectedDispute?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedDispute && (
              <div className="overflow-y-auto flex-1 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="bg-white border rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-500">Complainant</span>
                    <p className="mt-1 font-medium text-gray-900">{selectedDispute.complainant}</p>
                  </div>
                  <div className="bg-white border rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-500">Respondent</span>
                    <p className="mt-1 font-medium text-gray-900">{selectedDispute.respondent}</p>
                  </div>
                  <div className="bg-white border rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-500">Timestamp</span>
                    <p className="mt-1 font-medium text-gray-900">
                      {new Date(selectedDispute.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white border rounded-lg p-3">
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <p className="mt-1 font-medium text-gray-900">{selectedDispute.status}</p>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-3 mb-4">
                  <span className="text-sm font-medium text-gray-500">Reason</span>
                  <p className="mt-1 text-gray-900">{selectedDispute.reason}</p>
                </div>

                <div className="bg-white border rounded-lg p-3 mb-4">
                  <span className="text-sm font-medium text-gray-500">Details</span>
                  <p className="mt-1 text-gray-900">{selectedDispute.details}</p>
                </div>


                <div className="border rounded-lg p-3">
                  <h2 className="text-lg font-semibold mb-3">Vote Statistics</h2>
                  <div className="w-full overflow-x-auto">
                    <BarChart
                      width={400}
                      height={200}
                      data={[
                        { name: "Accept", votes: selectedDispute.votes.accept },
                        { name: "Reject", votes: selectedDispute.votes.reject }
                      ]}
                      margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="votes" fill="#4f46e5" />
                    </BarChart>
                  </div>
                </div>

                {/* <div className="flex justify-end mt-4">
                <Button 
                  onClick={closeDetailsModal} 
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Close
                </Button>
              </div> */}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DisputeTab;