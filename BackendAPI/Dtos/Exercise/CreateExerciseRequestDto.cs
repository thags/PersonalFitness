using System.ComponentModel.DataAnnotations;
using BackendAPI.Enums;
using Newtonsoft.Json;

namespace BackendAPI.Dtos.Exercise
{
    public class CreateExerciseRequestDto
    {
        [Required]
        [MaxLength(50, ErrorMessage = "Name can't be longer than 50 characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        public RepType RepType { get; set; } = RepType.Reps;
        public bool BodyWeight { get; set; } = false;
        public string Instruction { get; set; } = string.Empty;
    }
}