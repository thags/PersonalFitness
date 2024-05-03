import { useEffect, useState } from "react";
import IExercise from "../Interfaces/IExercise";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { error } from "console";

interface Props {
  onSelectItem: (item: string) => void;
}

function ListExercises({ onSelectItem }: Props) {
  const [exerciseList, setExerciseList] = useState<IExercise[]>([]);

  useEffect(() => {
    fetch("api/exercise", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setExerciseList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const HandleDelete = (exercise: IExercise) => {
    fetch("api/exercise/" + exercise.id, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => console.log(error));
    const newList = exerciseList.filter(
      (item: IExercise) => item.id !== exercise.id
    );
    setExerciseList(newList);
  };

  const HandleCreate = (exercise: IExercise) => {
    setExerciseList([...exerciseList, exercise]);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rep Type</TableHead>
            <TableHead>Insuction</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exerciseList.length === 0 && <p>No exercises found</p>}
          {exerciseList.map((item: IExercise) => (
            <TableRow onClick={() => onSelectItem(item.name)}>
              <TableCell scope="row">{item.name}</TableCell>
              <TableCell>{item.repType}</TableCell>
              <TableCell>{item.instruction}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => HandleDelete(item)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ListExercises;
