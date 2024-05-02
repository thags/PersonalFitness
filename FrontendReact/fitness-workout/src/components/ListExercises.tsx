import { useEffect, useState } from "react";
import DeleteExerciseButton from "./DeleteExerciseButton";
import IExercise from "../Interfaces/IExercise";
import CreateExercise from "./CreateExercise";

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
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rep Type</th>
            <th scope="col">Instruction</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList.length === 0 && <p>No exercises found</p>}
          {exerciseList.map((item: IExercise) => (
            <tr>
              <th scope="row">{item.name}</th>
              <td>{item.repType}</td>
              <td>{item.instruction}</td>
              <td>
                <DeleteExerciseButton
                  color="danger"
                  exercise={item}
                  onDelete={HandleDelete}
                >
                  Delete
                </DeleteExerciseButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateExercise onCreateExercise={HandleCreate} />
    </>
  );
}

export default ListExercises;
