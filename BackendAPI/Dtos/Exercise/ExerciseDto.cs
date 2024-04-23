using BackendAPI.Dtos.ExerciseNote;
using BackendAPI.Enums;

namespace BackendAPI.Dtos.Exercise
{
    public class ExerciseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public RepType RepType { get; set; } = RepType.Reps;
        public string Instruction { get; set; } = string.Empty;
        public List<ExerciseNoteDto>? Notes { get; set; }
    }
}