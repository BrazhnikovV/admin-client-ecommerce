import {Component, Input, OnInit} from '@angular/core';

/**
 * @classdesc - ProgressComponent компонент для индикации сетевых операций
 */
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  /**
   * @var value: number - текущее значение прогресса
   */
  @Input()
  private value = 0;

  /**
   * constructor - конструктор
   */
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() {}
}
