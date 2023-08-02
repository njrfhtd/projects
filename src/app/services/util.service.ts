import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {IProject} from "../models/IProject";

@Injectable({
    providedIn: 'root',
})
export class UtilService {

    constructor(
    ) {}

    isAnProject(obj: any): obj is IProject {
        return 'id' in obj
            && 'subject' in obj
            && 'description' in obj
            && 'createdBy' in obj
            && 'startDate' in obj
            && 'endDate' in obj
            && 'cost' in obj;
    }

    getFormControl(formGroup: FormGroup, formControlName: string): FormControl {
        return this.getFormGroupOrControl(formGroup, formControlName) as FormControl;
    }

    private getFormGroupOrControl(formGroup: FormGroup, formControlName: string): AbstractControl {
        return formGroup.controls[formControlName];
    }
}
