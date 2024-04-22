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

        public async Task<ExerciseNote> CreateAsync(ExerciseNote exerciseNote)
        {
            await _context.AddAsync(exerciseNote);
            await _context.SaveChangesAsync();
            return exerciseNote;
        }

        public async Task<ExerciseNote?> DeleteAsync(int id)
        {
            var exerciseNote = await _context.ExerciseNotes.FirstOrDefaultAsync(x => x.Id == id);
            if (exerciseNote == null) return null;

            _context.ExerciseNotes.Remove(exerciseNote);
            await _context.SaveChangesAsync();
            return exerciseNote;
        }

        public async Task<List<ExerciseNote>> GetAllAsync()
        {
            return await _context.ExerciseNotes.ToListAsync();
        }

        public async Task<ExerciseNote?> GetByIdAsync(int id)
        {
            var note = await _context.ExerciseNotes.FindAsync(id);
            if (note == null) return null;
            return note;
        }

        public async Task<ExerciseNote?> UpdateAsync(int id, ExerciseNote exerciseNote)
        {
            var note = await _context.ExerciseNotes.FindAsync(id);
            if (note == null) return null;

            note.Note = exerciseNote.Note;

            await _context.SaveChangesAsync();
            return note;
        }
    }
}