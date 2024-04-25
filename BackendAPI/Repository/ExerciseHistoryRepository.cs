using BackendAPI.Data;
using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repository
{
    public class ExerciseHistoryRepository : IExerciseHistoryRepository
    {
        private readonly ApplicationDBContext _context;
        public ExerciseHistoryRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<ExerciseHistory> CreateAsync(ExerciseHistory exerciseHistory)
        {
            await _context.AddAsync(exerciseHistory);
            await _context.SaveChangesAsync();
            return exerciseHistory;
        }

        public async Task<ExerciseHistory?> DeleteAsync(int id)
        {
            var exerciseHistory = await _context.ExerciseHistories.FirstOrDefaultAsync(x => x.Id == id);
            if (exerciseHistory == null) return null;

            _context.ExerciseHistories.Remove(exerciseHistory);
            await _context.SaveChangesAsync();
            return exerciseHistory;
        }

        public async Task<List<ExerciseHistory>> GetAllAsync()
        {
            return await _context.ExerciseHistories.ToListAsync();
        }

        public async Task<ExerciseHistory?> GetByIdAsync(int id)
        {
            var note = await _context.ExerciseHistories.FindAsync(id);
            if (note == null) return null;
            return note;
        }

        public async Task<ExerciseHistory?> UpdateAsync(int id, ExerciseHistory exerciseNote)
        {
            var note = await _context.ExerciseHistories.FindAsync(id);
            if (note == null) return null;

            note.Note = exerciseNote.Note;

            await _context.SaveChangesAsync();
            return note;
        }
    }
}