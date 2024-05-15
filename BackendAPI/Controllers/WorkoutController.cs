using BackendAPI.Data;
using BackendAPI.Dtos.Workout;
using BackendAPI.Interfaces;
using BackendAPI.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/workout")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IWorkoutRepository _workoutRepository;
        private readonly IExerciseHistoryRepository _exercisesHistoryRepository;
        public WorkoutController(ApplicationDBContext context, IWorkoutRepository workoutRepository, IExerciseHistoryRepository exercisesHistory)
        {
            _context = context;
            _workoutRepository = workoutRepository;
            _exercisesHistoryRepository = exercisesHistory;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var workouts = await _workoutRepository.GetAllAsync();
            var workoutDto = workouts.Select(x => x.ToWorkoutDto());

            return Ok(workoutDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var workout = await _workoutRepository.GetByIdAsync(id);
            if (workout == null) return NotFound();

            return Ok(workout.ToWorkoutDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateWorkoutRequestDto workoutToAdd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var workout = workoutToAdd.ToWorkoutFromCreateDto();
            await _workoutRepository.CreateAsync(workout);

            return CreatedAtAction(nameof(GetById), new { id = workout.Id }, workout.ToWorkoutDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var workout = await _workoutRepository.DeleteAsync(id);
            if (workout == null) return NotFound();

            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateWorkoutRequestDto updatedWorkout)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var workout = await _workoutRepository.UpdateAsync(id, updatedWorkout);
            if (workout == null) return NotFound();

            return Ok(workout.ToWorkoutDto());
        }
    }
}