"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

export default function AdminPanel() {
    const router = useRouter();
    const [userRole, setUserRole] = useState({ address: "", role: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedUser = sessionStorage.getItem("userRole");
        if (storedUser) {
            setUserRole(JSON.parse(storedUser));
        } else {
            router.push("/");
        }
    }, []);

    async function handleVerify() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("http://localhost:5000/verifyUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:  JSON.stringify({
                    userAddress: userRole.address,
                    role: userRole.role,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Verification failed");

            alert("User Verified!");

            // Navigate to Tenant/Landlord page
            router.push(userRole.role === 1 ? "/tenant" : "/landlord");

        } catch (err) {
            console.error("Verification Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Admin Panel</h2>
            <p>User Address: {userRole.address}</p>
            <p>Role: {userRole.role === 1 ? "Tenant" : "Landlord"}</p>
            <button onClick={handleVerify} disabled={loading}>
                {loading ? "Verifying..." : "Verify"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
