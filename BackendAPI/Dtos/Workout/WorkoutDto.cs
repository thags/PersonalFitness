using BackendAPI.Dtos.WorkoutExercise;

namespace BackendAPI.Dtos.Workout
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "Workout";
        public string Description { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public List<WorkoutExerciseDto> WorkoutExercises { get; set; } = new List<WorkoutExerciseDto>();
    }
}