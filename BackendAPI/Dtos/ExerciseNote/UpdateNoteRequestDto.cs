using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Dtos.ExerciseNote
{
    public class UpdateNoteRequestDto
    {
        public string Note { get; set; } = string.Empty;
    }
}