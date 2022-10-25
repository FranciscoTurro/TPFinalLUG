import { Request, Response } from "express";
import {CartModel}  from "../models/cart";
import { Model } from "mongoose";

export const cartController = {
    post: async (request:Request, response:Response) => {
        try {
            if(CartModel.find()) {
                console.log("No puede haber mas de un carrito existente")
                return
            }
            const body = request.body
            const model = new CartModel({...body})
        } catch (error) {
            response.status(500).send("Error")
        }
    }
};
