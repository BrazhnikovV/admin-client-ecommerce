'use strict';
/**
 * @description - Category CategoryTree модели дерево категорий
 */
export interface CategoryTree {

  /**
   * @var id: number
   */
  id: number;

  /**
   * @var parentId: number
   */
  parentId: number;

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

  /**
   * @var expanded: boolean
   */
  expanded: boolean;
}
