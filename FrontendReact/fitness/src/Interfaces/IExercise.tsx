interface IExercise {
  id: number;
  name: string;
  repType: number;
  instruction: string;
  history: [];
  bodyWeight: boolean;
}

export default IExercise;
