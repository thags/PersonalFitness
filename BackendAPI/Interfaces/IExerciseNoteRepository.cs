using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IExerciseNoteRepository
    {
        Task<List<ExerciseNote>> GetAllAsync();
    }
}