import { randomUUID } from "node:crypto";
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import type { Pet } from "./pets.entity";
import { CreatePetDto, UpdatePetDto } from "@/pets/pets.dtos";
import { InMemoryStore } from "@/shared/in-memory-store";
import { StudentsService } from "@/students/students.service";

@Injectable()
export class PetsService {
  private readonly store = new InMemoryStore<Pet>();

  constructor(
    @Inject(forwardRef(() => StudentsService))
    private readonly studentsService: StudentsService,
  ) {}

  public findAll(): Pet[] {
    return this.store
      .findAll()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  public findById(id: string): Pet {
    const pet = this.store.get(id);

    if (!pet) {
      throw new NotFoundException("Mascota no encontrada");
    }

    return pet;
  }

  public findByStudentId(studentId: string): Pet[] {
    return this.store.findAll().filter((pet) => pet.studentId === studentId);
  }

  public create(data: CreatePetDto): Pet {
    const studentId = (data as CreatePetDto & { studentId: string }).studentId;

    // lanza NotFoundException si el estudiante no existe
    this.studentsService.findById(studentId);

    const now = new Date();
    const pet: Pet = {
      id: randomUUID(),
      studentId,
      name: data.name,
      species: data.species,
      age: data.age,
      createdAt: now,
      updatedAt: now,
    };

    this.store.set(pet);
    return pet;
  }

  public update(id: string, data: UpdatePetDto): Pet {
    const existing = this.findById(id);
    const studentId = (data as UpdatePetDto & { studentId?: string }).studentId;

    if (studentId && studentId !== existing.studentId) {
      this.studentsService.findById(studentId);
    }

    const updated: Pet = {
      ...existing,
      name: data.name ?? existing.name,
      species: data.species ?? existing.species,
      age: data.age ?? existing.age,
      studentId: studentId ?? existing.studentId,
      updatedAt: new Date(),
    };

    this.store.set(updated);
    return updated;
  }

  public delete(id: string): Pet {
    const existing = this.findById(id);
    this.store.delete(id);
    return existing;
  }

  public deleteAllForStudent(studentId: string): void {
    this.findByStudentId(studentId).forEach((pet) => this.store.delete(pet.id));
  }
}
