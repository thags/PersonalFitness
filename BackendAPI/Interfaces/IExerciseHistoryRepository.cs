using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Dtos.ExerciseHistory;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Interfaces
{
    public interface IExerciseHistoryRepository
    {
        Task<List<ExerciseHistory>> GetAllAsync();
        Task<ExerciseHistory?> GetByIdAsync(int id);
        Task<ExerciseHistory> CreateAsync(ExerciseHistory exerciseHistory);
        Task<ExerciseHistory?> UpdateAsync(int id, ExerciseHistory exerciseHistory);
        Task<ExerciseHistory?> DeleteAsync(int id);
    }
}