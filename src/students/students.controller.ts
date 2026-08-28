import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { StudentsService } from "@/students/students.service";
import { CreateStudentDto, UpdateStudentDto } from "@/students/students.dtos";
import { PetsService } from "@/pets/pets.service";
import { successResponse } from "@/shared/api-response.dtos";

@Controller("api/students")
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly petsService: PetsService,
  ) {}

  @Get()
  public findAll() {
    const students = this.studentsService.findAll();
    return successResponse(
      students,
      "Estudiantes obtenidos correctamente",
      200,
      {
        total: students.length,
      },
    );
  }

  @Get(":id")
  public findById(@Param("id") id: string) {
    const student = this.studentsService.findById(id);
    return successResponse(student, "Estudiante encontrado");
  }

  @Post()
  public create(@Body() body: CreateStudentDto) {
    const student = this.studentsService.create(body);
    return successResponse(student, "Estudiante creado correctamente", 201);
  }

  @Patch(":id")
  public update(@Param("id") id: string, @Body() body: UpdateStudentDto) {
    const student = this.studentsService.update(id, body);
    return successResponse(student, "Estudiante actualizado correctamente");
  }

  @Delete(":id")
  public delete(@Param("id") id: string) {
    const deleted = this.studentsService.delete(id);
    this.petsService.deleteAllForStudent(id);
    return successResponse(deleted, "Estudiante eliminado correctamente");
  }
}
