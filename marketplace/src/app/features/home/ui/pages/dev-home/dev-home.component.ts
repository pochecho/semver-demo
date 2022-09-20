import { Component } from '@angular/core';
@Component({
  selector: 'app-dev-home',
  templateUrl: './dev-home.component.html',
  styleUrls: ['./dev-home.component.css'],
})
export class DevHomeComponent {
  static route = 'develop';
  showVersion = false;
  objItemsGoodPractices = [
    {
      img: 'assets/temporal/dev-home/cards/colores.png',
      title: 'Todo lo que debes saber de Colores en UI Design: Teoría y Práctica',
      date: 'Diciembre 15, 2020',
    },
    {
      img: 'assets/temporal/dev-home/cards/feedback.png',
      title: '¿Cómo hacer una sesión de feedback con diseñadores?',
      date: 'Mayo 27, 2020',
    },
    {
      img: 'assets/temporal/dev-home/cards/inclusivo.png',
      title: '10 maneras de diseñar productos más inclusivos',
      date: 'Diciembre 15, 2020',
    },
    {
      img: 'assets/temporal/dev-home/cards/buenas-practicas.png',
      title: 'Buenas practicas para diseñar iconos perfectos',
      date: 'Diciembre 15, 2020',
    },
  ];

  developOptions = [
    {
      icon: 'book',
      title: 'Aprender',
      path: 'https://bancolombia.sharepoint.com/sites/co-tst/SitePages/proyectos_galatea_entrenamiento_frontend_modulo-1.aspx',
      id: 'buttonDownload',
    },
    {
      icon: 'laptop',
      title: 'Instalar',

      path: '/documentation/how-to-install',
      id: 'buttonInstall',
    },
    {
      icon: 'like',
      title: 'Guidelines',
      path: 'https://grupobancolombia.visualstudio.com/Vicepresidencia%20Servicios%20de%20Tecnolog%C3%ADa/_wiki/wikis/Vicepresidencia%20Servicios%20de%20Tecnolog%C3%ADa.wiki/21512/Front-end',
      id: 'buttonConfigure',
    },
    {
      icon: 'upload',
      title: 'Contribuir',
      path: 'https://grupobancolombia.visualstudio.com/Vicepresidencia%20Servicios%20de%20Tecnolog%C3%ADa/_wiki/wikis/Vicepresidencia%20Servicios%20de%20Tecnolog%C3%ADa.wiki/28592/Proceso-de-contribuci%C3%B3n-a-componentes-Frontend-Galatea',
      id: 'buttonContribute',
    },
  ];
  shortcuts = [
    {
      icon: 'assistence',
      id: 'iconoResourceComponents',
      title: 'Componentes Front-End',
      description: 'Los componentes engloban todos aquellos elementos que conforman un producto digital.',
      path: '/component-catalogue/components',
    },
    {
      icon: 'my-products',
      id: 'iconoResourceFlujos',
      title: 'Flujos transversales',
      description: 'Úsalos como punto de partida para la creación de experiencias transversales a cualquier segmento.',
      path: '/component-catalogue/widgets',
    },
    {
      icon: 'cube-3d',
      id: 'iconoResourceFigma',
      title: 'Componentes Back',
      description: 'Contienen los, componentes gráficos y patrones para diseñar y construir productos Bancolombia.',
      path: '/component-catalogue/backend',
    },
  ];

  configCarousel = {
    iconNamePrev: 'arrow-left',
    iconNameNext: 'arrow-right',
    spacingBetweenItems: 2,
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
