// api.js

// Function to fetch disputes
export const getDisputes = async () => {
    try {
        const res = await fetch('/api/disputes');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching disputes:", error);
        throw error; // Re-throw the error for the component to handle
    }
};

// Function to fetch notifications
export const getNotifications = async () => {
    try {
        const res = await fetch('/api/notifications'); // Replace with your API endpoint
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

// Function to fetch dispute details
export const getDisputeDetails = async (disputeId) => {
    try {
        const res = await fetch(`/api/disputes/${disputeId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching dispute details:", error);
        throw error;
    }
};

// Function to vote on a dispute
export const voteOnDisputeApi = async (disputeId, voteType) => {
    try {
        const res = await fetch(`/api/disputes/${disputeId}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ vote: voteType }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error voting:", error);
        throw error;
    }
};