using BackendAPI.Dtos.ExerciseNote;

namespace BackendAPI.Dtos.Exercise
{
    public class ExerciseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Instruction { get; set; } = string.Empty;
        public List<ExerciseNoteDto>? Notes { get; set; }
    }
}