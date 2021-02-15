import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{
    width: 100%;
    height: 100%;
  }
  `]
})
export class MarcadoresComponent implements AfterViewInit{

  @ViewChild('mapa') divMapa!: ElementRef;

  public mapa!: mapboxgl.Map;
  public zoomLevel: number = 15;
  public center: [number, number] = [-74.09476929690867, 4.746450340967757];

  constructor() { }

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa);

      
  }

}
