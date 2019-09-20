import charge from '../data/skills/charge.json'
import wordOfHealing from '../data/skills/wordOfHealing.json'
import test1 from '../data/skills/test1.json'
import test2 from '../data/skills/test2.json'
import test3 from '../data/skills/test3.json'
import test4 from '../data/skills/test4.json'
import test5 from '../data/skills/test5.json'

const allSkills: IStringSkillMap = {
    [test1.id]: test1,
    [test2.id]: test2,
    [test3.id]: test3,
    [test4.id]: test4,
    [test5.id]: test5,
    [charge.id]: charge,
    [wordOfHealing.id]: wordOfHealing,
}

const skills: IApiSkills = {
    getSkills: (): IStringSkillMap => {
        return allSkills
    },
    getSkillById: (id: string): any => {
        return allSkills[id]
    }
}
export default skills

export interface IApiSkills {
    getSkills (): IStringSkillMap,
    getSkillById (id: string): any
}

export interface IStringSkillMap { [key: string]: any; };