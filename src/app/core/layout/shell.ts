import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer';
import { Header } from './header';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './shell.html',
})
export class Shell {}
