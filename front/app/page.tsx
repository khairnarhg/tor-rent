"use client";

import Link from "next/link";
import { ArrowRight, Shield, Zap, BarChart } from "lucide-react";
import react, {useState} from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [userAddress, setUserAddress] = useState("");
    const [role, setRole] = useState<1 | 2>(1); // Role: 1 for Tenant, 2 for Landlord
  
    // const handleVerify = async (selectedRole: 1 | 2) => {
    //   if (!userAddress) {
    //     alert("Please enter a valid user address.");
    //     return;
    //   }
  
    //   setRole(selectedRole); // Update role before API call
  
    //   try {
    //     const response = await fetch("http://localhost:5000/verifyUser", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ userAddress, role: selectedRole }),
    //     });
  
    //     const data = await response.json();
    //     if (response.ok) {
    //       alert(`User verified as ${selectedRole === 1 ? "Tenant" : "Landlord"}`);
    //     } else {
    //       alert(`Verification failed: ${data.error}`);
    //     }
    //   } catch (error) {
    //     console.error("Error verifying user:", error);
    //     alert("An error occurred while verifying the user.");
    //   }
    // };

    const handleVerify = (selectedRole: 1 | 2) => {
        if (!userAddress) {
            alert("Please enter a valid user address.");
            return;
        }
    
        const userData = { address: userAddress, role: selectedRole };
        sessionStorage.setItem("userRole", JSON.stringify(userData));
        
        router.push("/admin");
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-100"> {/* Added background color */}
            {/* Hero Section */}
            <section className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white py-24"> {/* Updated gradient */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"> {/* Improved typography */}
                        Secure Rental Agreements with Blockchain
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl mb-8 leading-relaxed"> {/* Improved typography */}
                        Automate payments, handle disputes, and ensure transparency in your rental agreements.
                    </p>
                    
                    <input
                        type="text"
                        placeholder="User Address"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        className="mb-5 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black "
                    />
                    <div>
                        <button  onClick={() => handleVerify(1)}>
                    <Link
                        href="/tenant"
                        className="inline-flex items-center bg-white text-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors shadow-lg mr-4"

                    >
                        Tenant
                        <ArrowRight className="ml-3 w-6 h-6" /> {/* Larger icon */}
                    </Link>
                    </button>
                    <button  onClick={() => handleVerify(2)}>
                    <Link
                        href="/landlord"
                        className="inline-flex items-center bg-white text-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors shadow-lg"  
                    >
                        Landlord
                        <ArrowRight className="ml-3 w-6 h-6" /> {/* Larger icon */}
                    </Link>
                    </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white"> {/* White background for contrast */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16"> {/* Increased heading size */}
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12"> {/* Increased gap */}
                        <div className="text-center">
                            <div className="bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"> {/* Larger icons and background */}
                                <Shield className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4"> {/* Increased heading size */}
                                Secure Agreements
                            </h3>
                            <p className="text-gray-700 leading-relaxed"> {/* Improved text color and leading */}
                                Create and sign rental agreements securely on the blockchain, ensuring immutability and transparency.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">
                                Automated Payments
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Set up automatic rent payments using smart contracts, reducing late payments and administrative work.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                <BarChart className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">
                                Dispute Resolution
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Handle disputes efficiently with a transparent, blockchain-based resolution process.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}