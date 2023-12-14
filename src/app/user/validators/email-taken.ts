import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable()
export class EmailTaken implements AsyncValidator {
    constructor(private auth: AngularFireAuth) { }

    validate() {
        
    }
}
