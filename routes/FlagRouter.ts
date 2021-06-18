import express, { Router } from "express";

export type Flag = {
  name: string;
  enabled: boolean;
};

const flags: {[name: string]: Flag} = {};

export function initializeFlagRouter() {
  const router = Router();

  router.get("", (req, res, next) => {
    res.json({
      success: true,
      body: flags
    });
  });

  const adminRouter = Router();

  router.use("/admin", adminRouter);

  adminRouter.use(express.static('public'))

  adminRouter.post("", (req, res, next) => {
    const name = req.body.name
    flags[name] = {
      name,
      enabled: req.body.enabled === true ? true : false,
    }

    res.json({
      success: true,
    });
  });

  adminRouter.put("/:name", (req, res, next) => {
    const name = req.params.name;
    const flagToUpdate = flags[name]

    if (flagToUpdate) {
      flagToUpdate.enabled = req.body.enabled === true ? true : false
    }

    res.json({
      success: true,
    });
  });

  return router;
}
