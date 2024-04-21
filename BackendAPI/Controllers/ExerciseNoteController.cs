using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var note = await _noteRepo.GetByIdAsync(id);
            if (note == null) return NotFound();

            return Ok(note.ToNoteDto());
        }

        [HttpPost("{exerciseId}")]
        public async Task<IActionResult> Create([FromRoute] int exerciseId, [FromBody] CreateNoteDto noteDto)
        {
            if (!await _exerciseRepo.ExerciseExists(exerciseId))
                return BadRequest("Exercise does not exist");

            var note = noteDto.ToNoteFromCreate(exerciseId);
            await _noteRepo.CreateAsync(note);

            return CreatedAtAction(nameof(GetById), new { id = note.Id }, note.ToNoteDto());
        }
    }
}