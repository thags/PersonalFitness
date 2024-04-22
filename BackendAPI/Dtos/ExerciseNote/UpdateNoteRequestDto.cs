using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Dtos.ExerciseNote
{
    public class UpdateNoteRequestDto
    {
        [Required]
        [MaxLength(500, ErrorMessage = "Note can't be longer than 500 characters")]
        public string Note { get; set; } = string.Empty;
    }
}