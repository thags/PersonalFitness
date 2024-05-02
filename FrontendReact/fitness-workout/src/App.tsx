import ListExercises from "./components/ListExercises";
import CreateExercise from "./components/CreateExercise";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListExercises onSelectItem={handleSelectItem} />
    </div>
  );
}

export default App;
