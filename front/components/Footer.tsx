import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              About Us
            </Link>
            <p className="mt-2 text-sm text-gray-600">
             This is a open source blockchain platform which will completely solve the issues faced by a landlord - tenant system by integrating unique and innovative features
            </p>
          </div>
          
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600">Email: TeamRocket@outlook.com</p>
            <p className="text-gray-600">Phone: +91 8901265019</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Tor-Rent. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-primary mr-4">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

