import RepType from "@/enums/RepType";

interface IWorkoutExercise {
  exerciseId?: number;
  exerciseName: string;
  instruction: string;
  reptype: RepType;
  sets: number;
  reps: number;
  durationInMinutes: 0;
  weight: number;
  distance: number;
  note: string;
}

export default IWorkoutExercise;
