import {provide, Directive, Input} from 'angular2/core';
import {
NG_ASYNC_VALIDATORS,
Control,
Validators,
Validator
} from 'angular2/common';

@Directive({
  selector: '[a2beRemoteValidator][ngControl],[a2beRemoteValidator][ngFormControl],[a2beRemoteValidator][ngModel]',
  providers: [
    provide(NG_ASYNC_VALIDATORS, {
      useExisting: RemoteValidator,
      multi: true
    })
  ]
})

export class RemoteValidator implements Validator {
  @Input("a2beRemoteValidator") validationKey: string;
  @Input("validateFunction") execute: any;

  validate(control: Control): { [key: string]: any } {
    let value: string = control.value;
    return this.execute(value).then((result: boolean) => {
      if (result) {
        return null;
      }
      else {
        let error: any = {};
        error[this.validationKey] = true;
        return error;
      }
    });
  }
}