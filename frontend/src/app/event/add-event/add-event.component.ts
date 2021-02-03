import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name_event: ['', Validators.required],
      date_event: ['', Validators.required],
      type_event: ['', Validators.required],
    });

  }

  onSubmit() {
    this.apiService.createEvent(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-event']);
      });
  }

}
