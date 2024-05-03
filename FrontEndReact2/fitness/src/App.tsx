import "./App.css";
import CreateExercise from "./components/CreateExercise";
import ListExercises from "./components/ListExercises";
import ListWorkouts from "./components/ListWorkouts";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ModeToggle />
      <ListExercises
        onSelectItem={() => console.log("you selected something")}
      ></ListExercises>
      <CreateExercise></CreateExercise>
      <ListWorkouts />
    </ThemeProvider>
  );
}

export default App;
