import skills, { IApiSkills } from './apiSkills'
import players, { IApiPlayers } from './apiPlayers'

const api: IApi = {
    skills,
    players
}

export default api

export interface IApi {
    skills: IApiSkills,
    players: IApiPlayers
}