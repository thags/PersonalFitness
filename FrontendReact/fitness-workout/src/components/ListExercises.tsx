import { useEffect, useState } from "react";

interface Props {
  exercisesApi: string;
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListExercises({ exercisesApi, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    fetch(exercisesApi, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setExerciseList(data);
      })
      .catch((error) => console.log(error));
  }, []);

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
            }}
          >
            {item["name"]}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListExercises;
