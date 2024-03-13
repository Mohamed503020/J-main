import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FeaturesRoutingModule } from './features.routing';
import { ActivitiesComponent } from './layouts/activities/activities.component';
import { DrawerChatComponent } from './layouts/drawer-chat/drawer-chat.component';
import { ShopingCartComponent } from './layouts/shoping-cart/shoping-cart.component';
import { ScrollTopComponent } from './layouts/scroll-top/scroll-top.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SmsLibModule } from '4j-sms-lib';
import { BreadCrumbComponent } from './layouts/bread-crumb/bread-crumb.component';
import { SecondarySidbarComponent } from './layouts/secondary-sidbar/secondary-sidbar.component';



@NgModule({
  declarations: [
    FeaturesComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ActivitiesComponent,
    DrawerChatComponent,
    ShopingCartComponent,
    ScrollTopComponent,
    DashboardComponent,
    BreadCrumbComponent,
    SecondarySidbarComponent,
  ],
  imports: [
    CommonModule ,FeaturesRoutingModule 
  ]
})
export class FeaturesModule { }
