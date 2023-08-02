import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {IProject} from "../../../models/IProject";
import {ProjectsState} from "../../../store/projects/projects.state";
import {SetSelectedProject} from "../../../store/projects/projects.actions";
import {Navigate} from "@ngxs/router-plugin";

@Component({
    selector: 'list-projects',
    templateUrl: './list-projects.component.html',
    styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    @Select(ProjectsState.getProjects) projects$: Observable<IProject[]>;
    @Select(ProjectsState.getSelectedProject) selectedProject$: Observable<IProject>;

    constructor(
        private store: Store,
    ) {
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    setSelectedProject(project: IProject) {
        this.store.dispatch(new SetSelectedProject(project));
        this.store.dispatch(new Navigate(['/projects', {id: project.id}]));
    }
}
