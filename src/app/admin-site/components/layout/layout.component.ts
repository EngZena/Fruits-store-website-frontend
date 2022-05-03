import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  isLightTheme = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme() {
    this.isLightTheme = !this.isLightTheme;
    this.themeService.setDarkTheme(this.isLightTheme);
  }
}
