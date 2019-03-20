import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PedidoDTO } from "../../models/pedido.dto";
import { text } from "@angular/core/src/render3/instructions";

@Injectable()
export class PedidoService{

    constructor(public http:HttpClient){

    }

    insert(obj: PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }    
        );
    }
}