import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Event} from "../../model/event.model";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {

  events: Event[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getEvents()
      .subscribe( data => {
        this.events = data.result;
      });
  }

  deleteEvent(event: Event): void {
    this.apiService.deleteEvent(event.id)
      .subscribe( data => {
        this.events = this.events.filter(u => u !== event);
      })
  };

  editEvent(event: Event): void {
    window.localStorage.removeItem("editEventId");
    window.localStorage.setItem("editEventId", event.id.toString());
    this.router.navigate(['edit-event']);
  };

  addEvent(): void {
    this.router.navigate(['add-event']);
  };
}
