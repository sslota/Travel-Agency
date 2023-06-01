import { Component } from '@angular/core';
import { FireBaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Travel Agency';
  
  constructor(private fb: FireBaseService) {}

  ngOnInit(): void{

  }
}
