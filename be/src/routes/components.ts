import express, {Request, Response} from "express";
import {getComponentStyle} from "../services/componentService";
import {db} from "../firebase";
import { Component } from "@ui-primitives-hub/types";

const router = express.Router();


router.get("/accordion", async (req: Request, res: Response) => {
  try {
    const accordion: Component = {
      hierarchy: {
        name: "root",
        children: [
          {
            name: "item",
            children: [
              {name: "header", children: [{name: "trigger"}]},
              {name: "panel"},
            ],
          },
        ],
      },
      parts: await getComponentStyle("accordion"),
    };

    res.json(accordion);
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
});

router.put(
  "/accordion",
  async (req: any, res: any) => {
    const {id, data} = req.body;

    if (!id || !data) {
      return res.status(400).json({error: "ID nebo data chybí"});
    }

    try {
      const ref = db.ref(`accordion/${id}`);
      await ref.update(data);
      res.status(200).json({message: "Úspěšně aktualizováno"});
    } catch (error: any) {
      res.status(500).json({error: error.message});
    }
  }
);

router.get("/avatar", async (req: Request, res: Response) => {
  try {
    const avatar: Component = {
      hierarchy: {
        name: "root",
        children: [
          {
            name: "image",
          },
          {
            name: "fallback",
          },
        ],
      },
      parts: await getComponentStyle("avatar"),
    };

    res.json(avatar);
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
});

export default router;
