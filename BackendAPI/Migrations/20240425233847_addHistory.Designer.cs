﻿// <auto-generated />
using System;
using BackendAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BackendAPI.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20240425233847_addHistory")]
    partial class addHistory
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BackendAPI.Models.Exercise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Instruction")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RepType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("BackendAPI.Models.ExerciseHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<int?>("Distance")
                        .HasColumnType("int");

                    b.Property<int?>("DurationInMinutes")
                        .HasColumnType("int");

                    b.Property<int?>("ExerciseId")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Weight")
                        .HasColumnType("int");

                    b.Property<int?>("reps")
                        .HasColumnType("int");

                    b.Property<int>("sets")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.ToTable("ExerciseHistories");
                });

            modelBuilder.Entity("BackendAPI.Models.ExerciseHistory", b =>
                {
                    b.HasOne("BackendAPI.Models.Exercise", "Exercise")
                        .WithMany("ExerciseHistory")
                        .HasForeignKey("ExerciseId");

                    b.Navigation("Exercise");
                });

            modelBuilder.Entity("BackendAPI.Models.Exercise", b =>
                {
                    b.Navigation("ExerciseHistory");
                });
#pragma warning restore 612, 618
        }
    }
}
