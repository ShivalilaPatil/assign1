import { Component, OnInit } from '@angular/core';
import { CurrencyApiDataService } from 'src/app/currency-api-data.service';

@Component({
  selector: 'app-calcu',
  templateUrl: './calcu.component.html',
  styleUrls: ['./calcu.component.css'],
})
export class CalcuComponent implements OnInit {
  // **************  calculator     ************
  toshow = '0';
  currvalue = '';
  writetoinput(value: string) {
    this.currvalue = this.currvalue + value;
    this.toshow = this.currvalue;
  }

  equals() {
    this.toshow = eval(this.currvalue);
    this.currvalue = this.toshow;
  }

  clear() {
    this.currvalue = '';
    this.toshow = '0';
  }

  back() {
    this.currvalue = this.currvalue.slice(0, -1);
    this.toshow = this.currvalue;
    if (this.toshow == '') {
      this.toshow = '0';
    }
  }

  calcvalue(solve: any) {
    if (solve.charAt(0) == '0') {
      solve = solve.slice(1);
    }
    this.toshow = eval(solve);
  }

  //******** currency converter **********

  currjson: any = [];
  base = 'USD';
  cont2 = 'USD';
  result: string = '1';

  changebase(a: string) {
    this.base = a;
  }

  tocountry(b: string) {
    this.cont2 = b;
  }

  constructor(private currency: CurrencyApiDataService) {}

  convert() {
    this.currency.getcurrencydata(this.base).subscribe((data) => {
      this.currjson = JSON.stringify(data);
      this.currjson = JSON.parse(this.currjson);
      console.log(this.currjson);

      if (this.cont2 == 'USD') {
        this.result = this.currjson.rates.USD;
      }
      if (this.cont2 == 'INR') {
        this.result = this.currjson.rates.INR;
      }
      if (this.cont2 == 'EUR') {
        this.result = this.currjson.rates.EUR;
      }
      if (this.cont2 == 'JPY') {
        this.result = this.currjson.rates.JPY;
      }
      if (this.cont2 == 'AUD') {
        this.result = this.currjson.rates.AUD;
      }
      if (this.cont2 == 'GBP') {
        this.result = this.currjson.rates.GBP;
      }
    });
  }
  ngOnInit(): void {}
}
