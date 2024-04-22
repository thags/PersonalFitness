using BackendAPI.Data;
using BackendAPI.Dtos.Exercise;
using BackendAPI.Interfaces;
using BackendAPI.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/exercise")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IExerciseRepository _exerciseRepository;
        public ExerciseController(ApplicationDBContext context, IExerciseRepository exerciseRepository)
        {
            _context = context;
            _exerciseRepository = exerciseRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var exercises = await _exerciseRepository.GetAllAsync();
            var exesciseDto = exercises.Select(x => x.ToExerciseDto());

            return Ok(exesciseDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var exercise = await _exerciseRepository.GetByIdAsync(id);
            if (exercise == null) return NotFound();

            return Ok(exercise.ToExerciseDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateExerciseRequestDto exerciseToAdd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var exercise = exerciseToAdd.ToExerciseFromCreateDto();
            await _exerciseRepository.CreateAsync(exercise);

            return CreatedAtAction(nameof(GetById), new { id = exercise.Id }, exercise.ToExerciseDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExerciseRequestDto updateExercise)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var exercise = await _exerciseRepository.UpdateAsync(id, updateExercise);
            if (exercise == null) return NotFound();

            return Ok(exercise.ToExerciseDto());
        }

        [HttpDelete]
        [Route("id:int")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var exercise = await _exerciseRepository.DeleteAsync(id);
            if (exercise == null) return NotFound();

            return NoContent();
        }
    }
}