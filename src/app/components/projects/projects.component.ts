import {Component} from '@angular/core';
import {Select} from "@ngxs/store";
import {ProjectsState} from "../../store/projects/projects.state";
import {Observable} from "rxjs";
import {IProject} from "../../models/IProject";

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
    @Select(ProjectsState.getSelectedProject) project$: Observable<IProject>;
}
