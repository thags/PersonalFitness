import "./App.css";
import Workouts from "./components/workouts/Workouts";
import { ModeToggle } from "./components/ui/mode-toggle";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ModeToggle />
      <Workouts />
    </ThemeProvider>
  );
}

export default App;
