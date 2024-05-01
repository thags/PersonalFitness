import ListExercises from "./components/ListExercises";
import Button from "./components/Button";
import CreateExercise from "./components/CreateExercise";

const baseApiUrl: string = "api/";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListExercises
        BaseApiUrl={baseApiUrl}
        heading="Exercises"
        onSelectItem={handleSelectItem}
      />
      <Button onClick={() => console.log("you clicked me!")}>Accept</Button>

      <CreateExercise onCreateExercise={handleSelectItem} />
    </div>
  );
}

export default App;
