import IWorkoutExercise from "./IWorkoutExercise";

interface IWorkout {
  id?: number;
  name?: string;
  description?: string;
  note?: string;
  workoutExercise?: IWorkoutExercise[];
}

export default IWorkout;
