import { useEffect, useState } from "react";
import DeleteExerciseButton from "./DeleteExerciseButton";

interface Props {
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListExercises({ heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    fetch("api/exercise", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setExerciseList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const HandleDelete = () => console.log("deleted");

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
          {exerciseList.map((item: any) => (
            <tr>
              <th scope="row">{item.name}</th>
              <td>{item["repType"]}</td>
              <td>{item["instruction"]}</td>
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
    </>
  );
}

export default ListExercises;
