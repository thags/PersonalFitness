using BackendAPI.Dtos.ExerciseHistory;
using BackendAPI.Models;

namespace BackendAPI.Mappers
{
    public static class ExerciseNoteMapper
    {
        public static ExerciseHistoryDto ToHistoryDto(this ExerciseHistory exerciseHistory)
        {
            return new ExerciseHistoryDto
            {
                Id = exerciseHistory.Id,
                Note = exerciseHistory.Note,
                CreatedOn = exerciseHistory.CreatedOn,
                sets = exerciseHistory.sets,
                reps = exerciseHistory.reps,
                DurationInMinutes = exerciseHistory.DurationInMinutes,
                Weight = exerciseHistory.Weight,
                Distance = exerciseHistory.Distance,
            };
        }

        public static ExerciseHistory ToHistoryFromCreate(this CreateHistoryDto historyDTO, int exerciseId)
        {
            return new ExerciseHistory
            {
                Note = historyDTO.Note,
                ExerciseId = exerciseId,
                sets = historyDTO.sets,
                reps = historyDTO.reps,
                DurationInMinutes = historyDTO.DurationInMinutes,
                Weight = historyDTO.Weight,
                Distance = historyDTO.Distance,
            };
        }

        public static ExerciseHistory ToHistoryFromUpdate(this UpdateHistoryRequestDto historyDTO)
        {
            return new ExerciseHistory
            {
                Note = historyDTO.Note,
                sets = historyDTO.sets,
                reps = historyDTO.reps,
                DurationInMinutes = historyDTO.DurationInMinutes,
                Weight = historyDTO.Weight,
                Distance = historyDTO.Distance,
            };
        }
    }
}