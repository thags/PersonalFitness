import IWorkout from "@/Interfaces/IWorkout";
import IWorkoutExercise from "@/Interfaces/IWorkoutExercise";
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
import { useForm } from "react-hook-form";
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";

interface Props{
    onCreateWorkout?: (workout: IWorkout) => void;
}

function CreateWorkout({onCreateWorkout}: Props) {
    const formSchema = z.object({
        name: z.string(),
        description: z.string(),
        note: z.string(),
        workoutExercises: z.custom<IWorkoutExercise[]>()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Create Workout</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w[425px]">
                <DialogHeader>
                    <DialogTitle>Create Workout</DialogTitle>
                    <DialogDescription>Use this form to create a workout</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </>
    )
}
