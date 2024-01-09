import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeWarsService } from '../service/code-wars.service';
import { Chart, registerables } from 'chart.js';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  constructor(
    private AR: ActivatedRoute,
    private CWS: CodeWarsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // form
    this.warriorForm = this.fb.group({
      name: ['', Validators.required],
      codeWarsId: ['', Validators.required],
      platformId: ['', Validators.required],
    });
  }
  //
  battle = null;
  warriors = [];
  warriorCodeWarsIds = [];
  codeWarsWarriors = [];
  result = {};
  warsChart: any = [];
  //
  loader = false;
  // add warrior
  // forms
  warriorForm: UntypedFormGroup;
  // loader of button
  addLoader: boolean = false;

  ngOnInit(): void {
    this.AR.data.subscribe((data) => {
      // battles
      this.battle = data.battle.battle;
      console.log(this.battle);
      // warriors
      this.warriors = this.battle.warriors;
      console.log(this.warriors);
      this.warriors.forEach((warrior) => {
        this.warriorCodeWarsIds.push(warrior.codeWarsId);
      });
      console.log(this.warriorCodeWarsIds);
      // code war apis
      this.CWS.getWarriorsData(this.warriorCodeWarsIds).subscribe((data) => {
        console.log('APi result', data);
        this.codeWarsWarriors = data;
        Chart.register(...registerables);

        try {
          if (this.warriorCodeWarsIds.length > 0) {
            //  TODO: make a button to switch between this audit with animation

            this.createBattleChart();
          }
        } catch (e) {
          console.log(e);
          // this.router.navigateByUrl('/students');
        }
      });
    });
  }

  createBattleChart() {
    // * results
    this.result = {
      // name: honor - oldScore
      // name : honor - oldScore
    };
    // warriors linked to database
    // load the result with key as codeWarsId and value as oldScore
    this.warriors.forEach((warrior) => {
      this.result[warrior.codeWarsId] = warrior.oldScore;
    });
    // warriors from api
    // get the warrior honor minus it from result
    this.codeWarsWarriors.forEach((warrior) => {
      this.result[warrior.username] =
        warrior.honor - this.result[warrior.username];
    });
    console.log(this.result);
    console.log(Object.values(this.result));
    // set up qualifications counts
    this.warsChart = new Chart('battleCanvas', {
      type: 'bar',
      data: {
        labels: Object.keys(this.result),
        datasets: [
          {
            label: 'Score',
            data: Object.values(this.result),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // start the battle
  startBattle() {
    // update all particiants old scores with the current honor points
    this.loader = true;
    // 1- formulate the data sent
    let data = [];
    // code wars warrior
    this.codeWarsWarriors.forEach((war) => {
      let warrior = {
        codeWarsId: war.username,
        score: war.honor,
      };
      data.push(warrior);
    });
    console.log(data);

    this.CWS.startBattle(data).subscribe((res) => {
      console.log(res);
      this.loader = false;
      window.location.reload();
    });
  }

  endBattle() {
    // Assigng a winner
    this.loader = true;
    // get the winner by comparing values of each key
    let warrior = null;
    let maxValue = -Infinity;
    for (const key in this.result) {
      if (this.result.hasOwnProperty(key)) {
        const value = this.result[key];
        if (value > maxValue) {
          maxValue = value;
          warrior = key;
        }
      }
    }
    let data = {
      winner: warrior,
    };

    this.CWS.updateBattle(this.battle.id, data).subscribe((res) => {
      console.log(res);
      this.loader = false;
    });
    console.log(warrior);
  }

  // add warrior
  addWarrior() {
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
        console.log(data);
        this.CWS.addWarrior(data).subscribe((data) => {
          console.log(data);
          let warriorId = [data.warrior.id];
          var request = {
            id: this.battle.id,
            warriorIds: warriorId,
          };
          this.CWS.addWarriorsTBattle(request).subscribe((val) => {
            console.log(val);
            this.addLoader = false;
            this.warriorForm.enable();
            this.updateRoute();
            // 3- navigate to battle view
          });
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

  // update route when adding a user
  updateRoute() {
    this.router.navigate([], {
      queryParams: {
        rand: Math.random(),
      },
    });
  }
}
