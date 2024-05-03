import "./App.css";
import CreateExercise from "./components/CreateExercise";
import ListExercises from "./components/ListExercises";
import ListWorkouts from "./components/ListWorkouts";

function App() {
  return (
    <>
      <ListExercises
        onSelectItem={() => console.log("you selected something")}
      ></ListExercises>
      <CreateExercise></CreateExercise>
      <ListWorkouts />
    </>
  );
}

export default App;
