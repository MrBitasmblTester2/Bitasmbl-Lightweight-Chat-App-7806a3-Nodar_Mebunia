import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class ChatRoomComponent extends Component{
  messages = [];
  conn = null;
  @action
  async joinRoom(signalr, room){ this.conn = await signalr.connect(window.APP?.HUB_URL || 'http://localhost:5000');
    this.conn.on('ReceiveMessage', (r,user,text,timestamp)=>{ this.messages.push({room:r,user,text,timestamp}); });
    await this.conn.invoke('JoinRoom', room);
  }
  @action send(text, room, user){ const ts=new Date().toISOString(); this.conn.invoke('SendMessage', room, user||'anon', text, ts); }
}
