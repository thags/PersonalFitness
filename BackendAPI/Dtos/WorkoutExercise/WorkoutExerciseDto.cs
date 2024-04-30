using BackendAPI.Enums;

namespace BackendAPI.Dtos.WorkoutExercise
{
    public class WorkoutExerciseDto
    {
        public int ExerciseId { get; set; }
        public string? ExerciseName { get; set; }
        public string? Instruction { get; set; }
        public RepType RepType { get; set; }
        public int Sets { get; set; } = 1;
        public int? Reps { get; set; } = 1;
        public int? DurationInMinutes { get; set; }
        public int? Weight { get; set; } = 0;
        public int? Distance { get; set; } = 0;
        public string Note { get; set; } = string.Empty;
    }
}