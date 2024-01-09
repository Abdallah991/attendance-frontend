import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CodeWarsService } from '../service/code-wars.service';

@Component({
  selector: 'app-add-warrior',
  templateUrl: './add-warrior.component.html',
  styleUrls: ['./add-warrior.component.scss'],
})
export class AddWarriorComponent implements OnInit {
  // forms
  warriorForm: UntypedFormGroup;
  // loader of button
  addLoader: boolean = false;

  constructor(private fb: FormBuilder, private CWS: CodeWarsService) {
    // form
    this.warriorForm = this.fb.group({
      name: ['', Validators.required],
      codeWarsId: ['', Validators.required],
      platformId: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // add a warrior
  async addWarrior() {
    this.addLoader = true;
    this.warriorForm.disable();
    let warriorId = this.warriorForm.controls.codeWarsId.value;
    this.CWS.getWarriorData(warriorId).subscribe(
      (data) => {
        data = {
          name: this.warriorForm.controls.name.value,
          oldScore: data['honor'],
          newScore: data['honor'],
          platformId: this.warriorForm.controls.platformId.value,
          codeWarsId: this.warriorForm.controls.codeWarsId.value,
        };
        this.CWS.addWarrior(data).subscribe((data) => {
          console.log(data);
          this.addLoader = false;
          this.warriorForm.enable();
        });
      },
      (error) => {
        console.log(error);
        this.addLoader = false;
        this.warriorForm.enable();
        // ! show dialog
      }
    );
  }

  // navigate back
  async navigateBack() {}
}
