import cartService from '../services/cart.service';
import orderService from '../services/order.service';
import { cartValidation } from '../utils/validation';

export const postCart = (req, res, next) => {
  try {
    const userId = req['userId']
    const data = cartService.createCart(userId)

    return res.status(201).json({
      data,
      error: null
    });

  } catch (error) {
    next(error)
  }
}

export const getCart = (req, res, next) => {
  try {
    const userId = req['userId']
    const data = cartService.getOrCreateCart(userId)

    return res.status(200).json({
      data,
      error: null
    });

  } catch (error) {
    next(error)
  }
}

export const putCart = (req, res, next) => {
  const data = req.body;
  const {error} = cartValidation.validate(data);
  if (error) {
    return res.status(400).json({
      data: null,
      error: {
        message: `${ error.details.map(x => x.message).join(', ') }`
      }
    });
  }

  try {
    const userId = req['userId']
    const data = cartService.updateCart(userId, req.body)

    return res.status(200).json({
      data,
      error: null
    });

  } catch (error) {
    next(error)
  }
}

export const postCartCheckout = (req, res, next) => {
  try {
    const userId = req['userId']
    const data = orderService.checkout(userId)

    return res.status(200).json({
      data: {"order": data},
      error: null
    });
  } catch (error) {
    next(error)
  }
};

export const deleteCart = (req, res, next) => {
  try {
    const userId = req['userId']
    const data = cartService.emptyCart(userId)

    return res.status(200).json({
      data: {"order": data},
      error: null
    });
  } catch (error) {
    next(error)
  }
};
