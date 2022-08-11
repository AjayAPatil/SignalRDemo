import { EventEmitter, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn:'root'
})
export class SignalRService {
  private _hubConnection!: HubConnection;
  public connectionStatus: string = 'Not Connected';
  public displayMessage = new EventEmitter<string>();
  public Connect() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  private createConnection() {
    this.connectionStatus = 'Connecting';
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.apiURL + 'signalr')
      .build();
    /**
     * If the server hasn't sent a message in 1 minute, 
     * the client considers the server disconnected and triggers the onclose event.
     */
    this._hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 120;//120 min
    /**
     * after 15 seeconds ping server
     */
    this._hubConnection.keepAliveIntervalInMilliseconds = 1000 * 15;//15 seconds
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionStatus = 'Connected';
      })
      .catch(err => {
        console.error('Error while establishing connection');
      });
    this._hubConnection.onclose((e) => {
      this.connectionStatus = 'Disconnected';
      console.log(e);
    });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('DisplayMessage', (message: string) => {
      this.displayMessage.emit(message);
    });
  }

  public getMessage(message: string){    
    this._hubConnection
    .invoke('GetData',message)
    .catch(error => {
      console.log(`error: ${error}`);
      alert('SignalR error!');
    }
  );
  }
}