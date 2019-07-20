/**
 * @description - Customer интерфейс модели клиента
 */
export interface Customer {
  /**
   * @var id: number
   */
  id: number;

  /**
   * @var email: string
   */
  email: string;

  /**
   * @var first_name: string
   */
  firstName: string;

  /**
   * @var last_name: string
   */
  lastName: string;

  /**
   * @var role: string
   */
  role: string;

  /**
   * @var username: string
   */
  username: string;
}
