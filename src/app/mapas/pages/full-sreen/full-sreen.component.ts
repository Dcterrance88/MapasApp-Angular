import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'app-full-sreen',
  templateUrl: './full-sreen.component.html',
  styles: [`
  #mapa {
    width: 100%;
    height: 100%;
  }
  `]
})
export class FullSreenComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {


    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.09476929690867, 4.746450340967757], //longitud, latitud
    zoom: 16,
    });
  }

}
