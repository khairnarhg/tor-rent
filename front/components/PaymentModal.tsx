import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CreditCard, Wallet, QrCode } from 'lucide-react';
import bcrypt from 'bcryptjs';

const PaymentModal = ({ isOpen, onClose, amount = 100 }) => {
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [transactionId, setTransactionId] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const handlePayment = async () => {
        console.log('cardDetails;', cardDetails)
        console.log('inside handlePayement function')
        if ((paymentMethod === 'credit' || paymentMethod === 'debit') && !cardDetails.cardNumber) {
            alert('Please enter card details');
            return;
        }

        const generatedId = '0x' + [...Array(64)].map(() => (Math.random() * 16 | 0).toString(16)).join('');
        setTransactionId(generatedId);


        try {
            const hashedCardNumber = await bcrypt.hash(cardDetails.cardNumber, 10);
            const hashedCvv = await bcrypt.hash(cardDetails.cvv, 10);

            const paymentDetails = {
                sender: 'sender@example.com', // Replace with actual sender details
                recipient: 'recipient@example.com', // Replace with actual recipient details
                transactionId: generatedId,
                timestamp: Date.now(),
                ipAddress: '192.168.1.1', // Replace with actual IP address
                cardNumber: hashedCardNumber,
                cvv: hashedCvv,
                amount: amount,
                paymentMethod: paymentMethod,
            };

            const response = await fetch('/api/savePayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Get error details from the server
                throw new Error(`Payment failed: ${response.status} - ${errorData.error || 'Unknown error'}`);
            }


            setPaymentSuccess(true);
        } catch (error) {
            console.error('Error saving payment data:', error);
            // alert(error.message); // Show the error message to the user
        }
    };

  const PaymentMethodCard = ({ title, icon: Icon, value }) => (
    <Card 
      className={`relative cursor-pointer transition-all duration-200 ${
        paymentMethod === value 
          ? 'border-2 border-primary shadow-lg' 
          : 'hover:border-gray-300'
      }`}
      onClick={() => setPaymentMethod(value)}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
        <Icon className={`h-8 w-8 ${
          paymentMethod === value ? 'text-primary' : 'text-gray-500'
        }`} />
        <span className="font-medium">{title}</span>
        {paymentMethod === value && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2"
          >
            <Check className="h-5 w-5 text-primary" />
          </motion.div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {paymentSuccess ? 'Payment Successful!' : 'Complete Payment'}
          </DialogTitle>
        </DialogHeader>

        {!paymentSuccess ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Amount to Pay</span>
              <span className="text-2xl font-bold">${amount.toFixed(2)}</span>
            </div>

            <div className="space-y-4">
              <Label className="text-base">Select Payment Method</Label>
              <div className="grid grid-cols-3 gap-4">
                <PaymentMethodCard 
                  title="UPI Payment" 
                  icon={QrCode} 
                  value="upi" 
                />
                <PaymentMethodCard 
                  title="Credit Card" 
                  icon={CreditCard} 
                  value="credit" 
                />
                <PaymentMethodCard 
                  title="Debit Card" 
                  icon={Wallet} 
                  value="debit" 
                />
              </div>
            </div>

            {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ 
                      ...cardDetails, 
                      cardNumber: e.target.value 
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expirationDate}
                      onChange={(e) => setCardDetails({ 
                        ...cardDetails, 
                        expirationDate: e.target.value 
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      maxLength={3}
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ 
                        ...cardDetails, 
                        cvv: e.target.value 
                      })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === 'upi' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <QrCode className="h-48 w-48" />
                </div>
                <p className="text-sm text-gray-600">
                  Scan with any UPI app to pay
                </p>
              </motion.div>
            )}

            <div className="flex justify-end">
              <Button 
                size="lg"
                onClick={handlePayment}
                className="w-full sm:w-auto"
              >
                Pay ${amount.toFixed(2)}
              </Button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-6"
          >
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                Payment Completed Successfully
              </p>
              <p className="text-sm text-gray-500">
                Your transaction ID: {transactionId.slice(0, 12)}...
              </p>
            </div>

            <Button 
              variant="outline" 
              onClick={onClose}
              className="mt-4"
            >
              Close
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;