import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PickupPointsService } from './pickup_points.service';
import { PickupPoint } from './pickup_points.schema';

@Controller('pickup-points')
export class PickupPointsController {
  constructor(private readonly pickupPointsService: PickupPointsService) {}

  @ApiOperation({ summary: 'Получение списка всех точек выдачи' })
  @ApiResponse({ status: 200, type: [PickupPoint] })
  @Get()
  async findAll(): Promise<PickupPoint[]> {
    try {
      return await this.pickupPointsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Ошибка при получении точек выдачи',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Получение точки выдачи по id' })
  @ApiResponse({ status: 200, type: PickupPoint })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PickupPoint | null> {
    try {
      const pickupPoint = await this.pickupPointsService.findOne(id);
      if (!pickupPoint) {
        throw new HttpException('Точка выдачи не не найдена', HttpStatus.NOT_FOUND);
      }
      return pickupPoint;
    } catch (error) {
      throw new HttpException(
        'Ошибка при получении точки выдачи',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
