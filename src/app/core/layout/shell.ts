import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SingularityBackground } from '../../shared/ui/singularity-background/singularity-background';
import { Footer } from './footer';
import { Header } from './header';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, Footer, SingularityBackground],
  templateUrl: './shell.html',
})
export class Shell {}
