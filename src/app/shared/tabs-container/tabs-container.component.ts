import { Component, ContentChildren } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent {

  @ContentChildren(TabComponent) tabs = {};

  ngAfterContentInit() {
    console.log(this.tabs);
  }
}
