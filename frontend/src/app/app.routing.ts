import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddEventComponent} from "./event/add-event/add-event.component";
import {ListEventComponent} from "./event/list-event/list-event.component";
import {EditEventComponent} from "./event/edit-event/edit-event.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'list-event', component: ListEventComponent },
  { path: 'edit-event', component: EditEventComponent },
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
