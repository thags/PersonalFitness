import IWorkout from "@/Interfaces/IWorkout";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import CreateWorkout from "./workouts/CreateWorkout";
import EditWorkout from "./workouts/EditWorkout";
import IExercise from "@/Interfaces/IExercise";

function Workouts() {
  const [workoutList, setWorkoutList] = useState<IWorkout[]>([]);
  const [exerciseList, setExerciseList] = useState<IExercise[]>([]);

  let onCreateWorkout = (workout: IWorkout) => {
    let newList = [...workoutList, workout];
    setWorkoutList(newList);
  };

  let onEditWorkout = (workout: IWorkout) => {
    console.log(workout);
  };

  useEffect(() => {
    fetch("api/workout", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setWorkoutList(data);
      })
      .catch((error) => console.log(error));
    
    fetch("api/exercise", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setExerciseList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Table>
        <TableHeader>
          <CreateWorkout onCreateWorkout={onCreateWorkout} />
        </TableHeader>
        <TableBody className="align-content-center justify-content-center">
          {workoutList.length === 0 && <p>No workouts found</p>}
          {workoutList.map((x: IWorkout) => (
            <TableRow key={x.id}>
              <TableCell>
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>{x.name}</CardTitle>
                    <CardDescription>{x.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <EditWorkout
                      onEditWorkout={onEditWorkout}
                      editWorkout={x}
                      exercises={exerciseList}
                    ></EditWorkout>
                    <Button>Log</Button>
                  </CardFooter>
                </Card>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
export default Workouts;
