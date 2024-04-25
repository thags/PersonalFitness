namespace BackendAPI.Dtos.ExerciseHistory
{
    public class ExerciseHistoryDto
    {
        public int Id { get; set; }
        public string Note { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? ExerciseId { get; set; }
        public int sets { get; set; } = 1;
        public int? reps { get; set; } = 1;
        public int? DurationInMinutes { get; set; }
        public int? Weight { get; set; }
        public int? Distance { get; set; }
    }
}