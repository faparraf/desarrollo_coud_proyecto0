import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {Event} from "../../model/event.model";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  event: Event;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let eventId = window.localStorage.getItem("editEventId");
    if(!eventId) {
      alert("Invalid action.")
      this.router.navigate(['list-event']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      name_event: ['', Validators.required],
      date_event: ['', Validators.required],
      type_event: ['', Validators.required],
    });
    this.apiService.getEventById(+eventId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });
  }

  onSubmit() {
    this.apiService.updateEvent(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data['success']) {
            alert('Evento actualizado.');
            this.router.navigate(['list-event']);
          }else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
