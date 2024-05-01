import { useEffect, useState } from "react";
import DeleteExerciseButton from "./DeleteExerciseButton";

interface Props {
  BaseApiUrl: string;
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListExercises({ BaseApiUrl, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    fetch(BaseApiUrl + "exercise", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setExerciseList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const HandleDelete = () => console.log("deleted");

  return (
    <>
      <h1>{heading}</h1>
      {exerciseList.length === 0 && <p>No exercises found</p>}
      <ul className="list-group">
        {exerciseList.map((item, index) => (
          <li
            key={index}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
              setSelectedExercise(item);
            }}
          >
            {item["name"]}
          </li>
        ))}
      </ul>
      <DeleteExerciseButton
        color="danger"
        baseApiUrl={BaseApiUrl}
        exercise={selectedExercise}
        onDelete={HandleDelete}
      >
        Delete
      </DeleteExerciseButton>
    </>
  );
}

export default ListExercises;
