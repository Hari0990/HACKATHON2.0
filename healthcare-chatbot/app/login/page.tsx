import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PatientLoginForm from "@/components/patient-login-form"
import DoctorLoginForm from "@/components/doctor-login-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="patient">Patient</TabsTrigger>
            <TabsTrigger value="doctor">Doctor</TabsTrigger>
          </TabsList>

          <TabsContent value="patient">
            <PatientLoginForm />
          </TabsContent>

          <TabsContent value="doctor">
            <DoctorLoginForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
