import IWorkout from "@/Interfaces/IWorkout";
import { z } from "zod";

interface Props{
    onCreateWorkout?: (workout: IWorkout) => void;
}

function CreateWorkout({onCreateExercise}: Props) {
    const formSchema = z.object({

    })
}
