"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, CalendarIcon, User, FileText } from "lucide-react"

// Sample data
const appointments = [
  {
    id: 1,
    patientName: "John Smith",
    patientId: 101,
    date: "2023-06-15",
    time: "9:00 AM",
    type: "Virtual",
    status: "upcoming",
    reason: "Annual checkup",
    patientHistory: [
      { date: "2022-12-10", diagnosis: "Common cold", treatment: "Prescribed antibiotics" },
      { date: "2022-06-15", diagnosis: "Annual checkup", treatment: "No issues found" },
    ],
  },
  {
    id: 2,
    patientName: "Emma Johnson",
    patientId: 102,
    date: "2023-06-15",
    time: "11:00 AM",
    type: "In-Person",
    status: "upcoming",
    reason: "Headache and dizziness",
    patientHistory: [
      { date: "2023-01-05", diagnosis: "Migraine", treatment: "Prescribed pain relievers" },
      { date: "2022-08-20", diagnosis: "Sinus infection", treatment: "Prescribed antibiotics" },
    ],
  },
  {
    id: 3,
    patientName: "Robert Davis",
    patientId: 103,
    date: "2023-06-14",
    time: "2:00 PM",
    type: "Virtual",
    status: "upcoming",
    reason: "Follow-up on medication",
    patientHistory: [
      { date: "2023-03-10", diagnosis: "Hypertension", treatment: "Prescribed blood pressure medication" },
      { date: "2022-09-15", diagnosis: "Annual checkup", treatment: "Recommended lifestyle changes" },
    ],
  },
  {
    id: 4,
    patientName: "Sophia Wilson",
    patientId: 104,
    date: "2023-06-10",
    time: "10:00 AM",
    type: "In-Person",
    status: "completed",
    reason: "Skin rash",
    patientHistory: [
      { date: "2023-02-20", diagnosis: "Eczema", treatment: "Prescribed topical cream" },
      { date: "2022-11-05", diagnosis: "Allergic reaction", treatment: "Prescribed antihistamines" },
    ],
  },
]

export default function DoctorAppointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("upcoming")

  const filteredAppointments = appointments.filter((appointment) => appointment.status === activeTab)

  const handleViewPatientHistory = (appointmentId: number) => {
    setSelectedAppointment(appointmentId)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" /> Calendar
            </h3>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="border rounded-md" />

            <div className="mt-6">
              <h4 className="font-medium mb-2">Today's Schedule</h4>
              <div className="space-y-3">
                {appointments
                  .filter((apt) => apt.date === "2023-06-15")
                  .map((apt) => (
                    <div key={apt.id} className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{apt.time}</span>
                      <span className="mx-2">-</span>
                      <span>{apt.patientName}</span>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
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
                        <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
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

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewPatientHistory(appointment.id)}
                            >
                              View History
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Patient History - {appointment.patientName}</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="flex items-start mb-4">
                                <User className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="font-medium">Patient ID</p>
                                  <p className="text-sm text-gray-600">#{appointment.patientId}</p>
                                </div>
                              </div>

                              <div className="flex items-start mb-4">
                                <FileText className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="font-medium">Current Appointment Reason</p>
                                  <p className="text-sm text-gray-600">{appointment.reason}</p>
                                </div>
                              </div>

                              <h4 className="font-semibold mt-6 mb-3">Previous Visits</h4>
                              {appointment.patientHistory.map((record, index) => (
                                <div key={index} className="border-b pb-3 mb-3 last:border-0">
                                  <p className="font-medium">{record.date}</p>
                                  <p className="text-sm">
                                    <span className="font-medium">Diagnosis:</span> {record.diagnosis}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Treatment:</span> {record.treatment}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm">
                        <span className="font-medium">Reason:</span> {appointment.reason}
                      </p>
                    </div>

                    {activeTab === "upcoming" && (
                      <div className="flex gap-3 mt-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Start Consultation
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          Cancel
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
    </div>
  )
}
