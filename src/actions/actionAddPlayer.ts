import { Action } from "../actions/index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { Unit } from "../entities/unit";
import { Player } from "../models/player";
import { SkillProgress } from "../skills/skillProgress";
import { Skill } from "../skills/skill";

export const actionAddPlayer: Action<IStateRoot, Client> = (room, state, client, payload) => {
    //TODO make better server validation
    if (client != null) return

    const playerName = payload.auth.name
    const unit = Unit.generate()
    const keysTeams = Object.keys(state.stateTeams.teams)
    const keyTeam = keysTeams[Math.floor(Math.random() * keysTeams.length)]
    unit.team = keyTeam
    unit.name = playerName

    const skill1 = new Skill(payload.auth.skillSet.passiveSkill.skillId)
    unit.skillSet.passiveSkill = new SkillProgress(0, skill1.maxLevel, skill1.id)
    //TODO remove level up
    unit.skillSet.passiveSkill.levelUp(1)

    const skill2 = new Skill(payload.auth.skillSet.slot1.skillId)
    unit.skillSet.slot1 = new SkillProgress(0, skill2.maxLevel, skill2.id)
    //TODO remove level up
    unit.skillSet.slot1.levelUp(1)

    const skill3 = new Skill(payload.auth.skillSet.slot2.skillId)
    unit.skillSet.slot2 = new SkillProgress(0, skill3.maxLevel, skill3.id)
    //TODO remove level up
    unit.skillSet.slot2.levelUp(1)

    const skill4 = new Skill(payload.auth.skillSet.slot3.skillId)
    unit.skillSet.slot3 = new SkillProgress(0, skill4.maxLevel, skill4.id)
    //TODO remove level up
    unit.skillSet.slot3.levelUp(1)

    const skill5 = new Skill(payload.auth.skillSet.ultimateSkill.skillId)
    unit.skillSet.ultimateSkill = new SkillProgress(0, skill5.maxLevel, skill5.id)
    //TODO remove level up
    unit.skillSet.ultimateSkill.levelUp(1)

    state.stateUnits.addUnit(unit)

    var player = new Player(payload.sessionId)
    player.name = playerName
    player.unitId = unit.id
    state.statePlayers.addPlayer(player)
}