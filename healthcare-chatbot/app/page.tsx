import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Healthcare at Your Fingertips</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Connect with top doctors, book appointments, and get medical advice through our AI-powered chatbot.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <MessageCircle className="mr-2 h-5 w-5" />
            Start Chat
          </Button>
          <Button size="lg" variant="outline">
            <Calendar className="mr-2 h-5 w-5" />
            Book Appointment
          </Button>
        </div>

        <div className="relative w-full max-w-4xl">
          <img
            src="img/img/WhatsApp Image 2025-04-11 at 20.46.49_ae36db6f.jpg"
            alt="Healthcare chatbot illustration"
            className="rounded-lg shadow-xl w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Find Specialists</h3>
            <p className="text-muted-foreground mb-4">Connect with specialized doctors based on your medical needs.</p>
            <Link href="/hospitals" className="text-blue-600 flex items-center">
              Browse Doctors <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Book Appointments</h3>
            <p className="text-muted-foreground mb-4">
              Schedule in-person or virtual appointments at your convenience.
            </p>
            <Link href="/hospitals" className="text-blue-600 flex items-center">
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">AI Health Assistant</h3>
            <p className="text-muted-foreground mb-4">
              Get instant answers to your health questions from our AI chatbot.
            </p>
            <Link href="/chat" className="text-blue-600 flex items-center">
              Chat Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
