import { Component, OnInit } from '@angular/core';
import { CandidatesService } from './services/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  constructor(private CS: CandidatesService) {}

  ngOnInit(): void {
    this.CS.getDepartments().then((departments) => {
      console.log('the departments are ', departments);
    });
  }
}
