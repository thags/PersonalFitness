using BackendAPI.Dtos.ExerciseHistory;
using BackendAPI.Interfaces;
using BackendAPI.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/exerciseHistory")]
    [ApiController]
    public class ExerciseHistoryController : ControllerBase
    {
        private readonly IExerciseHistoryRepository _historyRepo;
        private readonly IExerciseRepository _exerciseRepo;
        public ExerciseHistoryController(IExerciseHistoryRepository historyRepo, IExerciseRepository exerciseRepo)
        {
            _historyRepo = historyRepo;
            _exerciseRepo = exerciseRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var history = await _historyRepo.GetAllAsync();
            var HistoryDto = history.Select(x => x.ToHistoryDto()).ToList();

            return Ok(HistoryDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var history = await _historyRepo.GetByIdAsync(id);
            if (history == null) return NotFound();

            return Ok(history.ToHistoryDto());
        }

        [HttpPost("{exerciseId:int}")]
        public async Task<IActionResult> Create([FromRoute] int exerciseId, [FromBody] CreateHistoryDto historyDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!await _exerciseRepo.ExerciseExists(exerciseId))
                return BadRequest("Exercise does not exist");

            var history = historyDto.ToHistoryFromCreate(exerciseId);
            await _historyRepo.CreateAsync(history);

            return CreatedAtAction(nameof(GetById), new { id = history.Id }, history.ToHistoryDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] UpdateHistoryRequestDto updateHistory)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var history = await _historyRepo.UpdateAsync(id, updateHistory.ToHistoryFromUpdate());
            if (history == null) return NotFound("History not found");

            return Ok(history.ToHistoryDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var history = await _historyRepo.DeleteAsync(id);
            if (history == null) return NotFound("History not found");
            return Ok(history.ToHistoryDto());
        }
    }
}