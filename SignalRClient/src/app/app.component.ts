import { Component } from '@angular/core';
import { SignalRService } from './signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SignalRClient';
  message = '';
  constructor(public signalr: SignalRService){
    this.signalr.Connect();
    this.signalr.displayMessage.subscribe(re=>{
      alert(re);
    })
  }
  invoke() {
    this.signalr.getMessage(this.message);
  }
}
