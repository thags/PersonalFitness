namespace BackendAPI.Models
{
    public class ExerciseHistory
    {
        public int Id { get; set; }
        public string Note { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? ExerciseId { get; set; }
        public Exercise? Exercise { get; set; }
        public int sets { get; set; } = 0;
        public int? reps { get; set; } = 0;
        public int? DurationInMinutes { get; set; }
        public int? Weight { get; set; }
        public int? Distance { get; set; }
    }
}