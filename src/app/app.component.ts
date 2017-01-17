import { Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:  [AuthService]

})
export class AppComponent implements OnInit {
  title = 'DevOps Dashboard';
  values = ''; testcase = '';
  testresult = [];



  constructor(private _service:AuthService){ }

   ngOnInit(){
    this.check();
   }

  check(){
    var result = this._service.details();

    // Subscribe to observable
    result.subscribe(
    results => {
        this.values = results;
        this.testcase = results.results[0].allTests[0];
        var tc = this.testcase ;

        var nArr = [];
        Object.keys(tc).map(function (key) {
          nArr.push({'testcase' : key , 'value' : tc[key]});
        });
        this.testresult = nArr;
        console.log(typeof this.testresult);
    },
    err => {
        // Log errors if any
        console.log(err);
    });
  }
}
