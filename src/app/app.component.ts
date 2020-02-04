import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidationErrors
} from "@angular/forms";
import { Subscription } from "rxjs";
import { formModel } from "./form-model";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  formDefinitions: any = formModel;
  formItemDefinitions: any[] = formModel.FormItems;
  dynamicFormGroup: FormGroup;
  formSubscription: Subscription;
  result: string;
  resultModel: any;
  keys: string[];

  constructor(private formBuilder: FormBuilder) {
    this.keys = Object.keys(this.formItemDefinitions);
  }

  ngOnInit() {
    this.dynamicFormGroup = this.createForm(this.formItemDefinitions);
    this.formSubscription = this.onFormChange();
  }

  onFormChange(): Subscription {
    return this.dynamicFormGroup.valueChanges.subscribe(value => {
      this.result = JSON.stringify(value);
    });
  }

  ngOnDestroy(): void {
    this.formSubscription && this.formSubscription.unsubscribe();
  }

  onSubmit() {
    this.resultModel = this.result;
  }

  createForm(itemDefinitions: any) {
    const formGroup: FormGroup | any = {};
    for (const key of this.keys) {
      var formItemDefinition: any = this.formItemDefinitions[key];
      if (!formItemDefinition || formItemDefinition.FormItemType != "input") {
        continue;
      }

      let formControl: FormControl;
      if (formItemDefinition.Validations) {
        let validators: any[] = [];
        const validatorKeys = Object.keys(formItemDefinition.Validations);
        for (const validator of validatorKeys) {
          validators.push(Validators[validator]);
        }
        formControl = this.formBuilder.control(formItemDefinition.Value, {
          validators: validators
        });
      } else {
        formControl = this.formBuilder.control(formItemDefinition.Value);
      }
      formGroup[key] = formControl;
    }
    return this.formBuilder.group(formGroup);
  }

  isInputItem(formItemKey: string): boolean {
    return this.formItemDefinitions[formItemKey].FormItemType == "input";
  }

  isButtonItem(formItemKey: string): boolean {
    return this.formItemDefinitions[formItemKey].FormItemType == "button";
  }

  getType(formItemKey: string): string {
    return this.formItemDefinitions[formItemKey].Type;
  }

  getFormControlName(formItemKey: string): string {
    return this.formItemDefinitions[formItemKey].Name;
  }

  getItemLabel(formItemKey: string): string {
    return this.formItemDefinitions[formItemKey].Label;
  }

  getItemPlaceholder(formItemKey: string): string {
    return this.formItemDefinitions[formItemKey].PlaceHolder;
  }

  getFormItemValidationResult(formItemKey: string): any[] {
    let result: any[] = [];
    var formControl = this.dynamicFormGroup.controls[formItemKey];
    if (!formControl) {
      return result;
    }

    if (formControl.valid || formControl.untouched) {
      return result;
    }

    const errors: ValidationErrors = formControl.errors;
    if (!errors) {
      return result;
    }

    const errorKeys = Object.keys(errors);
    result = errorKeys.map(key => {
      console.log(key);
      return {
        name: key,
        description: this.formItemDefinitions[formItemKey].Validations[key]
      };
    });

    return result;
  }
}
