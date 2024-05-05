import IExercise from "../Interfaces/IExercise";
import RepType from "../enums/RepType";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

interface Props {
  onCreateExercise?: (item: any) => void;
}

function CreateExercise({ onCreateExercise }: Props) {
  const formSchema = z.object({
    name: z.string().min(5),
    reptype: z.string(),
    instruction: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("api/exercise/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values, null, 2),
    }).catch((error) => console.log(error));
    if (onCreateExercise != null) onCreateExercise(values);
  }
  return (
    <>
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
                  <Input placeholder="Exercise Name" {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="item-center">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={"Reps"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(RepType)
                      .filter((key: any) => !isNaN(Number(RepType[key])))
                      .map((key: any) => (
                        <SelectItem value={key}>{key}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
                  <Input placeholder="Exercise instruction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default CreateExercise;
