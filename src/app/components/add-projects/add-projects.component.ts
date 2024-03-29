import {Component, OnInit} from '@angular/core';
import {AddProjects} from "../../store/projects/projects.actions";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {IJsonProjects} from "../../models/IJsonProjects";
import {UtilService} from "../../services/util.service";
import {MyErrorStateMatcher} from "../../services/error-matcher";

@Component({
  selector: 'add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
    protected formGroup: FormGroup;
    protected matcher = new MyErrorStateMatcher();

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private utilService: UtilService,
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formGroup = this.fb.group({
            json: new FormControl('', [Validators.required]),
        });
    }

    onSave() {
        try {
            const projects: any[] = (JSON.parse(this.formGroup.value.json) as IJsonProjects).Projects;
            const allAreProjects = projects.every((project) => this.utilService.isAnProject(project));
            if (allAreProjects) {
                this.formGroup.setErrors(null, {emitEvent: true});
                this.store.dispatch(new AddProjects(projects));
            } else {
                this.setError();
            }
        } catch (e) {
            this.setError();
        }
    }

    setError() {
        this.getFormControl('json').setErrors({'json': true}, {emitEvent: true});
    }

    getFormControl(formControlName: string): FormControl {
        return this.utilService.getFormControl(this.formGroup, formControlName) as FormControl;
    }
}
