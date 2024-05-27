import { Injectable } from '@nestjs/common';
import { CreateBeatsheetDto } from './dto/create-beatsheet.dto';
import { UpdateBeatsheetDto } from './dto/update-beatsheet.dto';
import { BeatsheetsRepository } from './beatsheets.repository';

@Injectable()
export class BeatsheetsService {
  constructor(private readonly beatsheetRepository: BeatsheetsRepository) {}

  create(createBeatsheetDto: CreateBeatsheetDto) {
    return this.beatsheetRepository.create(createBeatsheetDto);
  }

  findAll() {
    return this.beatsheetRepository.find({});
  }

  findOne(_id: string) {
    return this.beatsheetRepository.findOne({ _id });
  }

  update(_id: string, updateBeatsheetDto: UpdateBeatsheetDto) {
    return this.beatsheetRepository.findOneAndUpdate(
      { _id },
      { $set: updateBeatsheetDto },
    );
  }

  remove(_id: string) {
    this.beatsheetRepository.findOneAndDelete({ _id });
  }
}
