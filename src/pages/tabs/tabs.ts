import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { LuxPage } from '../lux/lux';
import { LegiaoPage } from '../legiao/legiao';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LegiaoPage;
  tab3Root = LuxPage;

  constructor() {

  }
}
