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
import { successResponse } from "@/shared/api-response.dtos";

@Controller("api/pets")
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  public findAll() {
    const pets = this.petsService.findAll();
    return successResponse(pets, "Mascotas obtenidas correctamente", 200, {
      total: pets.length,
    });
  }

  @Get(":id")
  public findById(@Param("id") id: string) {
    const pet = this.petsService.findById(id);
    return successResponse(pet, "Mascota encontrada");
  }

  @Post()
  public create(@Body() body: CreatePetDto) {
    const pet = this.petsService.create(body);
    return successResponse(pet, "Mascota creada correctamente", 201);
  }

  @Patch(":id")
  public update(@Param("id") id: string, @Body() body: UpdatePetDto) {
    const pet = this.petsService.update(id, body);
    return successResponse(pet, "Mascota actualizada correctamente");
  }

  @Delete(":id")
  public delete(@Param("id") id: string) {
    const deleted = this.petsService.delete(id);
    return successResponse(deleted, "Mascota eliminada correctamente");
  }
}
