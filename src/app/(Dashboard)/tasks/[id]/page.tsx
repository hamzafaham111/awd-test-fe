"use client";
import { useParams } from "next/navigation";
import { tasks } from "@/data/dummyTasks";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export default function TaskDetailsPage() {
  const params = useParams();
  const id = 1;
  const task = tasks.find(t => t.id === id);

  if (!task) return <div className="p-6">Task not found</div>;

  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Tasks", href: "/tasks" }, { label: "Details" }]} />
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">{task.vehicle}</h2>
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-4">
          <div className="text-gray-700 text-lg font-semibold">Request ID {task.id}</div>
          <div className="text-gray-700">Inspector: <span className="font-semibold">{task.inspector}</span></div>
          <div className="text-gray-700">Status: <span className="font-semibold">{task.status}</span></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">VIN</h3>
            <div className="mb-1">VIN: <span className="font-bold">{task.vin}</span></div>
            <div>Dealership: <span className="font-bold">{task.details.dealership}</span></div>
            <div>Inspection Address: <span className="font-bold">{task.location}</span></div>
            <div>ZIP: <span className="font-bold">{task.details.zip}</span></div>
            <div>Email: <span className="font-bold">{task.details.email}</span></div>
            <div>Phone: <span className="font-bold">{task.details.phone}</span></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Vehicle Details</h3>
            <div>Vehicle: <span className="font-bold">{task.details.vehicle}</span></div>
            <div>Transmission: <span className="font-bold">{task.details.transmission}</span></div>
            <div>Drivetrain: <span className="font-bold">{task.details.drivetrain}</span></div>
            <div>Odometer: <span className="font-bold">{task.details.mileage}</span></div>
            <div>Year: <span className="font-bold">{task.details.year}</span></div>
            <div>Make: <span className="font-bold">{task.details.make}</span></div>
            <div>Model: <span className="font-bold">{task.details.model}</span></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Vehicle Condition</h3>
            <div>Mechanical/Electrical: <span className="font-bold">{task.details.condition.mechanical}</span></div>
            <div>Frame Damage: <span className="font-bold">{task.details.condition.frame}</span></div>
            <div>Factory Emissions: <span className="font-bold">{task.details.condition.emissions}</span></div>
            <div>Driveability: <span className="font-bold">{task.details.condition.driveability}</span></div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 mb-2">Expected Reserve Price</h3>
          <div className="text-2xl font-bold text-blue-900">{task.details.reservePrice}</div>
          <div className="text-gray-700">Description: {task.details.description}</div>
        </div>
      </div>
    </div>
  );
} 