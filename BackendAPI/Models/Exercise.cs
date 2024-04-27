using BackendAPI.Enums;

namespace BackendAPI.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Instruction { get; set; } = string.Empty;
        public RepType RepType { get; set; } = RepType.Reps;
        public List<ExerciseHistory>? ExerciseHistory { get; set; }
    }
}