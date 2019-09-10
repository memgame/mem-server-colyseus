import skills, { ISkills } from './skills'

const api: IApi = {
    skills
}

export default api

export interface IApi {
    skills: ISkills
}