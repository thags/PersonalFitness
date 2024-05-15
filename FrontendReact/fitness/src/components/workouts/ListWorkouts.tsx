import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TabledHeader,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import IWorkout from "@/Interfaces/IWorkout";

function ListWorkouts() {
  //get list of workouts
  //return as a table
  const [workoutList, setWorkoutList] = useState<IWorkout[]>([]);

  useEffect(() => {
    fetch("api/workout", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setWorkoutList(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workoutList.length === 0 && <p>No workouts found. Create one!</p>}
          {workoutList.map((workout: IWorkout) => (
            <TableRow>
              <TableCell>{workout.name}</TableCell>
              <TableCell>{workout.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ListWorkouts;
