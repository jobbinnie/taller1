import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { PetsService } from "@/pets/pets.service";
import { CreatePetDto, UpdatePetDto } from "@/pets/pets.dtos";
import { ApiResponse } from "@/shared/api-response.dto";

@Controller("api/pets")
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  public findAll(@Param("studentId") studentId: string) {
    const pets = this.petsService.findAllForStudent(studentId);
    return new ApiResponse(
      true,
      200,
      "Lista de mascotas obtenida exitosamente",
      pets,
    );
  }

  @Post()
  public create(
    @Param("studentId") studentId: string,
    @Body() body: CreatePetDto,
  ) {
    const created = this.petsService.create(studentId, body);
    return new ApiResponse(
      true,
      201,
      "Mascota creada exitosamente",
      created,
    );
  }

  @Patch(":petId")
  public update(
    @Param("studentId") studentId: string,
    @Param("petId") petId: string,
    @Body() body: UpdatePetDto,
  ) {
    const updated = this.petsService.update(studentId, petId, body);
    return new ApiResponse(
      true,
      200,
      "Mascota actualizada exitosamente",
      updated,
    );
  }

  @Delete(":petId")
  public delete(
    @Param("studentId") studentId: string,
    @Param("petId") petId: string,
  ) {
    const deleted = this.petsService.delete(studentId, petId);
    return new ApiResponse(
      true,
      200,
      "Mascota eliminada exitosamente",
      deleted,
    );
  }
}