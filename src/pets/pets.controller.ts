import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PetsService } from "./pets.service";
import { CreatePetDto, UpdatePetDto } from "./pets.dtos";

@Controller("students/:studentId/pets")
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Param("studentId") studentId: string, @Body() data: CreatePetDto) {
    return this.petsService.create(studentId, data);
  }

  @Get()
  findAllForStudent(@Param("studentId") studentId: string) {
    return this.petsService.findAllForStudent(studentId);
  }

  @Patch(":petId")
  update(
    @Param("studentId") studentId: string,
    @Param("petId") petId: string,
    @Body() data: UpdatePetDto,
  ) {
    return this.petsService.update(studentId, petId, data);
  }

  @Delete(":petId")
  remove(@Param("studentId") studentId: string, @Param("petId") petId: string) {
    return this.petsService.delete(studentId, petId);
  }
}
