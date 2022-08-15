import { Renderer2 } from "@angular/core"

const sectionConfigs: {[key: string]: ResumeSectionConfig} = {
    "ABOUT ME": {
        icon: "perm_identity",
        htmlBuilder: (contentElm: any, sectionLines: string[], renderer: Renderer2) => {
            const contentSpan = renderer.createElement('span')
            contentSpan.appendChild(renderer.createText(sectionLines[2]))
            contentElm.appendChild(contentSpan)
        },
    },
    "WORK EXPERIENCE": {
        icon: "work",
        htmlBuilder: (contentElm: any, sectionLines: string[], renderer: Renderer2) => {
            const sectionList = renderer.createElement('ul')
            sectionLines.slice(2).forEach(line => {
                const listItem = renderer.createElement('li')
                listItem.appendChild(renderer.createText(line))
                sectionList.appendChild(listItem)
            })
            contentElm.appendChild(sectionList)
        },
    },
    "PERSONAL PROJECTS": {
        icon: "code",
        htmlBuilder: (contentElm: any, sectionLines: string[], renderer: Renderer2) => {
            const sectionList = renderer.createElement('ul')
            sectionLines.slice(2).forEach(line => {
                const listItem = renderer.createElement('li')
                listItem.appendChild(renderer.createText(line))
                sectionList.appendChild(listItem)
            })
            contentElm.appendChild(sectionList)
        },
    },
    "EDUCATION": {
        icon: "school",
        htmlBuilder: (contentElm: any, sectionLines: string[], renderer: Renderer2) => {
            const sectionList = renderer.createElement('ul')
            sectionLines.slice(2).forEach(line => {
                const listItem = renderer.createElement('li')
                listItem.appendChild(renderer.createText(line))
                sectionList.appendChild(listItem)
            })
            contentElm.appendChild(sectionList)
        },
    },
    "SKILLS": {
        icon: "build",
        htmlBuilder: (contentElm: any, sectionLines: string[], renderer: Renderer2) => {
            const sectionList = renderer.createElement('ul')
            sectionLines.slice(2).forEach(line => {
                const listItem = renderer.createElement('li')
                listItem.appendChild(renderer.createText(line))
                sectionList.appendChild(listItem)
            })
            contentElm.appendChild(sectionList)
        },
    }
}

interface ResumeSectionConfig {
	icon: string,
    htmlBuilder(contentElm: any, sectionLines: string[], renderer: Renderer2): void
}

export {sectionConfigs}