import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.expensesService.remove(+id);
  }

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Req() request: Request,
    @Param('id') expenseId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.expensesService.uploadAttachment(expenseId, file);
  }
}
