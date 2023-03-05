import { Request, Response } from 'express'
import ErrorWithStatus from '../../utils/ErrorWithStatus'
import { Section } from '../../db/models/Section'
import { Item } from '../../db/models/Item'
import { Modifier } from '../../db/models/Modifier'

class MenuController {
  public getMenu() {
    return async (req: Request, res: Response) => {
      const sections = await Section.findOne({
        attributes: ['id', 'name', 'description'],
        include: [
          {
            model: Item,
            attributes: ['id', 'name', 'description', 'price'],
            include: [
              {
                model: Modifier,
                attributes: ['id', 'description'],
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
      })

      res.status(200).json({ sections })
    }
  }
}

export default new MenuController()
