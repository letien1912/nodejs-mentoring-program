import { ProductEntity } from '../entities/product.entity';
import productRepository from '../repositories/product.repository';

class ProductService {
  getAllProducts(): ProductEntity[] {
    return productRepository.findAll()
  }

  findById(id: string): ProductEntity | undefined {
    return productRepository.findById(id)
  }
}

export default new ProductService()
