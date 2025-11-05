import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-web',
  imports: [RouterOutlet , RouterLink],
  templateUrl: './web.html',
  styleUrl: './web.scss'
})
export class Web {

}
