import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {ProjectsState} from "./store/projects/projects.state";
import {AddProjectsComponent} from "./components/add-projects/add-projects.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {ListProjectsComponent} from "./components/projects/list-projects/list-projects.component";
import {ProjectComponent} from "./components/projects/project/project.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {
    DatePipe,
    DecimalPipe, registerLocaleData
} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UtilService} from "./services/util.service";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,
        AddProjectsComponent,
        ProjectsComponent,
        ListProjectsComponent,
        ProjectComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        NgxsModule.forRoot([
            ProjectsState,
        ], {
            developmentMode: !environment.production
        }),

        NgxsRouterPluginModule.forRoot(),

        NgxsStoragePluginModule.forRoot({
            key: ['projects.projects'],
        }),

        // Material UI
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatGridListModule,
        MatListModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,

    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru-RU'},
        {provide: UtilService},
        DatePipe,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
