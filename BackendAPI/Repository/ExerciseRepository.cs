using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Data;
using BackendAPI.Dtos.Exercise;
using BackendAPI.Helpers;
using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repository
{
    public class ExerciseRepository : IExerciseRepository
    {
        private readonly ApplicationDBContext _context;
        public ExerciseRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Exercise> CreateAsync(Exercise exercise)
        {
            await _context.Exercises.AddAsync(exercise);
            await _context.SaveChangesAsync();
            return exercise;
        }

        public async Task<Exercise?> DeleteAsync(int id)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(x => x.Id == id);
            if (exercise == null) return null;

            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync();
            return exercise;
        }

        public async Task<bool> ExerciseExists(int id)
        {
            return await _context.Exercises.AnyAsync(x => x.Id == id);
        }

        public async Task<List<Exercise>> GetAllAsync(QueryObject query)
        {
            var exercises = _context.Exercises.Include(x => x.Notes).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.ExerciseName))
            {
                exercises = exercises.Where(x => x.Name.Contains(query.ExerciseName));
            }

            if (query.RepType != null)
            {
                exercises = exercises.Where(x => x.RepType == query.RepType);
            }

            return await exercises.ToListAsync();
        }

        public async Task<Exercise?> GetByIdAsync(int id)
        {
            return await _context.Exercises
                .Include(x => x.Notes)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Exercise?> UpdateAsync(int id, UpdateExerciseRequestDto exerciseDto)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(x => x.Id == id);
            if (exercise == null) return null;

            exercise.Name = exerciseDto.Name;
            exercise.Instruction = exerciseDto.Instruction;

            await _context.SaveChangesAsync();
            return exercise;
        }
    }
}