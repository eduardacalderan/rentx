import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: "Category Already Exists!" });
  }

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
  const all = categoriesRepository.list();

  return res.json(all);
});

export { categoriesRoutes };
