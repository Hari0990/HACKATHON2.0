import HospitalList from "@/components/hospital-list"

export default function HospitalsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Hospitals & Doctors</h1>
      <HospitalList />
    </div>
  )
}
