# Tor-Rent: Revolutionizing Rentals with Blockchain

## Overview

Tor-Rent is a blockchain-based rental system designed to secure rental agreements and streamline the rental process. It addresses the limitations of the current rental system by providing a transparent, secure, and efficient platform for landlords and tenants.
![image](https://github.com/user-attachments/assets/92b331ca-8b8e-4959-ae69-bf46e78f193e)


## Features

* **Immutable Agreements:** Landlords and tenants sign an immutable agreement at the start of their term, providing a tamper-proof record for dispute resolution.
* **Automated Payments:** Smart contracts automate rent payments, with penalties for late payments as per contract rules.
* **Identity Verification:** Admin authentication ensures that only verified users can access the blockchain, enhancing security.
* **Dispute Resolution:** A transparent and unbiased dispute resolution system is established using mediators.

## Key Benefits

* **Reduced Rental Fraud:** Blockchain technology minimizes the risk of forged agreements and scams.
* **Timely Payments:** Automated payments help prevent delayed or missed payments.
* **Efficient Dispute Resolution:** Smart contracts and mediators facilitate fair and efficient dispute resolution.
* **Enhanced Transparency:** All transactions and agreements are recorded on the blockchain, providing a clear and auditable history.

## Tor-Rent System Flow

The Tor-Rent system includes the following components:

* **Landing Page:** Offers login options for tenants and landlords [00:02].
* **Tenant Dashboard:** Allows tenants to manage properties, view notifications, agreements, payments, and messages [00:41].
* **Landlord Dashboard:** Enables landlords to manage agreements, create new agreements, view payments, disputes, and add properties [01:51].
* **Mediator Dashboard:** Used to manage disputes and agreements [03:03].

## Tech Stack

* Solidity
* Hardhat
* Metamask
* Ethereum
* Ganache
* Next.js
* Remix

## Smart Contract Architecture

The system consists of three interconnected smart contracts:

* **Identity Verification Contract:** Uses Soulbound Tokens (SBTs) to link identity permanently to the Ethereum address.
* **Rent Agreement Contract:** Creates immutable contracts between verified landlords and tenants, tracking rent payments and rules.
* **Dispute Resolution Contract:** Retrieves information from the Rent Agreement Contract and uses a voting system with mediators to resolve disputes.

## Developed at SPIT HACKATHON 2025

## Links

* YouTube Video: [Tor-Rent Demo](https://youtu.be/kiYrLw_MvrQ)
* Presentation PDF: [SPIT Hackathon 2025 - Tor-Rent](https://drive.google.com/file/d/1Q2SII_bzQCKNhnggRtkPTRILlNYl6cGF/view?usp=sharing)
