import "./App.css";
import Workouts from "./components/Workouts";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ModeToggle />
      <Workouts />
    </ThemeProvider>
  );
}

export default App;
