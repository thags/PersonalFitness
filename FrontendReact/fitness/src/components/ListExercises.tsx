import { useEffect, useState } from "react";
import CreateExercise from "./CreateExercise";
import IExercise from "../Interfaces/IExercise";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

interface Props {
  onListRemove: () => void;
  onListAdd: () => void;
  exerciseList: IExercise[];
}

function ListExercises({ onListAdd, onListRemove, exerciseList }: Props) {

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rep Type</TableHead>
            <TableHead>Intruction</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exerciseList.length === 0 && <p>No exercises found</p>}
          {exerciseList.map((item: IExercise) => (
            <TableRow>
              <TableCell scope="row">{item.name}</TableCell>
              <TableCell>{item.repType}</TableCell>
              <TableCell>{item.instruction}</TableCell>
              <TableCell>
                <CreateExercise />
                <Button
                  variant="destructive"
                  onClick={() => onListRemove()}
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
