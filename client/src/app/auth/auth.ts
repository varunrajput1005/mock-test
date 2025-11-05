import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {

}
