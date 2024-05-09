import IWorkout from "@/Interfaces/IWorkout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useEffect, useState } from "react";

function Workouts() {
    const [workoutList, setWorkoutList] = useState<IWorkout[]>([]);

    useEffect(() => {
      fetch("api/workout", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setWorkoutList(data);
        })
        .catch((error) => console.log(error));
    }, []);
    return (
        <>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                </TableRow>
            </TableHeader>
        <TableBody>
            {workoutList.length === 0 && <p>No workouts found</p>}
            {workoutList.map((x: IWorkout) => (
                <TableRow key={x.id}>
                    <TableCell>{x.name}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
        </>
    );
}
 export default Workouts;