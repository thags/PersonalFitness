using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Dtos.Exercise;
using BackendAPI.Dtos.ExerciseNote;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

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

        public static ExerciseNote ToNoteFromCreate(this CreateNoteDto noteDto, int exerciseId)
        {
            return new ExerciseNote
            {
                Note = noteDto.Note,
                ExerciseId = exerciseId
            };
        }
    }
}