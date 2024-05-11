import IWorkout from "@/Interfaces/IWorkout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ListExercises from "./ListExercises";
import { Checkbox } from "./ui/checkbox";
import IExercise from "@/Interfaces/IExercise";
import { useState, useEffect } from "react";

interface Props{
    onCreateWorkout?: (workout: IWorkout) => void;
}

function CreateWorkout({onCreateWorkout}: Props) {
      const [exercises, setExercises] = useState<IExercise[]>([]);

      useEffect(() => {
        fetch("api/exercise", { method: "GET" })
          .then((response) => response.json())
          .then((data) => {
            setExercises(data);
          })
          .catch((error) => console.log(error));
      }, []);
    const exerciseSchema = z.object({
        id: z.number(),
        name: z.string(),
        repType: z.number(),
        instruction: z.string(),
        history: z.array(z.any()),
        bodyweight: z.boolean(),
    })
    const formSchema = z.object({
        name: z.string(),
        description: z.string(),
        note: z.string(),
        workoutExercises: z.array(exerciseSchema),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            workoutExercises: []
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Create Workout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w[425px]">
            <DialogHeader>
              <DialogTitle>Create Workout</DialogTitle>
              <DialogDescription>
                Use this form to create a workout
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 item-center"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Workout Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>description</FormLabel>
                      <FormControl>
                        <Input placeholder="description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input placeholder="Note" {...field} />
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
                        <FormLabel className="text-base">Sidebar</FormLabel>
                        <FormDescription>
                          Select the items you want to display in the sidebar.
                        </FormDescription>
                      </div>
                      {exercises.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="workoutExercises"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={
                                      field.value.filter((x) => x.id == item.id)
                                        .length > 0
                                        ? true
                                        : false
                                    }
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value.id !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
}

export default CreateWorkout;