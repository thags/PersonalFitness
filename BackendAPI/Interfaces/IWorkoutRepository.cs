using BackendAPI.Dtos.Workout;
using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IWorkoutRepository
    {
        Task<List<Workout>> GetAllAsync();
        Task<Workout?> GetByIdAsync(int id);
        Task<Workout> CreateAsync(Workout workout);
        Task<Workout?> UpdateAsync(int id, UpdateWorkoutRequestDto updateWorkout);
        Task<Workout?> DeleteAsync(int id);
        Task<Workout> LogWorkoutAsync(int id, WorkoutDto logWorkout);
    }
}