import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IMAGE-frontend';
  cookieLawSeen: boolean;

  @ViewChild('cookieLaw', {static: true})
  cookieLawEl: any;

  ngOnInit() {
    this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
  }

  dismiss(): void {
    this.cookieLawEl.dismiss();
  }
}
