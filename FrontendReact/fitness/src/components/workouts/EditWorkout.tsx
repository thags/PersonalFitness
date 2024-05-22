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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import IExercise from "@/Interfaces/IExercise";
import CreateExercise from "../exercises/CreateExercise";

interface Props {
  onEditWorkout: (
    workout: IWorkout,
    changeType: "edit" | "delete" | "create"
  ) => void;
  editWorkout?: IWorkout;
  exercises: IExercise[];
  onEditExercise: (
    exercise: IExercise,
    changeType: "edit" | "delete" | "create"
  ) => void;
}

function EditWorkout({
  onEditWorkout,
  exercises,
  editWorkout,
  onEditExercise,
}: Props) {
  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    note: z.string(),
    workoutExercises: z.array(z.any()),
  });

  let getDefaultValues = () => {
    if (editWorkout != null) {
      return {
        name: editWorkout.name,
        description: editWorkout.description,
        note: editWorkout.note,
        workoutExercises:
          editWorkout.workoutExercises != null
            ? editWorkout.workoutExercises
            : [],
      };
    } else {
      return {
        workoutExercises: [],
      };
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editWorkout != null) {
      fetch("api/workout/" + editWorkout.id?.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((response) => response.json())
        .then((data) => {
          onEditWorkout(data as IWorkout, "edit");
        })
        .catch((error) => console.log(error));
    } else {
      fetch("api/workout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((response) => response.json())
        .then((data) => {
          onEditWorkout(data as IWorkout, "create");
        })
        .catch((error) => console.log(error));
    }

    form.reset();
  }

  function onDelete() {
    if (editWorkout == null) return;

    fetch("api/workout/" + editWorkout.id?.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => onEditWorkout(editWorkout, "delete"))
      .catch((error) => console.log(error));

    form.reset();
  }

  let type = (): string => {
    if (editWorkout != null) {
      return "Edit Workout";
    } else {
      return "Create Workout";
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">{type()}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w[425px]">
          <DialogHeader>
            <DialogTitle>{type()}</DialogTitle>
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
              <CreateExercise onEditExercise={onEditExercise} />
              <FormField
                control={form.control}
                name="workoutExercises"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Exercises</FormLabel>
                      <FormDescription>
                        Select exercises to be a part of this workout
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
                              <CreateExercise
                                editExercise={item}
                                onEditExercise={onEditExercise}
                              />
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose>
                  <Button type="button" onClick={onDelete}>
                    Delete Workout
                  </Button>
                </DialogClose>
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

export default EditWorkout;
