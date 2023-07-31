import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sorter-button',
  templateUrl: './sorter-button.component.html',
  styleUrls: ['./sorter-button.component.scss'],
})
export class SorterButtonComponent implements OnInit {
  // button text
  @Input() public text: string = 'text';
  //  button backgroun color
  @Input() public color: string = 'btn-primary';
  // button text color
  @Input() public textColor: string = 'text-base-100';
  // button disable value
  @Input() public disabled: boolean = false;
  //  button sizes
  @Input() public medium: boolean = false;
  @Input() public full: boolean = false;
  @Input() public small: boolean = false;
  @Input() public xSmall: boolean = false;
  @Input() public wide: boolean = false;
  // loader status
  @Input() public loader: boolean = false;
  // active button
  @Input() public active: boolean = false;
  // sortDirection
  public ascending: boolean = true;
  // show sort
  @Input() public show: boolean = false;

  //  click event emitter value
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  //  button click event emitter
  onPress = (event) => {
    this.show = true;
    this.ascending = !this.ascending;
    this.onClick.emit(this.ascending);
  };
}
