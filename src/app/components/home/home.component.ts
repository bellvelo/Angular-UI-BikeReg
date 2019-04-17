import { Component, OnInit } from '@angular/core';
import {BikeService} from '../../services/bike.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  models: string[] = [
    'Canyon Endurace',
    'Canyon Ultimate',
    'Canyon Ultimate SL'
  ];

  bikeform: FormGroup;
  validMessage: string = "";

  constructor(private bikeService: BikeService) { }

  ngOnInit() {
    this.bikeform = new FormGroup({
      name: new FormControl('', Validators.required), // requiring input
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      serialNumber: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required),
      contact: new FormControl(), // no input required
    })
  }

  submitRegistration(){
    if(this.bikeform.valid){
      this.validMessage = "Your bike registration has been submitted. Thank You!";
      this.bikeService.createBikeRegistration(this.bikeform.value).subscribe(
        data => {
          this.bikeform.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    } else {
      this.validMessage = "Please fill entire form before submitting.";
    }
  }

}
