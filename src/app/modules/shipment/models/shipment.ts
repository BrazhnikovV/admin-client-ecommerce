/**
 * @description - Shipment интерфейс модели доставки
 */
export interface Shipment {

  /**
   * @var id: number
   */
  id: number;

  /**
   * @var address: string
   */
  address: string;

  /**
   * @var invoice_status: string
   */
  invoice_status: string;
}
