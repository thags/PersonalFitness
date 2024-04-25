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
                RepType = exerciseModel.RepType,
                Instruction = exerciseModel.Instruction,
                History = exerciseModel.ExerciseHistory.Select(x => x.ToHistoryDto()).ToList(),
            };
        }

        public static Exercise ToExerciseFromCreateDto(this CreateExerciseRequestDto exerciseRequest)
        {
            return new Exercise
            {
                Name = exerciseRequest.Name,
                RepType = exerciseRequest.RepType,
                Instruction = exerciseRequest.Instruction,
            };
        }
    }
}