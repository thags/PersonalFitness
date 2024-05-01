interface Props {
  color?: "primary" | "secondary" | "danger";
  children: string;
  baseApiUrl: string;
  exercise: any;
  onDelete: () => void;
}

function HandleDelete(BaseApiUrl: string, exerciseId: string) {
  fetch(BaseApiUrl + "exercise/" + exerciseId, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.log(error));
}

function Button({
  color = "primary",
  children,
  baseApiUrl,
  exercise,
  onDelete,
}: Props) {
  let name = "btn btn-" + color;
  if (exercise !== null) {
    return (
      <button
        type="button"
        className={name}
        onClick={() => {
          HandleDelete(baseApiUrl, exercise.id);
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
