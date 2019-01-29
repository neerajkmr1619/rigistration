import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validator, Validators, FormGroup } from '@angular/forms';
import { ContactRequest } from '../Contact-request';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
 
  get Name(){
    return this.registrationForm.get('Name');
  }
  constructor(private fb : FormBuilder,private _registrationService: RegistrationService) {
   
  }
  contactRequest =new ContactRequest();

  registrationForm = this.fb.group({
    Name:['',Validators.required],
    Password :[''],
    Phone:['']
  });
  // registrationForm = new FormGroup(
  //   {
  //     Name :new  FormControl(''),
  //     Password : new FormControl(''),
  //     Phone :new FormControl(''),
  //   }
  // );

 onSubmit(){
   this.contactRequest =    this.registrationForm.value;
   console.log(this.contactRequest);
   this._registrationService.register(this.contactRequest)
   .subscribe(
    response => console.log('Success!', response),
    error => console.error('Error!', error)
   )
 }
  

  ngOnInit() {}
}