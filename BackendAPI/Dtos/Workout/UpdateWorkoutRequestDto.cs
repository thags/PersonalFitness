using BackendAPI.Dtos.Exercise;

namespace BackendAPI.Dtos.Workout
{
    public class UpdateWorkoutRequestDto
    {
        public string Name { get; set; } = "Workout";
        public string Description { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public List<ExerciseDto> WorkoutExercises { get; set; } = new List<ExerciseDto>();
    }
}