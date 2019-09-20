import wenish from '../data/players/wenish.json'
import hydish from '../data/players/hydish.json'

const allPlayers: IStringPlayerMap = {
    [wenish.id]: wenish,
    [hydish.id]: hydish
}

const skills: IApiPlayers = {
    getPlayers: (): IStringPlayerMap => {
        return allPlayers
    },
    getPlayersById: (id: string): any => {
        return allPlayers[id]
    }
}
export default skills

export interface IApiPlayers {
    getPlayers (): IStringPlayerMap,
    getPlayersById (id: string): any
}

export interface IStringPlayerMap { [key: string]: any; };