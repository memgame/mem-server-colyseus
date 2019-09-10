import wordOfHealing from '../data/skills/wordOfHealing.json'

const skills: ISkills = {
    getSkills: (): StringSkillMap => {
        var skills: StringSkillMap = {}
        skills[wordOfHealing.id] = wordOfHealing
        return skills
    }
}
export default skills

export interface ISkills {
    getSkills (): StringSkillMap
}

export interface StringSkillMap { [key: string]: object; };