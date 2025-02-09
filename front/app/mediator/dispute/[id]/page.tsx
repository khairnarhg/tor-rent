"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DisputeDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [dispute, setDispute] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const fetchDisputeDetails = async () => {
            try {
                const res = await fetch(/api/disputes/${id}); // API call to get details
                if (!res.ok) {
                    throw new Error(HTTP error! status: ${res.status});
                }
                const data = await res.json();
                setDispute(data);
            } catch (err) {
                console.error("Error fetching dispute details:", err);
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false regardless of success/failure
            }
        };

        if (id) { // Check if id is available
            fetchDisputeDetails();
        }

    }, [id]);

    if (loading) {
        return <div>Loading dispute details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!dispute) {
        return <div>Dispute not found.</div>; // Handle the case where the dispute is not found
    }

    const chartData = [
        { name: 'Accept', votes: dispute.votes?.accept || 0 }, // Use optional chaining and default value
        { name: 'Reject', votes: dispute.votes?.reject || 0 },
    ];

    return (
        <div>
            <h1>{dispute.title}</h1>
            <p><strong>Complainant:</strong> {dispute.complainant}</p>
            {/* ... other details */}
            <ReactPlayer url={dispute.videoUrl} controls />
            <BarChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votes" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default DisputeDetails;