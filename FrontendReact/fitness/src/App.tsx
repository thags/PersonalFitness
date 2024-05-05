import "./App.css";
import Exercises from "./components/Exercises";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ModeToggle />
      <Exercises />
    </ThemeProvider>
  );
}

export default App;
