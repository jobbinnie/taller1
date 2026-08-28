import { Module, forwardRef } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [forwardRef(() => StudentsModule)],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}