import wordOfHealing from '../data/skills/wordOfHealing.json'

const skills: IApiSkills = {
    getSkills: (): IStringSkillMap => {
        var skills: IStringSkillMap = {}
        skills[wordOfHealing.id] = wordOfHealing
        return skills
    }
}
export default skills

export interface IApiSkills {
    getSkills (): IStringSkillMap
}

export interface IStringSkillMap { [key: string]: object; };