'use strict';
/**
 * @description - Category CategoryTree модели дерево категорий
 */
export interface CategoryTree {
  /**
   * @var label: string
   */
  label: string;

  /**
   * @var data: string
   */
  data: string;

  /**
   * @var children: []
   */
  children: [];
}
