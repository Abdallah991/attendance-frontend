import { Component, OnInit } from '@angular/core';
import { CodeWarsService } from './service/code-wars.service';
import { CODE_WARS } from 'src/app/constants/constants';

@Component({
  selector: 'app-code-wars',
  templateUrl: './code-wars.component.html',
  styleUrls: ['./code-wars.component.scss'],
})
export class CodeWarsComponent implements OnInit {
  constructor(private CWS: CodeWarsService) {}

  ngOnInit(): void {
    this.CWS.getWarriorsData(CODE_WARS).subscribe((data) => {
      console.log(data);
    });
  }
}
