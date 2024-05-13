import IWorkout from "@/Interfaces/IWorkout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import CreateWorkout from "./CreateWorkout";

function Workouts() {
    const [workoutList, setWorkoutList] = useState<IWorkout[]>([]);

    let onCreateWorkout = (workout: IWorkout) => {
        let newList = [...workoutList, workout];
        setWorkoutList(newList);
    }

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
                      <CardDescription>
                        {x.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button>Edit</Button>
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