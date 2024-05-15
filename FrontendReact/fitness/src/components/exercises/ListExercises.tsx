import IExercise from "../../Interfaces/IExercise";
import { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

interface Props {
  parentform: any;
}

function ListExercises({ parentform }: Props) {
  const [exercises, setExercises] = useState<IExercise[]>([]);

  useEffect(() => {
    fetch("api/exercise", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {exercises.map((item) => (
        <FormField
          key={item.id}
          control={parentform.control}
          name="workoutExercises"
          render={({ field }) => {
            return (
              <FormItem
                key={item.id}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item])
                        : field.onChange(
                            field.value?.filter(
                              (value: IExercise) => value.id !== item.id
                            )
                          );
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">{item.name}</FormLabel>
              </FormItem>
            );
          }}
        />
      ))}
    </>
  );
}

export default ListExercises;
