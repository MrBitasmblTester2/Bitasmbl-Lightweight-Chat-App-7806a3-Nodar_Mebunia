import Service from '@ember/service';
import * as signalR from '@microsoft/signalr';
export default class SignalrService extends Service{
  connection=null;
  async connect(hubBaseUrl){ if(this.connection) return this.connection;
    this.connection = new signalR.HubConnectionBuilder().withUrl(hubBaseUrl+"/chat").withAutomaticReconnect().build();
    await this.connection.start();
    return this.connection;
  }
}
