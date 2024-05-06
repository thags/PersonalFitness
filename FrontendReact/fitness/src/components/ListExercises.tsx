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
  onListRemove: (id?: number) => void;
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
            <TableHead>Instruction</TableHead>
            <TableHead>
              <div className="grid auto-rows-auto">
                <div className="justify-items-start">Actions</div>
                <div className="justify-items-end">
                  <CreateExercise onCreateExercise={onListAdd} />
                </div>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exerciseList.length === 0 && <p>No exercises found</p>}
          {exerciseList.map((item: IExercise) => (
            <TableRow key={item.id}>
              <TableCell scope="row">{item.name}</TableCell>
              <TableCell>{item.repType}</TableCell>
              <TableCell>{item.instruction}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => onListRemove(item.id)}
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
