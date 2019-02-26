import { Room, Client } from 'colyseus';
import { State } from './state';
import map from '../../maps/map1.json';

export class Match extends Room {

    // When room is initialized
    onInit (options: any) {
        this.setState(new State)
        this.setPatchRate(1000 / 20);
        this.setSimulationInterval(() => this.update()); 
        console.log('new room')
    }

    // Checks if a new client is allowed to join. (default: `return true`)
    requestJoin (options: any, isNew: boolean) {
        console.log('-------------')
        console.log('request join')
        console.log(options)
        return true
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    async onAuth (options: any) {
        console.log('-------------')
        console.log('on auth')
        console.log(options)
        const userData = { name: 'SomeUserName'}
        return userData ? userData : false;
    }

    // When client successfully join the room
    onJoin (client: Client, options: any, auth: any) { 
        console.log('-------------')
        console.log('on join')
        console.log(client.id)
        console.log(options)
        console.log(auth)
        this.state.addPlayer(client, {
            name: auth.name
        })
    }

    // When a client sends a message
    onMessage (client: Client, message: any) { }

    // When a client leaves the room
    onLeave (client: Client, consented: boolean) {
        this.state.removePlayer(client)
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () {
        console.log('closed match room')
    }

    update () {
        this.state.calculateState(this.clock.deltaTime)
    }
}