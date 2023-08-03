import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {ClearSelectedProject, SetProject} from "../../../store/projects/projects.actions";
import {filter, Observable, Subscription} from "rxjs";
import {ProjectsState} from "../../../store/projects/projects.state";
import {IProject} from "../../../models/IProject";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import {UtilService} from "../../../services/util.service";
import {MyErrorStateMatcher} from "../../../services/error-matcher";

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    @Select(ProjectsState.getSelectedProject) project$: Observable<IProject>;

    protected formGroup: FormGroup;
    protected project: IProject;
    protected matcher = new MyErrorStateMatcher();

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private utilService: UtilService,
    ) {
    }

    ngOnInit() {
        this.subscriptions.add(this.project$
            .pipe(filter((value) => value !== null))
            .subscribe((project) => {
            this.project = project;
            this.createForm();
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.store.dispatch(new ClearSelectedProject());
    }

    onSave() {
        const project: IProject = this.formGroup.value;
        this.store.dispatch(new SetProject(project));
    }

    onClose() {
        this.store.dispatch(new ClearSelectedProject());
    }

    createForm() {
        this.formGroup = this.fb.group({
            id: new FormControl(this.project.id, [Validators.required]),
            subject: new FormControl(this.project.subject, [Validators.required]),
            description: new FormControl(this.project.description, [Validators.required]),
            createdBy: new FormControl(this.project.createdBy, [Validators.required]),
            cost: new FormControl(this.project.cost, [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]),
            startDate: new FormControl(this.project.startDate, [Validators.required]),
            endDate: new FormControl(this.project.endDate, [Validators.required]),
        });
    }

    getFormControl(formControlName: string): FormControl {
        return this.utilService.getFormControl(this.formGroup, formControlName) as FormControl;
    }
}
