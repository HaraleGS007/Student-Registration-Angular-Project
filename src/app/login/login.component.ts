import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { get } from 'http';
import { map } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginform: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),

  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group(
      {

        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20),],
        ],

      },

    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }

  login(): void {
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }

    console.log(JSON.stringify(this.loginform.value, null, 2));

    this._http.get<any>('http://localhost:3000/signup')
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginform.value.email && a.password === this.loginform.value.password
        })
        if (user) {
          alert('login succesfully......')


          this.loginform.reset();
          this.router.navigate(['home'])


        } else {
          alert("login faild....")
          this.router.navigate(['login'])
        }
      }
      )
  }
}

