import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AlertsModule } from 'angular-alert-module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './users/users.component';
import { SaveuserComponent } from './users/saveuser/saveuser.component';
import { ShortenPipe } from './users/shorten.pipe';
import { FilterPipe } from './users/filter.pipe';
import { RestServerService } from './services/restserver.service';
import { DefaultRequestOptions } from './services/defaultrequestoption';
import { OnlyNumber } from './validationdirective/onlynumbers.input';
import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';
import { GlobalErrorHandler } from './errorhandle/globalerrorhandle.error';
import { LoggingService } from './services/logging.service';
import { GlobalErrorComponent } from './errorhandle/globalerror.component';

const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user', component: UserComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'search', component: SearchComponent },
  { path: 'saveuser', component: SaveuserComponent },
  { path: 'error', component:GlobalErrorComponent}
];

export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TransactionComponent,
    SearchComponent,
    UsersComponent,
    SaveuserComponent,
    ShortenPipe,
    FilterPipe,
    OnlyNumber,
    TranslatePipe,
    GlobalErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
    AlertsModule.forRoot()
  ],
  providers: [RestServerService, DefaultRequestOptions, TranslateService, LoggingService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
