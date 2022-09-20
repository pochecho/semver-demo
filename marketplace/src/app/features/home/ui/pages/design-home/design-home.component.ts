import {Component} from '@angular/core';
// import { BcCarouselConfig } from '@bancolombia/design-system-web/bc-behaviors';

@Component({
  selector: 'app-design-home',
  templateUrl: './design-home.component.html',
  styleUrls: ['./design-home.component.css'],
})
export class DesignHomeComponent {
  static route = 'design';
   

  objItemsGoodPractices = [
    {
      img: 'assets/temporal/desing-home/cards/solicitudProductos.png',
      title: 'Solicitud de productos',
      subTitle: 'Sitio público',
    },
    {
      img: 'assets/temporal/desing-home/cards/desembolsoCredito.png',
      title: 'Desembolso de crédito',
      subTitle: 'Pymes',
    },
    {
      img: 'assets/temporal/desing-home/cards/BINTEC.png',
      title: 'BINTEC 2018',
      subTitle: 'Innovación',
    },
    {
      img: 'assets/temporal/desing-home/cards/solicitudProductos2.png',
      title: 'Solicitud de productos',
      subTitle: 'Sitio público',
    },
  ];

  configCarousel = {
    iconNamePrev: 'arrow-left',
    iconNameNext: 'arrow-right',
    spacingBetweenItems: 3,
    swipeSpeed: 2,
    items: [],
    arrows: true,
    accessibility: true,
    initialSlide: 0,
    bullets: false,
    slidesToShow: 3.1,
    slidesToScroll: 1,
    swipe: false,
    variableWidth: false,
    infinity: false,
    gridSystem: false,
  };
}
