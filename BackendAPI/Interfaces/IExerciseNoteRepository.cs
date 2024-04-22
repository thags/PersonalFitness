using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Dtos.ExerciseNote;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Interfaces
{
    public interface IExerciseNoteRepository
    {
        Task<List<ExerciseNote>> GetAllAsync();
        Task<ExerciseNote?> GetByIdAsync(int id);
        Task<ExerciseNote> CreateAsync(ExerciseNote exerciseNote);
        Task<ExerciseNote?> UpdateAsync(int id, ExerciseNote exerciseNote);
        Task<ExerciseNote?> DeleteAsync(int id);
    }
}