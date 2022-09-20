
const sectionConfigs: {[key: string]: ResumeSectionConfig} = {
    "ABOUT ME": {
        icon: "perm_identity",
    },
    "WORK EXPERIENCE": {
        icon: "work",
    },
    "PERSONAL PROJECTS": {
        icon: "code",
    },
    "EDUCATION": {
        icon: "school",
    },
    "SKILLS": {
        icon: "build",
    }
}

interface ResumeSectionConfig {
	icon: string,
}

export {sectionConfigs}