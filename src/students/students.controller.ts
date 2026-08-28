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
import { ApiResponse } from "@/shared/api-response.dto";

@Controller("api/students")
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly petsService: PetsService,
  ) {}

  @Get()
  public findAll() {
    const students = this.studentsService.findAll();
    return new ApiResponse(
      true,
      200,
      "Lista de estudiantes obtenida exitosamente",
      students,
    );
  }

  @Get(":id")
  public findById(@Param("id") id: string) {
    const student = this.studentsService.findById(id);
    return new ApiResponse(
      true,
      200,
      "Estudiante encontrado exitosamente",
      student,
    );
  }

  @Post()
  public create(@Body() body: CreateStudentDto) {
    const created = this.studentsService.create(body);
    return new ApiResponse(
      true,
      201,
      "Estudiante creado exitosamente",
      created,
    );
  }

  @Patch(":id")
  public update(@Param("id") id: string, @Body() body: UpdateStudentDto) {
    const updated = this.studentsService.update(id, body);
    return new ApiResponse(
      true,
      200,
      "Estudiante actualizado exitosamente",
      updated,
    );
  }

  @Delete(":id")
  public delete(@Param("id") id: string) {
    const deleted = this.studentsService.delete(id);
    this.petsService.deleteAllForStudent(id);
    return new ApiResponse(
      true,
      200,
      "Estudiante eliminado exitosamente",
      deleted,
    );
  }
}
