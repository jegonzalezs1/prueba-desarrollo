import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {}


  goToUrlPersona(){
    this.document.location.href = "./persona";
  }

  goToUrlMascota(){
    this.document.location.href = "./mascota";
  }
}