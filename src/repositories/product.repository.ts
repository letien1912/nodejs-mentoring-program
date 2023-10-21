import { ProductEntity, productsdata } from '../entities/product.entity';

export class ProductRepository {
    private products: ProductEntity[] = [];
    constructor() {
        this.products = productsdata
    }

    findById(productId: string): ProductEntity | undefined {
        return this.products.find(product => product.id === productId);
    }

    findAll(): ProductEntity[] {
        return this.products;
    }

    create(product: ProductEntity): ProductEntity {
        this.products.push(product);
        return product;
    }

    update(productId: string, updatedProduct: ProductEntity): ProductEntity {
        const index = this.products.findIndex(product => product.id === productId);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products[index] = updatedProduct;
        return updatedProduct;
    }

    delete(productId: string): void {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }
}

export default new ProductRepository()
