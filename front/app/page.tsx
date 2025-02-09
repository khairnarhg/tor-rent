import Link from "next/link";
import { ArrowRight, Shield, Zap, BarChart } from "lucide-react";

export default function Home() {
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
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center bg-white text-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors shadow-lg"  
                    >
                        Start Renting with Blockchain
                        <ArrowRight className="ml-3 w-6 h-6" /> {/* Larger icon */}
                    </Link>
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