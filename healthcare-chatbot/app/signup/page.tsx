import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PatientSignupForm from "@/components/patient-signup-form"
import DoctorSignupForm from "@/components/doctor-signup-form"

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>

        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="patient">Patient</TabsTrigger>
            <TabsTrigger value="doctor">Doctor</TabsTrigger>
          </TabsList>

          <TabsContent value="patient">
            <PatientSignupForm />
          </TabsContent>

          <TabsContent value="doctor">
            <DoctorSignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
