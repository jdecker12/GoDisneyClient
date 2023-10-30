import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './shared/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { BottomSheetOverviewExampleSheet, BtmSheetComponent } from './btm-sheet/btm-sheet.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { GdbHeroComponent } from './gdb-hero/gdb-hero.component';
import { GdbMenuComponent } from './gdb-menu/gdb-menu.component';
import { DialogOverviewExampleDialog, ImageModalComponent } from './image-modal/image-modal.component';
import { LoginComponent } from './login/login.component';
import { SelectCardComponent } from './admin/select-card/select-card.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavToolbarComponent } from './sidenav-toolbar/sidenav-toolbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { CardComponent } from './cards/card/card.component';
import { FullCardComponent } from './cards/full-card/full-card.component';
import { DataService } from './service/data.service';
import { OrlandoWeatherComponent } from './orlando-weather/orlando-weather.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { CmsEmailComponent } from './cms-email/cms-email.component';
import { ManageMessagesComponent } from './manage-messages/manage-messages.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterUserAdminComponent } from './register-user-admin/register-user-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BtmSheetComponent,
    BottomSheetOverviewExampleSheet,
    ContactComponent,
    FooterComponent,
    GdbHeroComponent,
    GdbMenuComponent,
    ImageModalComponent,
    LoginComponent,
    SelectCardComponent,
    SideNavComponent,
    ToolbarComponent,
    SidenavToolbarComponent,
    SideBarComponent,
    NewsFeedComponent,
    CardComponent,
    FullCardComponent,
    OrlandoWeatherComponent,
    VideoPlayerComponent,
    DialogOverviewExampleDialog,
    SnackBarComponent,
    CmsEmailComponent,
    ManageMessagesComponent,
    RegisterUserComponent,
    RegisterUserAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  
  providers: [DataService],
  entryComponents: [BtmSheetComponent, BottomSheetOverviewExampleSheet],
  bootstrap: [AppComponent]
})

export class AppModule { }
