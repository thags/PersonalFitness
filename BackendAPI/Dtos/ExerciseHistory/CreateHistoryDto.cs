using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Dtos.ExerciseHistory
{
    public class CreateHistoryDto
    {
        [MaxLength(500, ErrorMessage = "Note can't be longer than 500 characters")]
        public string Note { get; set; } = string.Empty;
        [Required]
        public int sets { get; set; } = 1;
        public int? reps { get; set; } = 1;
        public int? DurationInMinutes { get; set; }
        public int? Weight { get; set; }
        public int? Distance { get; set; }
    }
}