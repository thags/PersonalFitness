namespace BackendAPI.Dtos.WorkoutExercise
{
    public class CreateWorkoutExerciseRequestDto
    {
        public int ExerciseId { get; set; }
        public int Sets { get; set; } = 1;
        public int? Reps { get; set; } = 1;
        public int? DurationInMinutes { get; set; } = 0;
        public int? Weight { get; set; } = 0;
        public int? Distance { get; set; } = 0;
        public string Note { get; set; } = string.Empty;
    }
}