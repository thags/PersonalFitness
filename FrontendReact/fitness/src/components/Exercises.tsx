import { useState, useEffect } from "react";
import ListExercises from "./ListExercises";
import IExercise from "../Interfaces/IExercise";

function Exercises() {
  const [exercises, setExercises] = useState<IExercise[]>([]);

  const HandleListRemove = (id?: number) => {
    const newExercises: IExercise[] = exercises.filter(
      (value: IExercise) => value.id != id
    );

    setExercises(newExercises);
  };

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
        onListRemove={HandleListRemove}
        onListAdd={() => console.log("Added to list")}
      />
    </>
  );
}

export default Exercises;
