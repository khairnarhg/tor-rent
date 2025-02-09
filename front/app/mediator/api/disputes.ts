// pages/api/disputes.js
import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for disputes (replace this with your database logic)
const disputes = [
    {
        id: '1',
        title: 'Dispute 1',
        description: 'Description of dispute 1',
        sender: 'tenant@example.com',
        receiver: 'landlord@example.com',
        timestamp: new Date().toISOString(),
        status: 'Open',
        hasVoted: false,
        voteType: null,
        voteStats: [
            { type: 'accept', count: 5 },
            { type: 'reject', count: 2 },
        ],
    },
    {
        id: '2',
        title: 'Dispute 2',
        description: 'Description of dispute 2',
        sender: 'landlord@example.com',
        receiver: 'tenant@example.com',
        timestamp: new Date().toISOString(),
        status: 'Open',
        hasVoted: false,
        voteType: null,
        voteStats: [
            { type: 'accept', count: 3 },
            { type: 'reject', count: 1 },
        ],
    },
];

// pages/api/disputes.js
export default function handler(req, res) {
    if (req.method === 'GET') {
        // Return the disputes data
        res.status(200).json(disputes);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
