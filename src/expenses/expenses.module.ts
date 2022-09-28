import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { AttachmentsModule } from '../attachments/attachments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), AttachmentsModule],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [TypeOrmModule],
})
export class ExpensesModule {}
