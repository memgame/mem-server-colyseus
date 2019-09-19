import { Action } from "../actions/index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { Unit } from "../entities/unit";
import { Player } from "../models/player";
import { SkillProgress } from "../skills/skillProgress";
import { Skill } from "../skills/skill";
import api from '../api'

export const actionAddPlayer: Action<IStateRoot, Client> = (room, state, client, payload) => {
    //TODO make better server validation
    if (client != null) return

    const playerName = payload.playerName
    const unit = Unit.generate()
    const keysTeams = Object.keys(state.stateTeams.teams)
    const keyTeam = keysTeams[Math.floor(Math.random() * keysTeams.length)]
    unit.team = keyTeam
    unit.name = playerName

    const skills = api.skills.getSkills()
    const skillsKeys = Object.keys(skills)

    const skill1 = new Skill(skillsKeys[Math.floor(Math.random() * skillsKeys.length)])
    unit.skillSet.passiveSkill = new SkillProgress(0, skill1.maxLevel, skill1.id, 0)

    const skill2 = new Skill(skillsKeys[Math.floor(Math.random() * skillsKeys.length)])
    unit.skillSet.slot1 = new SkillProgress(0, skill2.maxLevel, skill2.id, 0)

    const skill3 = new Skill(skillsKeys[Math.floor(Math.random() * skillsKeys.length)])
    unit.skillSet.slot2 = new SkillProgress(0, skill3.maxLevel, skill3.id, 0)

    const skill4 = new Skill(skillsKeys[Math.floor(Math.random() * skillsKeys.length)])
    unit.skillSet.slot3 = new SkillProgress(0, skill4.maxLevel, skill4.id, 0)

    const skill5 = new Skill(skillsKeys[Math.floor(Math.random() * skillsKeys.length)])
    unit.skillSet.ultimateSkill = new SkillProgress(0, skill5.maxLevel, skill5.id, 0)

    state.stateUnits.addUnit(unit)

    var player = new Player(payload.sessionId)
    player.name = playerName
    player.unitId = unit.id
    state.statePlayers.addPlayer(player)
}