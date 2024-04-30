import { useEffect, useState } from "react";

interface Props {
  //CreateExercisesApi: string;
  onCreateExercise: (item: string) => void;
}

interface CreateExercise {
  name: string;
  repType: "Reps" | "Time" | "Weight" | "Distance";
  instruction: string;
}

function HandleCreateExercise(createExercise: CreateExercise) {
  fetch("api/exercise/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createExercise),
  }).catch((error) => console.log(error));
}

function CreateExercise({ onCreateExercise }: Props) {
  let HandleFormSubmit = (event: any) => {
    event.preventDefault();
    let exercise: CreateExercise = {
      name: event.target[0].value,
      repType: event.target[1].value,
      instruction: event.target[2].value,
    };
    console.log(exercise);
    HandleCreateExercise(exercise);
    onCreateExercise(exercise.name);
  };

  return (
    <>
      <form onSubmit={HandleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="exerciseName" className="form-label">
            Exercise Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exerciseName"
            aria-describedby="Exercise name"
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="reptype">Rep Type</label>
          <select id="reptype" className="form-control">
            <option selected>Reps</option>
            <option>Time</option>
            <option>Weight</option>
            <option>Distance</option>
            <option>RepsAndWeight</option>
            <option>Bodyweight</option>
            <option>RepsAndBodyWeight</option>
            <option>TimeAndWeight</option>
            <option>TimeAndBodyWeight</option>
            <option>DistanceAndWeight</option>
            <option>DistanceAndBodyWeight</option>
            <option>TimeAndDistance</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exerciseinstruction" className="form-label">
            Instruction
          </label>
          <input
            type="text"
            className="form-control"
            id="exerciseinstruction"
            aria-describedby="Exercise Instruction"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateExercise;
