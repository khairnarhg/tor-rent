import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateAgreementProps {
    showNewAgreementDialog: boolean;
    setShowNewAgreementDialog: (show: boolean) => void;
    fetchAgreements: () => void; // Refresh agreements list after creation
}

const CreateAgreementDialog: React.FC<CreateAgreementProps> = ({ showNewAgreementDialog, setShowNewAgreementDialog, fetchAgreements }) => {
    const [formData, setFormData] = useState({
        landlordName: "",
        tenantName: "",
        propertyAddress: "",
        rentAmount: "",
        securityDeposit: "",
        dueDate: "",
        startDate: "",
        endDate: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateAgreement = async () => {
        try {
            const response = await axios.post("http://localhost:5000/createAgreement", formData);
            alert(`Agreement Created Successfully!\nTx Hash: ${response.data.txHash}`);

            fetchAgreements(); // Refresh agreements list
            setShowNewAgreementDialog(false); // Close dialog
        } catch (error) {
            console.error("Error creating agreement:", error);
            alert("Failed to create agreement.");
        }
    };

    return (
        <Dialog open={showNewAgreementDialog} onOpenChange={(open) => setShowNewAgreementDialog(open)}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Rental Agreement</DialogTitle>
                    <DialogDescription>Enter the details for your new rental agreement</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input name="landlordName" placeholder="Landlord ETH" onChange={handleChange} />
                    <Input name="tenantName" placeholder="Tenant ETH" onChange={handleChange} />
                    <Input name="propertyAddress" placeholder="Property Address" onChange={handleChange} />
                    <Input name="rentAmount" type="number" placeholder="Rent Amount (ETH)" onChange={handleChange} />
                    <Input name="securityDeposit" type="number" placeholder="Deposit Amount (ETH)" onChange={handleChange} />
                    <label>Due Date:</label>
                    <Input name="dueDate" type="date" onChange={handleChange} />
                    <label>Start Date:</label>
                    <Input name="startDate" type="date" onChange={handleChange} />
                    <label>End Date:</label>
                    <Input name="endDate" type="date" onChange={handleChange} />
                    <Button onClick={handleCreateAgreement}>
                        Create Agreement
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAgreementDialog;
