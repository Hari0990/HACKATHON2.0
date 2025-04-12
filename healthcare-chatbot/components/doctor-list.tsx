"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, Languages, Award } from "lucide-react"

// Sample data
const doctors = [
  {
    id: 1,
    hospitalId: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: "15 years",
    languages: ["English", "Spanish"],
    availability: [
      { day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
      { day: "Wednesday", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "12:00 PM", "3:00 PM"] },
    ],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    hospitalId: 1,
    name: "Dr. Michael Chen",
    specialization: "Neurology",
    experience: "12 years",
    languages: ["English", "Mandarin"],
    availability: [
      { day: "Tuesday", slots: ["8:00 AM", "10:00 AM", "3:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM", "1:00 PM", "5:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM", "12:00 PM"] },
    ],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    hospitalId: 1,
    name: "Dr. Emily Rodriguez",
    specialization: "Orthopedics",
    experience: "10 years",
    languages: ["English", "Spanish", "Portuguese"],
    availability: [
      { day: "Monday", slots: ["8:00 AM", "12:00 PM", "4:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM", "2:00 PM", "5:00 PM"] },
      { day: "Friday", slots: ["11:00 AM", "3:00 PM"] },
    ],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    hospitalId: 2,
    name: "Dr. James Wilson",
    specialization: "Oncology",
    experience: "18 years",
    languages: ["English", "French"],
    availability: [
      { day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
      { day: "Wednesday", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "12:00 PM"] },
    ],
    image: "/placeholder.svg?height=200&width=200",
  },
]

interface DoctorListProps {
  hospitalId: number
}

export default function DoctorList({ hospitalId }: DoctorListProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<string>("virtual")
  const [bookingDoctor, setBookingDoctor] = useState<number | null>(null)

  const filteredDoctors = doctors.filter((doctor) => doctor.hospitalId === hospitalId)

  const handleBookAppointment = (doctorId: number) => {
    setBookingDoctor(doctorId)
  }

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", {
      doctorId: bookingDoctor,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
    })
    // Handle booking logic here
    setBookingDoctor(null)
    setSelectedDate(undefined)
    setSelectedTime("")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDoctors.map((doctor) => (
        <Card key={doctor.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-4">
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h3 className="text-xl font-semibold text-center">{doctor.name}</h3>
              <Badge className="mt-2 bg-blue-600">{doctor.specialization}</Badge>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-start">
                <Award className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-sm text-gray-600">{doctor.experience}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Languages className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Languages</p>
                  <p className="text-sm text-gray-600">{doctor.languages.join(", ")}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Availability</p>
                  <p className="text-sm text-gray-600">{doctor.availability.map((a) => a.day).join(", ")}</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleBookAppointment(doctor.id)}
                >
                  Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="border rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Time</Label>
                    <Select onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctor.availability.flatMap((a) =>
                          a.slots.map((slot) => (
                            <SelectItem key={`${a.day}-${slot}`} value={`${a.day}-${slot}`}>
                              {a.day} - {slot}
                            </SelectItem>
                          )),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Appointment Type</Label>
                    <RadioGroup defaultValue="virtual" value={appointmentType} onValueChange={setAppointmentType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="virtual" id="virtual" />
                        <Label htmlFor="virtual">Virtual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="physical" id="physical" />
                        <Label htmlFor="physical">In-Person</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={handleConfirmBooking}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
