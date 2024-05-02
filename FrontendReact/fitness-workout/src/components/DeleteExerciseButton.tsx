import IExercise from "../Interfaces/IExercise";

interface Props {
  color?: "primary" | "secondary" | "danger";
  children: string;
  exercise: any;
  onDelete: (exercise: IExercise) => void;
}

function HandleDelete(exerciseId: string) {
  fetch("api/exercise/" + exerciseId, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.log(error));
}

function Button({ color = "primary", children, exercise, onDelete }: Props) {
  let name = "btn btn-" + color;
  if (exercise !== null) {
    return (
      <button
        type="button"
        className={name}
        onClick={() => {
          HandleDelete(exercise.id);
          onDelete(exercise);
        }}
      >
        {children}
      </button>
    );
  }

  return <></>;
}

export default Button;
