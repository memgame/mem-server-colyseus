import { Action } from "../actions/index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { Unit } from "../entities/unit";
import { Player } from "../models/player";

export const actionAddPlayer: Action<IStateRoot, Client> = (room, state, client, payload) => {
    //TODO make better server validation
    if (client != null) return

    const playerName = payload.playerName
    const unit = Unit.generate()
    const keysTeams = Object.keys(this.state.stateTeams.teams)
    const keyTeam = keysTeams[Math.floor(Math.random() * keysTeams.length)]
    unit.team = keyTeam
    unit.name = playerName
    this.state.stateUnits.addUnit(unit)

    var player = new Player(payload.sessionId)
    player.name = playerName
    player.unitId = unit.id
    this.state.statePlayers.addPlayer(player)
}