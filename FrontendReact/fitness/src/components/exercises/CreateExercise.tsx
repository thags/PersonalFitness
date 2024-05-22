import IExercise from "../../Interfaces/IExercise";
import RepType from "../../enums/RepType";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  onEditExercise: (
    exercise: IExercise,
    changeType: "edit" | "delete" | "create"
  ) => void;
  editExercise?: IExercise;
}

function CreateExercise({ onEditExercise, editExercise }: Props) {
  const formSchema = z.object({
    name: z.string(),
    reptype: z.string(),
    bodyweight: z.boolean(),
    instruction: z.string(),
  });

  let getDefaultValues = () => {
    if (editExercise != null) {
      return {
        name: editExercise.name,
        reptype: RepType[editExercise.repType],
        bodyweight: editExercise.bodyWeight,
        instruction: editExercise.instruction,
      };
    } else {
      return {
        name: "",
        reptype: RepType[RepType.Reps],
        bodyweight: false,
        instruction: "",
      };
    }
  };

  function onDelete() {
    if (editExercise == null) return;

    fetch("api/exercise/" + editExercise.id?.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => onEditExercise(editExercise, "delete"))
      .catch((error) => console.log(error));

    form.reset();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editExercise != null) {
      fetch("api/exercise/" + editExercise.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "applicatino/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((response) => response.json())
        .then((data) => {
          onEditExercise(data as IExercise, "edit");
        });
    } else {
      fetch("api/exercise/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((response) => response.json())
        .then((data) => {
          onEditExercise(data as IExercise, "create");
        });
    }

    form.reset();
  }

  let type = (): string => {
    if (editExercise != null) {
      return "Edit";
    } else {
      return "Create Exercise";
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">{type()}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
                    <FormLabel>Exercise Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reptype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rep type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="item-center">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(RepType)
                          .filter((key: any) => !isNaN(Number(RepType[key])))
                          .map((key: any) => (
                            <SelectItem key={key} value={key}>
                              {key}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bodyweight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bodyweight</FormLabel>
                    <FormControl>
                      <div className="new-line">
                        <Checkbox
                          id="bodyweight"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        ></Checkbox>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instruction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instruction</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose>
                  <Button type="button" onClick={onDelete}>
                    Delete Exercise
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

export default CreateExercise;
