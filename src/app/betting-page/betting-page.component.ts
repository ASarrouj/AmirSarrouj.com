import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const baseUrl = 'https://www.amirsarrouj.com/api'

@Component({
  selector: 'app-betting-page',
  templateUrl: './betting-page.component.html',
  styleUrls: ['./betting-page.component.scss']
})
export class BettingPageComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  betSummary: { [key: string]: any } = {}
  currentBetData = { title: 'Current Bets', bets: [] as any[] }
  recentBetData = { title: 'Recent Bets', bets: [] as any[] }


  moneyTextColor(val: number) {
    return val >= 0 ? 'green' : 'red'
  }

  ngOnInit(): void {
    this.httpClient.get(`${baseUrl}/summaries/bets`, { responseType: 'json' }).subscribe(data => {
      this.betSummary = data
      this.betSummary['fromDate'] = new Date(this.betSummary['fromDate']).toLocaleDateString()
      // this.betSummary['total'] = `${this.betSummary['total'] < 0 ? '-' : ''}$${Math.abs(this.betSummary['total'])}`
    })

    const recentBetQs = new URLSearchParams({
      legs: 'true',
      limit: '10'
    })
    this.httpClient.get(`${baseUrl}/bets?${recentBetQs}`, { responseType: 'json' }).subscribe(data => {
      this.recentBetData.bets = data as any[]
    })
  }
}

