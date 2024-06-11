import { Component } from '@angular/core';
import { StudentModel } from '../student.model';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiService} from '../shared/api.service';
import { map } from 'rxjs';
import { DialogCloseOptions } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {


  
  formValue: FormGroup = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    class: new FormControl(''),


  });



  submitted = false;

  // formValue!: FormGroup; 

 studentobj :StudentModel  = new StudentModel;

 allstudent:any;
 btnUpdateShow:boolean=false;
 btnSaveShow:boolean=true;

 constructor(private formBuilder:FormBuilder,private api:ApiService, private ref:MatDialogRef<DialogComponent>){}

 ngOnInit(): void {
  this.formValue = this.formBuilder.group({
    name:['',[Validators.required, Validators.minLength(6)]],
    class:['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address:['',[Validators.required ,  Validators.minLength(2)]],
    number: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
      ],
    ],
  })
  this.AllStudent();
}

formsubmit(){
  return console.log(this.formValue.value)

}


AddStudent(){
  this.submitted = true;

  if (this.formValue.invalid) {
    return;
  }

  console.log(JSON.stringify(this.formValue.value, null, 2));


  this.studentobj.address = this.formValue.value.address;
  this.studentobj.number = this.formValue.value.number;
  this.studentobj.name = this.formValue.value.name;
  this.studentobj.email = this.formValue.value.email;
  this.studentobj.class = this.formValue.value.class;


this.api.postStudent(this.studentobj)
  .subscribe({
    next: (v) => {console.log(v)},
  error: (e) => {
    alert("Error")
    console.log(e)},
  complete: () => {
    console.log('complete')
    alert("Data Saved")
    this.AllStudent();
    this.formValue.reset();
  } })



}


AllStudent(){
  this.api.getStudent().subscribe((res) => {
    this.allstudent = res;
  })
}


EditStudent(data:any){
this.formValue.controls['name'].setValue(data.name);
this.formValue.controls['address'].setValue(data.address);
this.formValue.controls['email'].setValue(data.email);
this.formValue.controls['class'].setValue(data.class);
this.formValue.controls['number'].setValue(data.number);
this.studentobj.id = data.id;
this.UpdateShowBtn();
}



UpdateShowBtn(){
  this.btnUpdateShow = true;
  this.btnSaveShow = false;
  
}


UpdateStudent(){

 this.studentobj.address = this.formValue.value.address;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.number = this.formValue.value.number;
    this.studentobj.class = this.formValue.value.class;

    this.api.putStudent(this.studentobj,this.studentobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllStudent();
      this.SaveShowBtn();
    })


}

DeleteStudent(data:any){
  this.api.deleteStudent(data.id).subscribe(res => {
    alert("Record Deleted");
    this.AllStudent();
  })

}

SaveShowBtn()
{
  this.btnUpdateShow = false;
  this.btnSaveShow = true;
}


canclebtn() {
  this.formValue.reset();
}

//show data console..



get f(): { [key: string]: AbstractControl } {
  return this.formValue.controls;
}





closepopup(){
  this.ref.close()
}






}
