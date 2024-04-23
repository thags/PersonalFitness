using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Dtos.Exercise;
using BackendAPI.Helpers;
using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IExerciseRepository
    {
        Task<List<Exercise>> GetAllAsync(QueryObject queryObject);
        Task<Exercise?> GetByIdAsync(int id);
        Task<Exercise> CreateAsync(Exercise exercise);
        Task<Exercise?> UpdateAsync(int id, UpdateExerciseRequestDto exerciseDto);
        Task<Exercise?> DeleteAsync(int id);
        Task<bool> ExerciseExists(int id);
    }
}