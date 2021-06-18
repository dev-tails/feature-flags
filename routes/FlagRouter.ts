import { Db } from "mongodb";
import express, { Request, Response, Router } from "express";

export type Flag = {
  name: string;
  enabled: boolean;
};

const flags: { [name: string]: Flag } = {};

export type FlagRouterOptions = {
  db: Db;
};

export function initializeFlagRouter({ db }: FlagRouterOptions) {
  const Flag = db.collection("flags");
  const router = Router();

  router.get("", async (req, res, next) => {
    try {
      const flags = await Flag.find().toArray();

      res.json({
        success: true,
        body: flags,
      });
    } catch (err) {
      res.json({ success: false, errors: [err] });
    }
  });

  const adminRouter = Router();

  router.use("/admin", adminRouter);

  adminRouter.use(express.static("public"));

  adminRouter.post("", async (req, res, next) => {
    try {
      const name = req.body.name;

      await Flag.insertOne({
        name,
        enabled: req.body.enabled === true ? true : false,
      });

      res.json({
        success: true,
      });
    } catch (err) {
      res.json({ success: false, errors: [err] });
    }
  });

  adminRouter.put("/:name", async (req, res, next) => {
    try {
      const name = req.params.name;

      await Flag.updateOne(
        {
          name,
        },
        {
          enabled: req.body.enabled === true ? true : false,
        }
      );

      res.json({
        success: true,
      });
    } catch (err) {
      res.json({ success: false, errors: [err] });
    }
  });

  return router;
}
