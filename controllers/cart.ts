import { Request, Response } from "express";
import {CartModel}  from "../models/cart";
import { Model } from "mongoose";

export const cartController = {
    post: async (request:Request, response:Response) => {
        try {
            const cart = CartModel.find()
           if(cart.length) {
               const cart = new CartModel()
           }
           else {

           }
        } catch (error) {
            response.status(500).send("Error")
        }
    }
};
