"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface Dispute {
  id: number;
  title: string;
  complainant: string;
  respondent: string;
  reason: string;
  status: string;
  timestamp: string;
  details: string;
  votes: { accept: number; reject: number };
  hasVoted?: boolean;
  userVote?: "accept" | "reject" | null;
}

const sampleDisputes: Dispute[] = [
  {
    id: 1,
    title: "Rent Dispute",
    complainant: "Tenant A",
    respondent: "Landlord B",
    reason: "Late rent payment",
    status: "Open",
    timestamp: "2024-10-27 10:00 AM",
    details: "Tenant A was late on rent by 5 days. Landlord B is claiming a late fee.",
    votes: { accept: 5, reject: 3 },
  },
  {
    id: 2,
    title: "Damage Dispute",
    complainant: "Landlord B",
    respondent: "Tenant A",
    reason: "Property damage",
    status: "Closed",
    timestamp: "2024-10-26 02:30 PM",
    details: "Tenant A allegedly damaged the bathroom door. Landlord B is requesting compensation for repairs.",
    votes: { accept: 2, reject: 7 },
  },
];

const DisputesTab: React.FC = () => {
  const router = useRouter();
  const [disputes, setDisputes] = useState<Dispute[]>(
    sampleDisputes.map((dispute) => ({ ...dispute, hasVoted: false, userVote: null }))
  );
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const voteOnDispute = (disputeId: number, voteType: "accept" | "reject") => {
    setDisputes((prevDisputes) =>
      prevDisputes.map((dispute) => {
        if (dispute.id === disputeId && !dispute.hasVoted) {
          return {
            ...dispute,
            votes: { ...dispute.votes, [voteType]: dispute.votes[voteType] + 1 },
            hasVoted: true,
            userVote: voteType,
          };
        }
        return dispute;
      })
    );
  };

  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedDispute(null);
  };

  const chartData = selectedDispute
    ? [
        { name: "Accept", votes: selectedDispute.votes.accept },
        { name: "Reject", votes: selectedDispute.votes.reject },
      ]
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disputes</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complainant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Respondent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votes</th>
              <th className="px-6 py-3 relative">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute) => (
              <tr key={dispute.id} className={dispute.status === "Closed" ? "bg-gray-100" : ""}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{dispute.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{dispute.complainant}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{dispute.respondent}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{dispute.reason}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Button onClick={() => voteOnDispute(dispute.id, "accept")} className="bg-green-500 text-white rounded-full">
                      {dispute.votes.accept} <CheckCircleIcon className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => voteOnDispute(dispute.id, "reject")} className="bg-red-500 text-white rounded-full">
                      {dispute.votes.reject} <AlertCircleIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button onClick={() => handleViewDetails(dispute)}>View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDispute?.title}</DialogTitle>
            </DialogHeader>
            <ScrollArea>
              {selectedDispute && <p>{selectedDispute.details}</p>}
              <BarChart width={400} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votes" fill="#8884d8" />
              </BarChart>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DisputesTab;
