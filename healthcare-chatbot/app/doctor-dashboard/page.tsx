import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DoctorAppointments from "@/components/doctor-appointments"
import DoctorProfile from "@/components/doctor-profile"

export default function DoctorDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <DoctorAppointments />
        </TabsContent>

        <TabsContent value="profile">
          <DoctorProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}
