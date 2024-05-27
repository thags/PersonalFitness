import IWorkout from "@/Interfaces/IWorkout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  workout: IWorkout;
}

function LogWorkout({ workout }: Props) {
  const IExerciseSchema = z.object({
    id: z.number(),
    name: z.string(),
    repType: z.number(),
    instruction: z.string(),
    bodyWeight: z.boolean(),
    reps: z.any(),
    sets: z.any(),
    weight: z.any(),
  });

  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    note: z.string(),
    workoutExercises: z.array(IExerciseSchema),
  });

  let getDefaultValues = () => {
    return {
      name: workout.name,
      description: workout.description,
      note: workout.note,
      workoutExercises:
        workout.workoutExercises != null
          ? workout.workoutExercises.map((exercise) => ({
              ...exercise,
              sets: "0",
              reps: "0",
              weight: "0",
            }))
          : [],
    };
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.workoutExercises.map((exercise) => {
      let postValues = {
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
      };
      fetch("api/exerciseHistory/" + exercise.id.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(postValues, null, 2),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    });
    form.reset();
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Log</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w[425px]">
          <DialogHeader>
            <DialogTitle>Log Workout</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 item-center"
            >
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Note" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workoutExercises"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Exercises</FormLabel>
                    </div>
                    <table className="table-auto">
                      <thead>
                        <tr>
                          <th className="px-4 py-2">Exercise</th>
                          <th className="px-4 py-2">Sets</th>
                          <th className="px-4 py-2">Reps / Duration</th>
                          <th className="px-4 py-2">Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workout.workoutExercises?.map((item, index) => (
                          <tr key={item.id}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">
                              <Controller
                                control={form.control}
                                name={`workoutExercises[${index}].sets` as any}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    placeholder="Sets"
                                    {...field}
                                  />
                                )}
                              />
                            </td>
                            <td className="border px-4 py-2">
                              <Controller
                                control={form.control}
                                name={`workoutExercises[${index}].reps` as any}
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    placeholder="Reps"
                                    {...field}
                                  />
                                )}
                              />
                            </td>
                            <td className="border px-4 py-2">
                              <Controller
                                control={form.control}
                                name={
                                  `workoutExercises[${index}].weight` as any
                                }
                                render={({ field }) => (
                                  <Input
                                    type="number"
                                    placeholder="Weight"
                                    {...field}
                                  />
                                )}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LogWorkout;
