import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PickupPoint } from './pickup_points.schema';

@Injectable()
export class PickupPointsService {
  constructor(@InjectModel('PickupPoint') private readonly pickupPointsModel: Model<PickupPoint>) {}

  async findAll(): Promise<PickupPoint[]> {
    return await this.pickupPointsModel.find().exec();
  }

  async findOne(id: string): Promise<PickupPoint> {
    const result = await this.pickupPointsModel.findById(id).exec();
    if (!result) {
      throw Error(`Точка выдачи с id ${id} не найдена`);
    }
    return result;
  }
}
