using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Instruction { get; set; } = string.Empty;
        public List<ExerciseNote> Notes { get; set; } = new List<ExerciseNote>();
    }
}