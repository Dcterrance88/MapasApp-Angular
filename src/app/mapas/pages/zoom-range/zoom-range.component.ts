import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  .mapa-container{
    width: 100%;
    height: 100%;
  }
  .row{
    width: 400px;
    
    background-color:white;
    position: fixed;
    bottom: 50px;
    left: 50px;
    padding: 10px;
    border-radius: 5px;
    z-index: 9999;
  }
  `]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef

  public mapa!: mapboxgl.Map;
  public zoomLevel: number = 10;

  constructor() { console.log('constructor', this.divMapa) }


  ngAfterViewInit(): void {
    console.log('afterViewInit', this.divMapa);
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.09476929690867, 4.746450340967757],
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', (event)=>{
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (event)=>{
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18);
      }
    });
  }

  public zoomOut(){
    this.mapa.zoomOut();
  }

  public zoomIn(){
    this.mapa.zoomIn();
  }

  public zoomCambio( valor: string){
    this.mapa.zoomTo( Number(valor) )
  }

}
