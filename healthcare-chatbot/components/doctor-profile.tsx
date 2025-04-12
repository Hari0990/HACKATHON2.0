"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Sample doctor data
const doctorData = {
  id: 1,
  firstName: "Sarah",
  lastName: "murthy",
  email: "sarah.murthy@example.com",
  phone: "123-456-7890",
  specialization: "Cardiology",
  experience: "15",
  languages: "English, tamil",
  qualifications:
    "MD from Harvard Medical School\nBoard Certified in Cardiology\nFellow of the American College of Cardiology",
  availability: [
    { day: "Monday", available: true, startTime: "09:00", endTime: "17:00" },
    { day: "Tuesday", available: true, startTime: "09:00", endTime: "17:00" },
    { day: "Wednesday", available: true, startTime: "09:00", endTime: "17:00" },
    { day: "Thursday", available: true, startTime: "09:00", endTime: "17:00" },
    { day: "Friday", available: true, startTime: "09:00", endTime: "17:00" },
    { day: "Saturday", available: false, startTime: "09:00", endTime: "13:00" },
    { day: "Sunday", available: false, startTime: "09:00", endTime: "13:00" },
  ],
}

export default function DoctorProfile() {
  const [profile, setProfile] = useState(doctorData)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvailabilityChange = (day: string, field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      availability: prev.availability.map((item) => (item.day === day ? { ...item, [field]: value } : item)),
    }))
  }

  const handleSave = () => {
    console.log("Saving profile:", profile)
    setIsEditing(false)
    // Handle save logic here
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="space-x-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditing} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              {isEditing ? (
                <Select
                  value={profile.specialization}
                  onValueChange={(value) => handleSelectChange("specialization", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="general">General Medicine</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input id="specialization" value={profile.specialization} disabled />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                value={profile.experience}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages Spoken</Label>
              <Input
                id="languages"
                name="languages"
                value={profile.languages}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Textarea
                id="qualifications"
                name="qualifications"
                value={profile.qualifications}
                onChange={handleChange}
                rows={4}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Availability Schedule</h3>
          <div className="space-y-4">
            {profile.availability.map((item) => (
              <div key={item.day} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="font-medium">{item.day}</div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={item.available}
                    onCheckedChange={(checked) => handleAvailabilityChange(item.day, "available", checked)}
                    disabled={!isEditing}
                  />
                  <Label>{item.available ? "Available" : "Unavailable"}</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${item.day}-start`}>Start Time</Label>
                  <Input
                    id={`${item.day}-start`}
                    type="time"
                    value={item.startTime}
                    onChange={(e) => handleAvailabilityChange(item.day, "startTime", e.target.value)}
                    disabled={!isEditing || !item.available}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${item.day}-end`}>End Time</Label>
                  <Input
                    id={`${item.day}-end`}
                    type="time"
                    value={item.endTime}
                    onChange={(e) => handleAvailabilityChange(item.day, "endTime", e.target.value)}
                    disabled={!isEditing || !item.available}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
