import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find({
      relations: {
        products: true,
      },
    });
  }

  findOne(id: string) {
    return this.providerRepository.findOne({
      where: {
        providerID: id,
      },
      relations: {
        products: true,
      },
    });
  }

  async findOneByName(name: string) {
    const provider = await this.providerRepository.findBy({
      providerName: Like(`%${name}%`),
    });
    if (!provider) throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providerRepository.preload({
      providerID: id,
      ...updateProviderDto,
    });

    if (!provider) {
      throw new Error(`Provider with ID ${id} not found`);
    }

    return this.providerRepository.save(provider);
  }

  remove(id: string) {
    this.providerRepository.delete({
      providerID: id,
    });
    return {
      message: 'Provider eliminado',
    };
  }
}
