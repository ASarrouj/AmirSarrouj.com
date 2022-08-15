import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { sectionConfigs } from '../../assets/jsons/resumeSections'


@Component({
	selector: 'app-about-me-page',
	templateUrl: './about-me-page.component.html',
	styleUrls: ['./about-me-page.component.scss']
})
export class AboutMePageComponent implements OnInit, AfterViewInit {

	@ViewChild('toolbar') toolbar: MatToolbar;
	@ViewChild('mainContainer') mainContainer: ElementRef<HTMLElement>;

	constructor(private renderer: Renderer2, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private titleService: Title, private httpClient: HttpClient) {
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
			const resumeSections = data.trim().split(/\n\n(?=[A-Z]{3})/)
			resumeSections.shift()
			resumeSections.forEach(section => {
				const sectionLines = section.split('\n')
				const config = sectionConfigs[sectionLines[0]]

				const sectionCard = this.renderer.createElement('mat-card')

				const sectionTitle = this.renderer.createElement('mat-card-title')
				const sectionTitleContainer = this.renderer.createElement('div')
				this.renderer.addClass(sectionTitleContainer, 'titleContainer')
				const titleSpan = this.renderer.createElement('span')
				titleSpan.appendChild(this.renderer.createText(sectionLines[0]))
				sectionTitleContainer.appendChild(titleSpan)
				const sectionTitleIcon = this.renderer.createElement('mat-icon')
				this.renderer.addClass(sectionTitleIcon, 'mat-icon')
				this.renderer.addClass(sectionTitleIcon, 'notranslate')
				this.renderer.addClass(sectionTitleIcon, 'material-icons')
				this.renderer.addClass(sectionTitleIcon, 'mat-icon-no-color')
				this.renderer.setAttribute(sectionTitleIcon, 'aria-hidden', "true")
				this.renderer.setAttribute(sectionTitleIcon, 'data-mat-icon-type', "font")
				sectionTitleIcon.appendChild(this.renderer.createText(config.icon))
				sectionTitleContainer.appendChild(sectionTitleIcon)
				sectionTitle.appendChild(sectionTitleContainer)

				const sectionContent = this.renderer.createElement('mat-card-content')
				config.htmlBuilder(sectionContent, sectionLines, this.renderer)

				sectionCard.appendChild(sectionTitle)
				sectionCard.appendChild(sectionContent)
				this.renderer.addClass(sectionContent, 'mat-card-content')
				this.renderer.addClass(sectionTitle, 'mat-card-title')
				this.renderer.addClass(sectionCard, 'mat-card')
				this.renderer.addClass(sectionCard, 'mat-focus-indicator')
				this.mainContainer.nativeElement.appendChild(sectionCard)
			})
		})
	}

	ngAfterViewInit(): void {
		const toolbarHeight = this.toolbar._elementRef.nativeElement.clientHeight;
		this.renderer.setStyle(this.mainContainer.nativeElement, 'marginTop', `${toolbarHeight}px`);
	}
}