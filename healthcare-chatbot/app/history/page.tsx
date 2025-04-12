"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, FileText } from "lucide-react"

// Sample data
const appointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    hospitalName: "City General Hospital",
    date: "2023-06-10",
    time: "9:00 AM",
    type: "Virtual",
    status: "completed",
    notes: "Annual checkup. Blood pressure normal. Recommended regular exercise.",
  },
  {
    id: 2,
    doctorName: "Dr. Michael Chen",
    specialization: "Neurology",
    hospitalName: "City General Hospital",
    date: "2023-05-15",
    time: "11:00 AM",
    type: "In-Person",
    status: "completed",
    notes: "Patient reported headaches. Prescribed pain medication and recommended follow-up in 2 weeks.",
  },
  {
    id: 3,
    doctorName: "Dr. Emily Rodriguez",
    specialization: "Orthopedics",
    hospitalName: "City General Hospital",
    date: "2023-06-20",
    time: "2:00 PM",
    type: "Virtual",
    status: "upcoming",
    notes: "",
  },
  {
    id: 4,
    doctorName: "Dr. James Wilson",
    specialization: "Oncology",
    hospitalName: "Memorial Medical Center",
    date: "2023-06-25",
    time: "10:00 AM",
    type: "In-Person",
    status: "upcoming",
    notes: "",
  },
]

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredAppointments =
    activeTab === "all" ? appointments : appointments.filter((appointment) => appointment.status === activeTab)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Appointment History</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-500">{appointment.specialization}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{appointment.hospitalName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{appointment.date}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center mt-4 md:mt-0">
                      <Badge
                        className={`mr-3 ${
                          appointment.type === "Virtual" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {appointment.type}
                      </Badge>

                      <Badge
                        className={`${
                          appointment.status === "completed"
                            ? "bg-gray-100 text-gray-800"
                            : appointment.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Doctor's Notes</p>
                          <p className="text-sm text-gray-600">{appointment.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {appointment.status === "upcoming" && (
                    <div className="flex gap-3 mt-4 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        Cancel
                      </Button>
                    </div>
                  )}

                  {appointment.status === "completed" && (
                    <div className="flex gap-3 mt-4 pt-4 border-t">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Book Follow-up
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
