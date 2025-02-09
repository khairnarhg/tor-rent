import { useState, useEffect } from "react";
import CreateAgreementDialog from "./AgreementsTab";
import AgreementCard from "./AgreementCard";
import axios from "axios";

const AgreementsPage = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [agreements, setAgreements] = useState<Agreement[]>([]);

    const fetchAgreements = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getAgreements");
            setAgreements(response.data);
        } catch (error) {
            console.error("Error fetching agreements:", error);
        }
    };

    useEffect(() => {
        fetchAgreements();
    }, []);

    return (
        <div>
            <button onClick={() => setShowDialog(true)} className="bg-green-500 p-2 rounded text-white">
                Create New Agreement
            </button>

            <CreateAgreementDialog 
                showNewAgreementDialog={showDialog} 
                setShowNewAgreementDialog={setShowDialog} 
                fetchAgreements={fetchAgreements}
            />

            <h2 className="text-xl font-semibold mt-6">Existing Agreements</h2>
            <div className="grid gap-4">
                {agreements.length > 0 ? (
                    agreements.map((agreement) => (
                        <AgreementCard key={agreement.id} agreement={agreement} />
                    ))
                ) : (
                    <p className="text-gray-500">No agreements found.</p>
                )}
            </div>
        </div>
    );
};

export default AgreementsPage;
