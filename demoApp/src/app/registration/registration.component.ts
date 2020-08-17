import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import * as countries from '../shared/assets/data/countries.json';
import { Router, ActivatedRoute } from '@angular/router';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm = this._fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z]+'),
      ],
    ],
    lastName: ['', [Validators.required, , Validators.pattern('[a-zA-Z]+')]],
    email: ['', [Validators.required, , Validators.email]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    addressType: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(13)]],
    newsLetter: [false],
  });

  countriesStates = [];
  states = [];
  id;
  userInfo;
  addressFlag = false;
  /**
   * For hobbies chip field
   */
  visible = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbyCtrl = new FormControl();
  hobbies: string[] = [];

  /**
   * For age slider
   */
  value: number = 1;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1, legend: '20to29' },
      { value: 2, legend: '30to39' },
      { value: 3, legend: '40to49' },
      { value: 4, legend: '50&above' },
    ],
  };
  constructor(
    private _fb: FormBuilder,
    public _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.countriesStates.push(...countries['countries']);

    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      if (this.id) {
        this.userInfo = JSON.parse(localStorage.getItem('regData'))[this.id];
        this.registrationForm.patchValue({
          firstName: this.userInfo.firstName,
          lastName: this.userInfo.lastName,
          email: this.userInfo.email,
          state: this.userInfo.state,
          country: this.userInfo.country,
          addressType: this.userInfo.addressType,
          address1: this.userInfo.address1,
          address2: this.userInfo.address2,
          newsLetter: this.userInfo.newsLetter,
          phoneNumber: this.userInfo.phoneNumber,
        });
        this.hobbies = this.userInfo.hobbies;
        this.value = this.userInfo.age;
        this.getStates(2);
      } else {
        localStorage.removeItem('currentPhoto');
      }
    });
  }

  get registerFormControl(): any {
    return this.registrationForm.controls;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add hobbies
    if ((value || '').trim()) {
      this.hobbies.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.hobbyCtrl.setValue(null);
  }

  remove(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

   /**
   * Populate states based on the country selected
   */
  getStates = (type) => {
    if (type === 2) {
      this.states = this.countriesStates.filter(
        (country) => country.country === this.userInfo.country
      )[0].states;

      this.registrationForm.patchValue({
        state: this.userInfo.state,
      });
    } else {
      this.states = this.countriesStates.filter(
        (country) => country.country === this.registrationForm.value.country
      )[0].states;
    }
  };

  /**
   * Show the adddress lines when address type is selected
   */
  enableAddress = () => {
    if (
      this.registrationForm.value.addressType === '1' ||
      this.registrationForm.value.addressType === '2'
    ) {
      this.addressFlag = true;
    } else {
      this.addressFlag = false;
    }
  };

  onSubmit = () => {
    if (localStorage.getItem('currentPhoto')) {
      let regestrationObject = [];
      if (
        localStorage.getItem('regData') === null ||
        localStorage.getItem('regData') === undefined
      ) {
        regestrationObject = [];
      } else {
        for (
          let i = 0;
          i < JSON.parse(localStorage.getItem('regData')).length;
          i++
        ) {
          regestrationObject.push(
            JSON.parse(localStorage.getItem('regData'))[i]
          );
        }
      }
      let regFormPrep = this.registrationForm.value;
      regFormPrep.hobbies = this.hobbies;
      regFormPrep.age = this.value;
      regestrationObject.push(regFormPrep);
      if (this.id) {
        regestrationObject.splice(this.id, 1);
      }
      localStorage.setItem('regData', JSON.stringify(regestrationObject));
      this._router.navigateByUrl(
        `registration/userInfo?id=${
          JSON.parse(localStorage.getItem('regData')).length - 1
        }?  `
      );
    } else {
      alert(
        'Your photo is not uploaded / Error with uploading. Please Re-upload the photo and try again'
      );
    }
  };
}
