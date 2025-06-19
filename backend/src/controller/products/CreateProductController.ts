import { Request, Response } from "express";
import { CreateProductService } from "../../service/products/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    
      const UserId = req.userId!;
      const { name, ingredients } = req.body;

      const createProductService = new CreateProductService();

      const product = await createProductService.execute({ UserId, name, ingredients });

      return res.json(product);
    
  }
}

export { CreateProductController };
