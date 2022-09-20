import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-bet-list-card',
  templateUrl: './bet-list-card.component.html',
  styleUrls: ['./bet-list-card.component.scss']
})
export class BetListCardComponent implements OnInit {

  private _bets = new BehaviorSubject<betDisplay[]>([])
  @Input() title: string
  @Input() set bets(val: any[]) {
    this._bets.next(val.map(bet => {
      let betType;
      if (bet.teaser) {
        betType = 'Teaser'
      }
      else if (bet.legs.length > 1) {
        betType = 'Parlay'
      }
      else {
        betType = 'Single'
      }
      return {
        risk: bet.risk,
        toWin: bet.toWin,
        result: bet.result,
        betType,
        dateSettled: new Date(bet.dateSettled).toLocaleString(),
        legs: bet.legs.map((leg: any) => {
          let lineOrSubtitle;
          if (leg.line !== undefined) {
            lineOrSubtitle = `${leg.line > 0 ? '+' : ''}${leg.line}`
          }
          else {
            lineOrSubtitle = leg.type == 'Moneyline' ? 'ML' : leg.type
          }
          return {
            fullSelection: `${leg.selection} ${lineOrSubtitle}`,
            description: leg.description,
            odds: `${leg.odds > 0 ? '+' : ''}${leg.odds}`
          }
        })
      }
    }))
  }

  get bets() {
    return this._bets.getValue()
  }

  constructor() { }

  ngOnInit(): void {
    this._bets.subscribe(data => {
    })
  }

}

interface betDisplay {
  legs: legDisplay[],
  risk: number,
  toWin: number,
  result: string,
  dateSettled: string,
  betType: string,
}

interface legDisplay {
  fullSelection: string,
  description: string,
  odds: string
}
