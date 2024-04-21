using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Dtos.Exercise
{
    public class UpdateExerciseRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string Instruction { get; set; } = string.Empty;
    }
}