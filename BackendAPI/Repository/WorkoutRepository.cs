using BackendAPI.Data;
using BackendAPI.Dtos.Workout;
using BackendAPI.Interfaces;
using BackendAPI.Mappers;
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
            int numberOfExercises = workout.WorkoutExercises.Count;
            var exercises = workout.WorkoutExercises;
            workout.WorkoutExercises = new List<Exercise>();

            for (int i = 0; i < numberOfExercises; i++)
            {
                var currentExercise = exercises[i];
                if (!await _context.Exercises.AnyAsync(x => x.Id == currentExercise.Id))
                {
                    continue;
                }
                workout.WorkoutExercises.Add(await _context.Exercises.FirstAsync(x => x.Id == currentExercise.Id));
            }
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
                .ToListAsync();
        }

        public async Task<Workout?> GetByIdAsync(int id)
        {
            return await _context.Workouts
                .Include(WorkoutExercises => WorkoutExercises.WorkoutExercises)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<Workout> LogWorkoutAsync(int id, WorkoutDto logWorkout)
        {
            throw new NotImplementedException();
        }

        public async Task<Workout?> UpdateAsync(int id, UpdateWorkoutRequestDto updateWorkout)
        {
            var workout = await _context.Workouts
                .Include(x => x.WorkoutExercises)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (workout == null) return null;

            workout.Name = updateWorkout.Name;
            workout.Description = updateWorkout.Description;
            workout.Note = updateWorkout.Note;

//change this to exercises instead of index
//when we remove the index we also change the order of the list..so the index..
            List<Exercise> exercisesToRemove = new List<Exercise>();
            for (int i = 0; i < workout.WorkoutExercises.Count; i++)
            {
                var exercise = workout.WorkoutExercises[i];
                var exists = updateWorkout.WorkoutExercises.Exists(x => x.Id == exercise.Id);
                if (!exists)
                {
                    exercisesToRemove.Add(exercise);
                }
            }

            foreach (var exercise in exercisesToRemove)
            {
                workout.WorkoutExercises.Remove(exercise);
            }

            foreach (var exercise in updateWorkout.WorkoutExercises)
            {
                var exists = workout.WorkoutExercises.Exists(x => x.Id == exercise.Id);
                if (!exists)
                {
                    workout.WorkoutExercises.Add(await _context.Exercises.FirstAsync(x => x.Id == exercise.Id));
                }
            }

            await _context.SaveChangesAsync();
            return workout;
        }
    }
}