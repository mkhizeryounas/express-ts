import { Router, Request, Response, NextFunction } from "express";
const router = Router();

router.get("/", async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.reply({ data: { title: "Express TypeScript" } });
});

/* GET home page. */
router.get("/view", async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("index", { title: "Express TypeScript" });
});

export default router;
