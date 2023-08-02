import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddProjectsComponent} from "./components/add-projects/add-projects.component";
import {ProjectsComponent} from "./components/projects/projects.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddProjectsComponent,
  },
  {
    path: 'projects',
    pathMatch: 'full',
    component: ProjectsComponent,
    children: [
        {
            path: ':id',
            component: ProjectsComponent,
        }
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
