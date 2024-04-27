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
                ExerciseName = workoutExercise.Exercise?.Name,
                Instruction = workoutExercise.Exercise?.Instruction,
                RepType = workoutExercise.Exercise?.RepType == null ? Enums.RepType.Reps : workoutExercise.Exercise.RepType,
                Sets = workoutExercise.Sets,
                Reps = workoutExercise.Reps,
                DurationInMinutes = workoutExercise.DurationInMinutes,
            };
        }

        public static WorkoutExercise ToWorkoutExerciseFromCreateDto(this CreateWorkoutExerciseRequestDto workoutExerciseRequest)
        {
            return new WorkoutExercise
            {
                ExerciseId = workoutExerciseRequest.ExerciseId,
                Sets = workoutExerciseRequest.Sets,
                Reps = workoutExerciseRequest.Reps,
                DurationInMinutes = workoutExerciseRequest.DurationInMinutes,
                Weight = workoutExerciseRequest.Weight,
                Distance = workoutExerciseRequest.Distance,
            };
        }
    }
}