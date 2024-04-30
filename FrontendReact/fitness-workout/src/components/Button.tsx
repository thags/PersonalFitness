interface Props {
  color?: "primary" | "secondary" | "danger";
  children: string;
  onClick: () => void;
}

function Button({ color = "primary", children, onClick }: Props) {
  let name = "btn btn-" + color;
  return (
    <button type="button" className={name} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
