import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from './sidenav/sidenav.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ThemingService } from './theming.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    SidenavComponent,
    ToolbarComponent
  ],
  exports: [
    SidenavComponent,
    ToolbarComponent
  ],
  providers: [
    SidenavService,
    ThemingService
  ]
})
export class CoreModule { }
