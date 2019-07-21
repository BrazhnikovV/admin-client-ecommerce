/**
 * @description - Order интерфейс модели заказ
 */
export interface Order {

  /**
   * @var id: number
   */
  id: number;

  /**
   * @var account_number: string
   */
  account_number: string;

  /**
   * @var address: string
   */
  address: string;

  /**
   * @var order_status: string
   */
  order_status: string;
}
