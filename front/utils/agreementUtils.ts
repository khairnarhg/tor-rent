import { Agreement } from '@/types/Agreement'; // Import your Agreement type

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'; // Define your API base URL

export const getAgreements = async (tenantId: string | null, landlordId: string | null): Promise<Agreement[]> => {
    try {
        let url = `${API_BASE_URL}/agreements`;

        if (tenantId) {
            url += `?tenantId=${tenantId}`;
        } else if (landlordId) {
            url += `?landlordId=${landlordId}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching agreements: ${response.status}`);
        }
        const data = await response.json();
        return data as Agreement[]; // Type assertion (be careful with this)
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
};

export const getAgreementDetails = async (id: string): Promise<Agreement | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/agreements/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching agreement details: ${response.status}`);
        }
        const data = await response.json();
        return data as Agreement;
    } catch (error) {
        console.error(error);
        return null;
    }
};