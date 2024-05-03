import { useEffect, useState } from "react";
import IExercise from "../../../../FrontEndReact2/fitness/src/Interfaces/IExercise";
import RepType from "../../../../FrontEndReact2/fitness/src/enums/RepType";

interface Props {
  //CreateExercisesApi: string;
  onCreateExercise: (item: IExercise) => void;
}

function HandleCreateExercise(createExercise: IExercise) {
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
    let exercise: IExercise = {
      name: event.target[0].value,
      repType: event.target[1].value,
      instruction: event.target[2].value,
    };
    console.log(exercise);
    HandleCreateExercise(exercise);
    onCreateExercise(exercise);
  };

  return (
    <>
      <form onSubmit={HandleFormSubmit}>
        <div className="row g-2 align-items-center">
          <div className="col-auto">
            <label htmlFor="exerciseName" className="form-label">
              Exercise Name
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="exerciseName"
              aria-describedby="Exercise name"
            />
          </div>
        </div>
        <div className="row g-2 align-items-center">
          <div className="col-auto">
            <label htmlFor="reptype">Rep Type</label>
          </div>
          <div className="col-auto">
            <select id="reptype" className="form-control">
              {Object.keys(RepType)
                .filter((key: any) => !isNaN(Number(RepType[key])))
                .map((key) => (
                  <option>{key}</option>
                ))}
              <option>TimeAndDistance</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <div className="row g-2 align-items-center">
            <div className="col-auto">
              <label htmlFor="exerciseinstruction" className="form-label">
                Instruction
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="exerciseinstruction"
                aria-describedby="Exercise Instruction"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateExercise;
