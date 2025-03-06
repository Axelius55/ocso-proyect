import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ){}



  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;


  }

  findAll() {
    return this.productRepository.find({
      loadEagerRelations: true,
      relations:{
        provider: true,
      }
    });
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      product_id: id,
    });
    if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return product;
  }

  findByProvider(id: string){
    return "ok";
  }
  
  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      product_id: id,
      ...updateProductDto,
    })
    if(!productToUpdate) throw new NotFoundException();
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    return this.productRepository.delete({
      product_id: id,
    })
    return {
      message: 'Objeto con el ${id} eliminado' 
    }
  }
}
