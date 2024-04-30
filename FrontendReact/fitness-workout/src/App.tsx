import ListExercises from "./components/ListExercises";
import Button from "./components/Button";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListExercises
        exercisesApi="api/exercise/"
        heading="Exercises"
        onSelectItem={handleSelectItem}
      />
      <Button onClick={() => console.log("you clicked me!")}>Accept</Button>
    </div>
  );
}

export default App;
