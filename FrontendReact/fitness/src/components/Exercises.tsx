import { useState, useEffect } from "react";
import ListExercises from "./ListExercises";
import IExercise from "../Interfaces/IExercise";

function Exercises() {
  const [exercises, setExercises] = useState<IExercise[]>([]);


  useEffect(() => {
    fetch("api/exercise", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ListExercises
        exerciseList={exercises}
        onListRemove={() => console.log("The list has changed")}
        onListAdd={() => console.log("Added to list")}
      />
    </>
  );
}

export default Exercises;
