using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Data;
using BackendAPI.Dtos.Exercise;
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
        public ExerciseController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var exercises = await _context.Exercises.ToListAsync();
            var exesciseDto = exercises.Select(x => x.ToExerciseDto());

            return Ok(exesciseDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            if (exercise == null) return NotFound();

            return Ok(exercise.ToExerciseDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateExerciseRequestDto exerciseToAdd)
        {
            var exercise = exerciseToAdd.ToExerciseFromCreateDto();
            await _context.Exercises.AddAsync(exercise);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = exercise.Id }, exercise.ToExerciseDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExerciseRequestDto updateExercise)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(x => x.Id == id);
            if (exercise == null) return NotFound();

            exercise.Name = updateExercise.Name;
            exercise.Instruction = updateExercise.Instruction;

            await _context.SaveChangesAsync();
            return Ok(exercise.ToExerciseDto());
        }

        [HttpDelete]
        [Route("id")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(x => x.Id == id);
            if (exercise == null) return NotFound();
            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync();

            return NoContent();
        }



    }
}