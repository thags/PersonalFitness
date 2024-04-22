using BackendAPI.Dtos.ExerciseNote;
using BackendAPI.Interfaces;
using BackendAPI.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/note")]
    [ApiController]
    public class ExerciseNoteController : ControllerBase
    {
        private readonly IExerciseNoteRepository _noteRepo;
        private readonly IExerciseRepository _exerciseRepo;
        public ExerciseNoteController(IExerciseNoteRepository noteRepo, IExerciseRepository exerciseRepo)
        {
            _noteRepo = noteRepo;
            _exerciseRepo = exerciseRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var exerciseNotes = await _noteRepo.GetAllAsync();
            var noteDto = exerciseNotes.Select(x => x.ToNoteDto()).ToList();

            return Ok(noteDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var note = await _noteRepo.GetByIdAsync(id);
            if (note == null) return NotFound();

            return Ok(note.ToNoteDto());
        }

        [HttpPost("{exerciseId:int}")]
        public async Task<IActionResult> Create([FromRoute] int exerciseId, [FromBody] CreateNoteDto noteDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!await _exerciseRepo.ExerciseExists(exerciseId))
                return BadRequest("Exercise does not exist");

            var note = noteDto.ToNoteFromCreate(exerciseId);
            await _noteRepo.CreateAsync(note);

            return CreatedAtAction(nameof(GetById), new { id = note.Id }, note.ToNoteDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] UpdateNoteRequestDto updateNote)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var note = await _noteRepo.UpdateAsync(id, updateNote.ToNoteFromUpdate());
            if (note == null) return NotFound("Note not found");

            return Ok(note.ToNoteDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var note = await _noteRepo.DeleteAsync(id);
            if (note == null) return NotFound("Note not found");
            return Ok(note.ToNoteDto());
        }
    }
}