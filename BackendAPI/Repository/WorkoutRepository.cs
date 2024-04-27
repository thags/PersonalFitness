using BackendAPI.Data;
using BackendAPI.Dtos.Workout;
using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repository
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly ApplicationDBContext _context;
        public WorkoutRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Workout> CreateAsync(Workout workout)
        {
            await _context.Workouts.AddAsync(workout);
            await _context.SaveChangesAsync();
            return workout;
        }

        public async Task<Workout?> DeleteAsync(int id)
        {
            var workout = await _context.Workouts.FirstOrDefaultAsync(x => x.Id == id);
            if (workout == null) return null;

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
            return workout;
        }

        public async Task<List<Workout>> GetAllAsync()
        {
            return await _context.Workouts
                .Include(x => x.WorkoutExercises)
                .ThenInclude(exercises => exercises.Exercise)
                .ToListAsync();
        }

        public async Task<Workout?> GetByIdAsync(int id)
        {
            return await _context.Workouts
                .Include(WorkoutExercises => WorkoutExercises.WorkoutExercises)
                .ThenInclude(exercises => exercises.Exercise)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<Workout> LogWorkoutAsync(int id, WorkoutDto logWorkout)
        {
            throw new NotImplementedException();
        }

        public async Task<Workout?> UpdateAsync(int id, UpdateWorkoutRequestDto updateWorkout)
        {
            var workout = await _context.Workouts.FirstOrDefaultAsync(x => x.Id == id);
            if (workout == null) return null;

            workout.Name = updateWorkout.Name;
            workout.Description = updateWorkout.Description;
            workout.Note = updateWorkout.Note;
            workout.WorkoutExercises = updateWorkout.WorkoutExercises;

            await _context.SaveChangesAsync();
            return workout;
        }
    }
}