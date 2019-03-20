import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(res => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${item.produto.id}-small.jpg`
        },
        error => {});
    }
  }

  removeItem(produto: ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).itens;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.decreaseQuantity(produto).itens;
  }

  total() : number {
    return this.cartService.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout(){
    this.navCtrl.setRoot('PickAddressPage');
  }
}
