import express, {Request, Response} from "express";
import {getComponentStyle} from "../services/componentService";
import {db} from "../firebase";
import {Component} from "@ui-primitives-hub/types";

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


router.get("/dialog", async (req: Request, res: Response) => {
  try {
    const avatar: Component = {
      hierarchy: {
        name: "root",
        children: [
          {
            name: "trigger",
          },
          {
            name: "portal",
            children: [
              {
                name: "backdrop",
              },
              {
                name: "popup",
                children: [
                  {
                    name: "title",
                  },
                  {
                    name: "description",
                  },
                  {
                    name: "close",
                  },
                ],
              },
            ],
          },
        ],
      },
      parts: await getComponentStyle("dialog"),
    };

    res.json(avatar);
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
});

router.get("/field", async (req: Request, res: Response) => {
  try {
    const avatar: Component = {
      hierarchy: {
        name: "root",
        children: [
          {
            name: "label",
          },
          {
            name: "control",
          },
          {
            name: "description",
          },
          {
            name: "error",
          },
          {
            name: "validity",
          },
        ],
      },
      parts: await getComponentStyle("field"),
    };

    res.json(avatar);
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
});

router.get("/fieldset", async (req: Request, res: Response) => {
  try {
    const avatar: Component = {
      hierarchy: {
        name: "root",
        children: [
          {
            name: "legend",
          },
        ],
      },
      parts: await getComponentStyle("fieldset"),
    };

    res.json(avatar);
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
});

router.get("/menu", async (req: Request, res: Response) => {
  try {
    const avatar: Component = {
      hierarchy: {
        name: "root",
        children: [
          {
            name: "trigger",
          },
          {
            name: "portal",
            children: [
              {
                name: "backdrop",
              },
              {
                name: "positioner",
                children: [
                  {
                    name: "popup",
                    children: [
                      {
                        name: "arrow",
                      },
                      {
                        name: "item",
                      },
                      {
                        name: "separator",
                      },
                      {
                        name: "group",
                        children: [
                          {
                            name: "group-label",
                          },
                        ]
                      },
                      {
                        name: "radio-group",
                        children: [
                          {
                            name: "radio-item",
                          },
                        ]
                      },
                      {
                        name: "checkbox-item",
                      },
                    ],
                  },
                ],
              }
            ],
          },
        ],
      },
      parts: await getComponentStyle("menu"),
    };

    res.json(avatar);
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
});

router.get("/number-field", async (req: Request, res: Response) => {
  try {
    const avatar: Component = {
      hierarchy: {
        name: "root",
        children: [
          {
            name: "scrub-area",
            children: [
              {
                name: "scrub-area-cursor",
              },
            ]
          },
          {
            name: "group",
            children: [
              {
                name: "decrement"
              },
              {name: "input"},
              {name: "increment"}
            ]
          }
        ],
      },
      parts: await getComponentStyle("numberfield"),
    };

    res.json(avatar);
  } catch (error: any) {
    res.status(500).json({error: error.message});
  }
});

export default router;
