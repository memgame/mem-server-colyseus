import skills, { IApiSkills } from './apiSkills'

const api: IApi = {
    skills
}

export default api

export interface IApi {
    skills: IApiSkills
}