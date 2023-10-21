import productService from '../services/product.service';


export const getProducts = (req, res, next) => {

  try {
    const products = productService.getAllProducts();
     res.status(200).json({
      data: products,
      error: null
    });
  } catch (error) {
    next(error);
  }
}

export const getProduct = (req, res, next) => {
  try {
    const productId = req.params['productId'];
    const data = productService.findById(productId);
    if (!data) {
      const error = new Error("No product with such id")
      error['statusCode'] = 404
      throw error
    }


    return res.status(200).json({
      data,
      error: null
    });

  } catch (error) {
    next(error)
  }
}
