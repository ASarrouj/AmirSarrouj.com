import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { sectionConfigs } from './resumeSections'


@Component({
	selector: 'app-about-me-page',
	templateUrl: './about-me-page.component.html',
	styleUrls: ['./about-me-page.component.scss']
})
export class AboutMePageComponent implements OnInit {

	resumeSections: any[]
	dateRegex = /[a-zA-Z]{3} \d{4} \u2013 [a-zA-Z]{3} \d{4}/
	dateRest = /.+(?=[a-zA-Z]{3} \d{4} \u2013 [a-zA-Z]{3} \d{4})/

	constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private titleService: Title, private httpClient: HttpClient) {
		iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/github.svg'));
		iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/linkedin.svg'));
		iconRegistry.addSvgIcon('house', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/house2.svg'));
		iconRegistry.addSvgIcon('phone', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/phone.svg'));
		iconRegistry.addSvgIcon('mail', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/mail.svg'));
		iconRegistry.addSvgIcon('youtube', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/youtube.svg'));
		
		titleService.setTitle('About Me');
	}

	ngOnInit(): void { 
		this.httpClient.get('assets/resume.txt', {responseType: 'text'}).subscribe(data => {
			const resumeXmlArray = data.trim().split(/\n\n(?=[A-Z]{3})/)
			resumeXmlArray.shift()
			this.resumeSections = resumeXmlArray.map(section => {
				const sectionLines = section.split('\n')
				let temp = [] as string[]
				let sectionArrays = [] as string[][]
				sectionLines.slice(2).map(line => {
					if (line == "") {
						sectionArrays.push(temp)
						temp = []
					}
					else {
						temp.push(line)
					}
				})
				sectionArrays.push(temp)
				const config = sectionConfigs[sectionLines[0]]

				return {
					title: sectionLines[0],
					icon: config.icon,
					content: sectionArrays
				}
			})
		})
	}
}