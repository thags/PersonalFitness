using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Dtos.Exercise;
using BackendAPI.Dtos.ExerciseNote;
using BackendAPI.Models;

namespace BackendAPI.Mappers
{
    public static class ExerciseNoteMapper
    {
        public static ExerciseNoteDto ToNoteDto(this ExerciseNote exerciseNote)
        {
            return new ExerciseNoteDto
            {
                Id = exerciseNote.Id,
                Note = exerciseNote.Note,
                CreatedOn = exerciseNote.CreatedOn
            };
        }
    }
}