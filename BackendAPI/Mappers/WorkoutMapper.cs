using BackendAPI.Dtos.Workout;
using BackendAPI.Models;

namespace BackendAPI.Mappers
{
    public static class WorkoutMapper
    {
        public static WorkoutDto ToWorkoutDto(this Workout workout)
        {
            return new WorkoutDto
            {
                Id = workout.Id,
                Name = workout.Name,
                Description = workout.Description,
                Note = workout.Note,
                WorkoutExercises = workout.WorkoutExercises.Select(we => we.ToWorkoutExerciseDto()).ToList()
            };
        }

        public static Workout ToWorkoutFromCreateDto(this CreateWorkoutRequestDto workoutRequest)
        {
            //should check that each exercise requested actually exists
            return new Workout
            {
                Name = workoutRequest.Name,
                Description = workoutRequest.Description,
                Note = workoutRequest.Note,
                WorkoutExercises = workoutRequest.WorkoutExercises.Select(we => we.ToWorkoutExerciseFromCreateDto()).ToList()
            };
        }
    }
}