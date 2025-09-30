import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent {
  products: Product[] = [];
  newProduct: Product = { nombre: '', precio: 0, stock: 0 };
  private modalRef!: NgbModalRef;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products)
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    }
  }

  openAddProductModal(content: any): void {
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  addProduct(): void {
    if (this.isValidProduct()) {
        this.productService.addProduct(this.newProduct).subscribe(product => {
        this.newProduct.id = product.id; // Asignamos el id dinamico que nos entrega el servicio
        this.products.unshift(this.newProduct);
        this.resetForm();
        this.modalService.dismissAll();
      });
    }
  }

  isValidProduct(): boolean {
    return this.newProduct.nombre.trim() !== '' && this.newProduct.precio > 0;
  }

  private resetForm(): void {
    this.newProduct = { nombre: '', precio: 0, stock: 0 };
  }
}
