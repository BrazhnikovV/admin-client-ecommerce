/**
 * @description - Product интерфейс модели продукт
 */
import {ProductStatus} from '../enums/product-status.enum';

export interface Product {

  /**
   * @var id: number
   */
  id: number;

  /**
   * @var name: string
   */
  name: string;

  /**
   * @var description: string
   */
  description: string;

  /**
   * @var discount: number
   */
  discount: number;

  /**
   * @var price: number
   */
  price: number;

  /**
   * @var amount: number
   */
  amount: number;

  /**
   * @var productStatus: ProductStatus
   */
  productStatus: ProductStatus;

  /**
   * @var product_number: string
   */
  productNumber: string;
}
