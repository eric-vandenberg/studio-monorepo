import { Inject, Injectable } from '@nestjs/common';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationsRepository } from '../repositories/reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRespository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { _id: userId, email }: UserDto,
  ) {
    return this.paymentsService
      .send('create_charge', {
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        map((response) => {
          return this.reservationsRespository.create({
            ...createReservationDto,
            invoiceId: response.id,
            userId,
          });
        }),
      );
  }

  async findAll() {
    return this.reservationsRespository.find({});
  }

  async findOne(_id: string, lean: boolean = true) {
    return this.reservationsRespository.findOne({ _id }, lean);
  }

  async update(
    _id: string,
    updateReservationDto: UpdateReservationDto,
    lean: boolean = true,
  ) {
    return this.reservationsRespository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
      lean,
    );
  }

  async remove(_id: string, lean: boolean = true) {
    return this.reservationsRespository.findOneAndDelete({ _id }, lean);
  }
}
