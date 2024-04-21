using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public ExerciseNoteController(IExerciseNoteRepository noteRepo)
        {
            _noteRepo = noteRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var exerciseNotes = await _noteRepo.GetAllAsync();
            var noteDto = exerciseNotes.Select(x => x.ToNoteDto()).ToList();

            return Ok(noteDto);
        }
    }
}