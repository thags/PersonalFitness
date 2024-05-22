type IExercise = {
  id: number;
  name: string;
  repType: number;
  instruction: string;
  history: [];
  bodyWeight: boolean;
  sets: number;
  reps: number;
  weight: number;
};

export default IExercise;
