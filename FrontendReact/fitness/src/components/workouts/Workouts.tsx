import IWorkout from "@/Interfaces/IWorkout";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import EditWorkout from "./EditWorkout";
import IExercise from "@/Interfaces/IExercise";

function Workouts() {
  const [workoutList, setWorkoutList] = useState<IWorkout[]>([]);
  const [exerciseList, setExerciseList] = useState<IExercise[]>([]);

  let onEditWorkout = (
    workout: IWorkout,
    changeType: "edit" | "delete" | "create"
  ) => {
    if (workout.id == null) return;
    let newList: IWorkout[] = [];

    if (changeType === "delete") {
      newList = [...workoutList.filter((x) => x.id != workout.id)];
    } else if (changeType === "edit") {
      newList = [
        ...workoutList.map((x) => {
          if (x.id === workout.id) {
            x.description = workout.description;
            x.name = workout.name;
            x.note = workout.note;
            x.workoutExercises = workout.workoutExercises;
          }
          return x;
        }),
      ] as unknown as IWorkout[];
    } else if (changeType === "create") {
      newList = [...workoutList, workout];
    }

    setWorkoutList(newList);
  };

  let onEditExercise = (
    exercise: IExercise,
    changeType: "edit" | "delete" | "create"
  ) => {
       if (exercise.id == null) return;
       let newList: IExercise[] = [];

       if (changeType === "delete") {
         newList = [...exerciseList.filter((x) => x.id != exercise.id)];
       } else if (changeType === "edit") {
         newList = [
           ...exerciseList.map((x) => {
             if (x.id === exercise.id) {
              x.name = exercise.name;
              x.instruction = exercise.instruction;
              x.bodyWeight = exercise.bodyWeight;
              x.repType = exercise.repType;
             }
             return x;
           }),
         ] as unknown as IExercise[];
       } else if (changeType === "create") {
         newList = [...exerciseList, exercise];
       }

       setExerciseList(newList);
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
          <EditWorkout
            onEditWorkout={onEditWorkout}
            exercises={exerciseList}
            onEditExercise={onEditExercise}
          />
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
                      onEditExercise={onEditExercise}
                    />
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
