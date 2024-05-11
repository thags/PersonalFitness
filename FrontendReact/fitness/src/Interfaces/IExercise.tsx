interface IExercise {
  id: number;
  name: string;
  repType: number;
  instruction: string;
  history: [];
  bodyweight: boolean;
}

export default IExercise;
