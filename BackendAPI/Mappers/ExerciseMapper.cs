using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Dtos.Exercise;
using BackendAPI.Models;

namespace BackendAPI.Mappers
{
    public static class ExerciseMapper
    {
        public static ExerciseDto ToExerciseDto(this Exercise exerciseModel)
        {
            return new ExerciseDto
            {
                Id = exerciseModel.Id,
                Name = exerciseModel.Name,
                Instruction = exerciseModel.Instruction,
                Notes = exerciseModel.Notes.Select(x => x.ToNoteDto()).ToList(),
            };
        }

        public static Exercise ToExerciseFromCreateDto(this CreateExerciseRequestDto exerciseRequest)
        {
            return new Exercise
            {
                Name = exerciseRequest.Name,
                Instruction = exerciseRequest.Instruction,
            };
        }
    }
}