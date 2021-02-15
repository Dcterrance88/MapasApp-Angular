import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef

  public mapa!: mapboxgl.Map;
  public zoomLevel: number = 10;
  public center: [number, number] = [-74.09476929690867, 4.746450340967757];

  constructor() { console.log('constructor', this.divMapa) }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomEnd', () => {});
    this.mapa.off('move', () => {});
  }


  ngAfterViewInit(): void {
    console.log('afterViewInit', this.divMapa);
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
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

    // Movimiento del mapa
    this.mapa.on('move', (event)=>{
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    })
    //Regla de Oro
    
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

/*
  Regla de oro
  cuando se tenga un listener que se implemente en el ngOnInit o en el ngAfterViewInit,
  cuando se tenga un on y sea un evento que siempre esta escuchando algo, en este caso 
  cuando un usuario se está moviendo de mapa y esto emite valores, cuando se sale del componente
  y se vuelve a entrar, dicho listener sigue existiendo y por tal razon debe ser destruido, para ello
  en el onDestroiy se tienen que destruir en este caso cada uno de los eventos que se 
  están ejecutando en el ngAfterViewInit
     */