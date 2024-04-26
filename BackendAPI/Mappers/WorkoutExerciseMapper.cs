using BackendAPI.Dtos.WorkoutExercise;
using BackendAPI.Models;

namespace BackendAPI.Mappers
{
    public static class WorkoutExerciseMapper
    {
        public static WorkoutExerciseDto ToWorkoutExerciseDto(this WorkoutExercise workoutExercise)
        {
            return new WorkoutExerciseDto
            {
                ExerciseId = workoutExercise.ExerciseId,
                Name = workoutExercise.Exercise.Name,
                Instruction = workoutExercise.Exercise.Instruction,
                RepType = workoutExercise.Exercise.RepType,
                Sets = workoutExercise.Sets,
                Reps = workoutExercise.Reps,
                DurationInMinutes = workoutExercise.DurationInMinutes,
            };
        }
    }
}