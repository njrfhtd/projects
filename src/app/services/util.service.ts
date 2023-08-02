import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class UtilService {

    constructor(
    ) {}

    getFormControl(formGroup: FormGroup, formControlName: string): FormControl {
        return this.getFormGroupOrControl(formGroup, formControlName) as FormControl;
    }

    private getFormGroupOrControl(formGroup: FormGroup, formControlName: string): AbstractControl {
        return formGroup.controls[formControlName];
    }
}
