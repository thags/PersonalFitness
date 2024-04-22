namespace BackendAPI.Dtos.ExerciseNote
{
    public class ExerciseNoteDto
    {
        public int Id { get; set; }
        public string Note { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}