"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Web3 from "web3"

interface Web3ContextType {
  web3: Web3 | null
  account: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Providers({ children }: { children: ReactNode }) {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [account, setAccount] = useState<string | null>(null)

  const connect = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const web3Instance = new Web3(window.ethereum)
        setWeb3(web3Instance)
        const accounts = await web3Instance.eth.getAccounts()
        setAccount(accounts[0])
      } catch (error) {
        console.error("User denied account access")
      }
    } else {
      console.log("Please install MetaMask!")
    }
  }

  const disconnect = () => {
    setWeb3(null)
    setAccount(null)
  }

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null)
      })
    }

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {})
      }
    }
  }, [])

  return <Web3Context.Provider value={{ web3, account, connect, disconnect }}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}

