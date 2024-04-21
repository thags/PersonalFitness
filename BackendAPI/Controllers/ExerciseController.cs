using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Data;
using BackendAPI.Dtos.Exercise;
using BackendAPI.Mappers;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAll()
        {
            var exercises = _context.Exercises.ToList()
                .Select(x => x.ToExerciseDto());

            return Ok(exercises);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var exercise = _context.Exercises.Find(id);
            if (exercise == null) return NotFound();

            return Ok(exercise.ToExerciseDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateExerciseRequestDto exerciseToAdd)
        {
            var exercise = exerciseToAdd.ToExerciseFromCreateDto();
            _context.Exercises.Add(exercise);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = exercise.Id }, exercise.ToExerciseDto());
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateExerciseRequestDto updateExercise)
        {
            var exercise = _context.Exercises.FirstOrDefault(x => x.Id == id);
            if (exercise == null) return NotFound();

            exercise.Name = updateExercise.Name;
            exercise.Instruction = updateExercise.Instruction;

            _context.SaveChanges();
            return Ok(exercise.ToExerciseDto());
        }

        [HttpDelete]
        [Route("id")]
        public IActionResult Delete([FromQuery] int id)
        {
            var exercise = _context.Exercises.FirstOrDefault(x => x.Id == id);
            if (exercise == null) return NotFound();
            _context.Exercises.Remove(exercise);
            _context.SaveChanges();

            return NoContent();
        }



    }
}