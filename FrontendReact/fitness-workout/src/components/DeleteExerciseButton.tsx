interface Props {
  color?: "primary" | "secondary" | "danger";
  children: string;
  exercise: any;
  onDelete: () => void;
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
          onDelete();
        }}
      >
        {children}
      </button>
    );
  }

  return <></>;
}

export default Button;