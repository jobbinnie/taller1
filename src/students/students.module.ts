import { Module, forwardRef } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PetsModule } from '../pets/pets.module';

@Module({
  imports: [forwardRef(() => PetsModule)],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}