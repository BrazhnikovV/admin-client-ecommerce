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
   * @var hide: boolean - скрыт ли прогресс
   */
  private hide = false;

  /**
   * constructor - конструктор
   */
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() {}

  /**
   * ngOnChanges
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if ( this.value === 100 ) {
      setTimeout(() => this.hide = true, 1000 );
    }
  }
}
