import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateAgreementProps {
    showNewAgreementDialog: boolean;
    setShowNewAgreementDialog: (show: boolean) => void;
}

const CreateAgreementDialog: React.FC<CreateAgreementProps> = ({ showNewAgreementDialog, setShowNewAgreementDialog }) => {
    const [formData, setFormData] = useState({
        landlordName: "",
        tenantName: "",
        propertyAddress: "",
        rentAmount: "",
        securityDeposit: "",
        dueDate: "",
        startDate: "", // Added start date
        endDate: ""    // Added end date
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateAgreement = async () => {
        try {
            const response = await axios.post("http://localhost:5000/createAgreement", formData);

            alert(`Agreement Created Successfully!\nTx Hash: ${response.data.txHash}`);
            setShowNewAgreementDialog(false);
        } catch (error) {
            console.error("Error creating agreement:", error);
            alert("Failed to create agreement.");
        }
    };

    return (
        <Dialog open={showNewAgreementDialog} onOpenChange={setShowNewAgreementDialog}>
            <DialogTrigger asChild>
                <Button className="mb-6 bg-green-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Agreement
                </Button>
            </DialogTrigger>
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
                    <div>Due Date:</div>
                    <Input name="dueDate" type="date" onChange={handleChange} />
                    <div>Start Date:</div>
                    <Input name="startDate" type="date" onChange={handleChange} />
                    <div>End Date:</div>
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
