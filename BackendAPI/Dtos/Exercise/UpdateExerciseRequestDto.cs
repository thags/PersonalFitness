using System.ComponentModel.DataAnnotations;
using BackendAPI.Enums;

namespace BackendAPI.Dtos.Exercise
{
    public class UpdateExerciseRequestDto
    {
        [Required]
        [MaxLength(50, ErrorMessage = "Name can't be longer than 50 characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        public RepType RepType { get; set; } = RepType.Reps;
        public string Instruction { get; set; } = string.Empty;
        public bool BodyWeight { get; set; } = false;
    }
}