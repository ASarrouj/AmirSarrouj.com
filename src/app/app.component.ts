import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-app';

  // @ViewChild('toolbar') toolbar: MatToolbar;
	// @ViewChild('mainContainer') mainContainer: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
		// const toolbarHeight = this.toolbar._elementRef.nativeElement.clientHeight;
		// this.renderer.setStyle(this.mainContainer.nativeElement, 'marginTop', `${toolbarHeight}px`);
	}
}
