namespace BackendAPI.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string Name { get; set; } = "Workout";
        public string Description { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public List<Exercise> WorkoutExercises { get; set; } = new List<Exercise>();
    }
}