using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Dtos.Exercise
{
    public class CreateExerciseRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Name must be at least 5 characters")]
        [MaxLength(50, ErrorMessage = "Name can't be longer than 50 characters")]
        public string Name { get; set; } = string.Empty;
        public string Instruction { get; set; } = string.Empty;
    }
}