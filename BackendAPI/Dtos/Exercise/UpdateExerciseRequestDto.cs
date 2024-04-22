using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Dtos.Exercise
{
    public class UpdateExerciseRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Name must be at least 5 characters")]
        [MaxLength(50, ErrorMessage = "Name can't be longer than 50 characters")]
        public string Name { get; set; } = string.Empty;
        public string Instruction { get; set; } = string.Empty;
    }
}