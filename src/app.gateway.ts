import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection{

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("SocketsLogger");

  @SubscribeMessage('messageToServer')
  handleMessage(client: any, payload: any): void {
    this.server.emit('messageToClient', payload);
    this.logger.log(`messageToClient: ${JSON.stringify(payload)}`);
  }

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`${client} just connected!`)
  }
}
