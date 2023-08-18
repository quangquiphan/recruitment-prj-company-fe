import { Language } from "./lang.model"
import { Skill } from "./skill.model"

export interface Job {
    id: string,
    jobName: string,
    jobPosition: string,
    categoryJob: string,
    description: string,
    required: string,
    benefited: string,
    city: string,
    salary: string,
    address: string,
    expiryDate: string,
    createdDate: string,
    skills: any[],
    languages: Language[],
    companyId: string
    companyName: string,
    companyAvatar: string
}