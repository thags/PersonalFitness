using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Dtos.ExerciseNote
{
    public class CreateNoteDto
    {
        [Required]
        [MaxLength(500, ErrorMessage = "Note can't be longer than 500 characters")]
        public string Note { get; set; } = string.Empty;
    }
}