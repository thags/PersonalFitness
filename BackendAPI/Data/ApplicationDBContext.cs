using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<ExerciseHistory> ExerciseHistories { get; set; }
        public DbSet<Workout> Workouts { get; set; }
    }
}