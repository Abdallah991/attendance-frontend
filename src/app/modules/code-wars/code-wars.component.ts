import { Component, OnInit } from '@angular/core';
import { CodeWarsService } from './service/code-wars.service';
import { CODE_WARS } from 'src/app/constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { formatYYYYDDMMHHMM } from 'src/app/constants/globalMethods';

@Component({
  selector: 'app-code-wars',
  templateUrl: './code-wars.component.html',
  styleUrls: ['./code-wars.component.scss'],
})
export class CodeWarsComponent implements OnInit {
  constructor(
    private CWS: CodeWarsService,
    private AR: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.battleForm = this.fb.group({
      battleName: ['', Validators.required],
    });
  }

  // battle form
  battleForm: UntypedFormGroup;
  // warriors
  warriors = [];
  selectedWarriors = [];
  // battles
  battles = [];
  // battle loader
  battleLoader = false;

  ngOnInit(): void {
    // get battles and warriors
    this.AR.data.subscribe((data) => {
      this.warriors = data.warriors.warriors;
      this.warriors.map((warrior) => (warrior['selected'] = false));
      this.battles = data.battles.battles;
    });
  }

  // navigate to warrior
  async addWarrior() {
    // navigate to add warrior
    this.router.navigateByUrl('code-wars/add-warrior');
  }

  // select warriors far battle
  async selected(warrior) {
    // toggle select
    this.warriors.map((war) =>
      warrior.id === war.id ? (war['selected'] = !war['selected']) : war
    );
    this.selectedWarriors = [];
    this.warriors.forEach((war) => {
      if (war['selected']) {
        this.selectedWarriors.push(war);
      }
    });
  }

  // start battle
  async createBattle() {
    // 1- create battle
    this.battleLoader = true;
    let data = {
      name: this.battleForm.controls.battleName.value,
    };

    if (this.battleForm.controls.battleName.value != '') {
      this.CWS.createBattle(data).subscribe((data) => {
        console.log(data);
        // 2- add warriors to battle
        // if they were selected were <2 use warriors
        // if selected were > use selected warriors
        let warriors = [];
        let warriorIds = [];
        if (this.selectedWarriors.length < 2) {
          warriors = this.warriors;
        } else {
          warriors = this.selectedWarriors;
        }
        warriors.forEach((war) => {
          warriorIds.push(war['id']);
        });
        var request = {
          id: data.battle.id,
          warriorIds: warriorIds,
        };
        this.selectedWarriors = [];
        console.log(request);
        this.CWS.addWarriorsTBattle(request).subscribe((data) => {
          console.log(data);
          this.battleLoader = false;
          this.updateRoute();
          // 3- navigate to battle view
        });
      });
    }
  }

  formulateDate(date) {
    let fd: string = formatYYYYDDMMHHMM(date);
    return fd;
  }

  updateRoute() {
    this.router.navigate([], {
      queryParams: {
        rand: Math.random(),
      },
    });
  }

  // battle click impleemntation
  battleClicked(battle) {
    console.log(battle);
    // navigate to battle
    this.router.navigateByUrl('/code-wars/battle/' + battle.id);
  }
}
