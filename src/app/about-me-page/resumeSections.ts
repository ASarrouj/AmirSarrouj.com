import { SlicePipe } from "@angular/common"
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
            const flexBox = renderer.createElement('div');
            renderer.addClass(flexBox, 'flex-column')
            renderer.setAttribute(flexBox, 'gap', '10px')

            let temp = [] as string[]
            let jobSections = [] as string[][]
            sectionLines.slice(2).map(line => {
                if (line == "") {
                    jobSections.push(temp)
                    temp = []
                }
                else {
                    temp.push(line)
                }
            })
            jobSections.push(temp)
            
            jobSections.map(section => {
                const sectionList = renderer.createElement('ul');
                
                section.map((line, index) => {     
                    if (index == 0) {
                        const newSpan = renderer.createElement('span')
                        renderer.addClass(newSpan, 'important-text')
                        newSpan.appendChild(renderer.createText(line))
                        flexBox.appendChild(newSpan)
                    }
                    else if (index == 1) {
                        const newSpan = renderer.createElement('span')
                        newSpan.appendChild(renderer.createText(line))
                        flexBox.appendChild(newSpan)
                    }
                    else {
                        const listItem = renderer.createElement('li')
                        listItem.appendChild(renderer.createText(line))
                        sectionList.appendChild(listItem)
                    }
                })
                flexBox.appendChild(sectionList)
            })
            contentElm.appendChild(flexBox)
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
            const flexBox = renderer.createElement('div');
            renderer.addClass(flexBox, 'flex-column')
            renderer.addClass(flexBox, 'section-gap')

            let temp = [] as string[]
            let eduSections = [] as string[][]
            sectionLines.slice(2).map(line => {
                if (line == "") {
                    eduSections.push(temp)
                    temp = []
                }
                else {
                    temp.push(line)
                }
            })
            eduSections.push(temp)
            
            eduSections.map(section => {
                const sectionDiv = renderer.createElement('div')
                renderer.addClass(sectionDiv, 'flex-column')
                section.map((line, index) => {     
                    if (index == 0) {
                        const firstLineDiv = renderer.createElement('div')
                        renderer.addClass(firstLineDiv, 'education-header')
                        const importantSpan = renderer.createElement('span')
                        const dateSpan = renderer.createElement('span')
                        renderer.addClass(importantSpan, 'important-text')
                        const dateRange = /[a-zA-Z]{3} \d{4} \u2013 [a-zA-Z]{3} \d{4}/
                        const everythingElse = /.+(?=[a-zA-Z]{3} \d{4} \u2013 [a-zA-Z]{3} \d{4})/
                        importantSpan.appendChild(renderer.createText(everythingElse.exec(line)![0].trim()))
                        dateSpan.appendChild(renderer.createText(dateRange.exec(line)![0]))
                        firstLineDiv.appendChild(importantSpan)
                        firstLineDiv.appendChild(dateSpan)
                        sectionDiv.appendChild(firstLineDiv)
                    }
                    else {
                        const newSpan = renderer.createElement('span')
                        newSpan.appendChild(renderer.createText(line))
                        sectionDiv.appendChild(newSpan)
                    }
                })
                flexBox.appendChild(sectionDiv)
            })
            contentElm.appendChild(flexBox)
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