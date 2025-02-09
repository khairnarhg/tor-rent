// app/api/payment/route.js
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const paymentDetails = await req.json();
        console.log('paymentDetails:', paymentDetails);

        // 1. Determine the correct data directory path (more robust):
        const dataDirectory = path.join(process.cwd(), 'data'); // process.cwd() is reliable

        // 2. Create the data directory (if it doesn't exist):
        await fs.mkdir(dataDirectory, { recursive: true }); // recursive: true is important

        const dataFilePath = path.join(dataDirectory, 'payments.json');

        let payments = [];
        try {
            const existingData = await fs.readFile(dataFilePath, 'utf8');
            payments = JSON.parse(existingData);
        } catch (readError) {
            if (readError.code !== 'ENOENT') { // File doesn't exist (OK)
                console.error('Error reading payment data file:', readError);
                return new NextResponse(JSON.stringify({ error: 'Failed to read payment data' }), { status: 500 });
            }
        }

        payments.push(paymentDetails);

        // 3. Write to the file:
        await fs.writeFile(dataFilePath, JSON.stringify(payments, null, 2), 'utf8');

        return new NextResponse(JSON.stringify({ message: 'Payment data saved successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to save payment data' }), { status: 500 });
    }
}