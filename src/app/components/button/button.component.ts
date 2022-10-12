import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  // button text
  @Input() public text: string = 'text';
  //  button backgroun color
  @Input() public color: string = 'btn-ghost';
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

  //  click event emitter value
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  //  button click event emitter
  onPress = (event) => this.onClick.emit(event);
}
