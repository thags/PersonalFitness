import IExercise from "./IExercise";

interface IWorkout {
  id?: number;
  name?: string;
  description?: string;
  note?: string;
  workoutExercises?: IExercise[];
}

export default IWorkout;
