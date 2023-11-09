
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  products = [
    {
      name: 'Café Latte',
      description: 'Café con leche',
      price: 33.99,
      imageUrl: '../../assets/images/latte.jpg'
    },
    {
      name: 'Capuchino',
      description: 'Café con espuma de leche',
      price: 44.49,
      imageUrl: '../../assets/images/capuccino.jpg'
    },
    {
      name: 'Espresso Doble',
      description: 'Doble ración de espresso',
      price: 34.99,
      imageUrl: '../../assets/images/espresso.jpg'
    },
    {
      name: 'Mocha frío', 
      description: 'Café frío con chocolate y leche',
      price: 44.79,
      imageUrl: '../../assets/images/mocha.jpg'
    },
    {
      name: 'Café Americano',
      description: 'Café oscuro',
      price: 22.99,
      imageUrl: '../../assets/images/americano.jpg'
    },
    {
      name: 'Cappuccino de Vainilla',
      description: 'Cappuccino con sabor a vainilla',
      price: 45.29,
      imageUrl: '../../assets/images/vainilla.jpg'
    },
    {
      name: 'Café Frappé',
      description: 'Café helado',
      price: 54.99,
      imageUrl: '../../assets/images/frappe.jpg'
    }
  ];
  
}

