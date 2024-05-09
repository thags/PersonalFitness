import IExercise from "./IExercise";

interface IWorkout {
  id?: number;
  name?: string;
  description?: string;
  note?: string;
  workoutExercise?: IExercise[];
}

export default IWorkout;
