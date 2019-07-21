/**
 * @description - Invoice интерфейс модели счет фактуры
 */
export interface Invoice {

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
