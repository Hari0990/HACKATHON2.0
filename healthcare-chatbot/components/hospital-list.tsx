"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Search, Filter } from "lucide-react"
import DoctorList from "./doctor-list"

// Sample data
const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    city: "Chennai",
    distance: "2.5 miles",
    rating: 4.5,
    specializations: ["Cardiology", "Neurology", "Orthopedics"],
    image: "img/aveksha.jpg",
  },
  {
    id: 2,
    name: "Memorial Medical Center",
    city: "Banglore",
    distance: "320 miles",
    rating: 4.8,
    specializations: ["Oncology", "Pediatrics", "Dermatology"],
    image: "img/Hospital-de-Bellvitge.jpg",
  },
  {
    id: 3,
    name: "University Health System",
    city: "Coimbatore",
    distance: "180 miles",
    rating: 4.2,
    specializations: ["Psychiatry", "Gastroenterology", "Endocrinology"],
    image: "img/images.jpg",
  },
  {
    id: 4,
    name: "Community Care Hospital",
    city: "Tirupati",
    distance: "40 miles",
    rating: 4.0,
    specializations: ["General Medicine", "Emergency Care", "Radiology"],
    image: "img/img/xeNTM3sPIeC72r55wXdotfBKJv3fJQepMEbruxCW.webp"
  },
]

export default function HospitalList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("hospitals")

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.specializations.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSelectHospital = (hospitalId: number) => {
    setSelectedHospital(hospitalId)
    setActiveTab("doctors")
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search hospitals, cities, or specializations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
        </TabsList>

        <TabsContent value="hospitals">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="overflow-hidden">
                <img
                  src={hospital.image || "/placeholder.svg"}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {hospital.city} ({hospital.distance})
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(hospital.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < hospital.rating
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">{hospital.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hospital.specializations.map((spec, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSelectHospital(hospital.id)}
                  >
                    Choose Doctor
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="doctors">
          {selectedHospital && (
            <div>
              <Button variant="outline" onClick={() => setActiveTab("hospitals")} className="mb-6">
                Back to Hospitals
              </Button>
              <h2 className="text-2xl font-semibold mb-6">
                {hospitals.find((h) => h.id === selectedHospital)?.name} - Available Doctors
              </h2>
              <DoctorList hospitalId={selectedHospital} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
