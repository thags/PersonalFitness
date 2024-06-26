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
                BodyWeight = exerciseModel.BodyWeight,
                Instruction = exerciseModel.Instruction,
                History = exerciseModel.ExerciseHistory?.Select(x => x.ToHistoryDto()).ToList(),
            };
        }

        public static Exercise ToExerciseFromDto(this ExerciseDto exerciseDto)
        {
            return new Exercise{
                Id = exerciseDto.Id,
                Name = exerciseDto.Name,
                RepType = exerciseDto.RepType,
                BodyWeight = exerciseDto.BodyWeight,
                Instruction = exerciseDto.Instruction,
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