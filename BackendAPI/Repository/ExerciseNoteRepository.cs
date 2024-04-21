using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Data;
using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repository
{
    public class ExerciseNoteRepository : IExerciseNoteRepository
    {
        private readonly ApplicationDBContext _context;
        public ExerciseNoteRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<ExerciseNote>> GetAllAsync()
        {
            return await _context.ExerciseNotes.ToListAsync();
        }
    }
}