import charge from '../data/skills/charge.json'
import wordOfHealing from '../data/skills/wordOfHealing.json'

const allSkills: IStringSkillMap = {
    [charge.id]: charge,
    [wordOfHealing.id]: wordOfHealing
}

const skills: IApiSkills = {
    getSkills: (): IStringSkillMap => {
        return allSkills
    },
    getSkillById: (id: string): object => {
        return allSkills[id]
    }
}
export default skills

export interface IApiSkills {
    getSkills (): IStringSkillMap,
    getSkillById (id: string): object
}

export interface IStringSkillMap { [key: string]: object; };