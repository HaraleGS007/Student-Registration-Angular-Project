import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName ,FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {FormsModule} from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),

  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,private _http :HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        number: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
     
      },
   
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));


this._http.post<any>('http://localhost:3000/signup',this.form.value)
.subscribe(res=>{
  alert('Register successfully.....')
  this.form.reset()
  this.router.navigate(['login'])

}, err=>{
  alert('Wrong type error...')
})
}

















}

