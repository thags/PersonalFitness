using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Data;
using BackendAPI.Dtos.Exercise;
using BackendAPI.Interfaces;
using BackendAPI.Mappers;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var exercises = await _exerciseRepository.GetAllAsync();
            var exesciseDto = exercises.Select(x => x.ToExerciseDto());

            return Ok(exesciseDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var exercise = await _exerciseRepository.GetByIdAsync(id);
            if (exercise == null) return NotFound();

            return Ok(exercise.ToExerciseDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateExerciseRequestDto exerciseToAdd)
        {
            var exercise = exerciseToAdd.ToExerciseFromCreateDto();
            await _exerciseRepository.CreateAsync(exercise);

            return CreatedAtAction(nameof(GetById), new { id = exercise.Id }, exercise.ToExerciseDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExerciseRequestDto updateExercise)
        {
            var exercise = await _exerciseRepository.UpdateAsync(id, updateExercise);
            if (exercise == null) return NotFound();

            return Ok(exercise.ToExerciseDto());
        }

        [HttpDelete]
        [Route("id")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            var exercise = await _exerciseRepository.DeleteAsync(id);
            if (exercise == null) return NotFound();

            return NoContent();
        }
    }
}