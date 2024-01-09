import { RouterModule, Routes } from '@angular/router';
import { CodeWarsComponent } from './code-wars.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddWarriorComponent } from './add-warrior/add-warrior.component';
import { WarriorsResolver } from './service/warriors.resolver';
import { BattelsResolver } from './service/battles.resolver';
import { BattleComponent } from './battle/battle.component';
import { BattleResolver } from './service/battle.resolver';

const routes: Routes = [
  {
    path: '',
    component: CodeWarsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      warriors: WarriorsResolver,
      battles: BattelsResolver,
    },
  },
  {
    path: 'add-warrior',
    component: AddWarriorComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'battle/:battleId',
    component: BattleComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      battle: BattleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class CodeWarsRoutingModule {}
