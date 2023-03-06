import { Modifier } from '../../db/models/Modifier'
import { Request, Response } from 'express'
import ErrorWithStatus from '../../utils/ErrorWithStatus'
import { Item } from '../../db/models/Item'
import { IdParam } from '../../types/common'
import { addModifierToItem } from '../../db/mappers'

type ModifierData = { description: string }

class ModifierController {
  public register() {
    return async (req: Request, res: Response) => {
      const { description }: ModifierData = req.body
      if (!description) {
        return Promise.reject(
          new ErrorWithStatus(400, 'Modifier description not provided')
        )
      }
      const [modifier, created] = await Modifier.findOrCreate({
        where: { description },
      })

      if (!created) {
        return Promise.reject(
          new ErrorWithStatus(
            400,
            'Modifier with that description already exists'
          )
        )
      }

      res.status(201).json({
        message: 'Modifier registered successfully',
        modifier: modifier.toJSON(),
      })
    }
  }

  public getAll() {
    return async (req: Request, res: Response) => {
      const modifiers = await Modifier.findAll({
        attributes: ['id', 'description'],
      })

      res.status(200).json({ modifiers })
    }
  }

  public getItemsForModifier() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params
      const modifier = await Modifier.findOne({
        where: { id },
        include: [
          {
            model: Item,
            attributes: ['id', 'name', 'description', 'price'],
            through: {
              attributes: [],
            },
          },
        ],
      })
      if (!modifier) {
        return Promise.reject(new ErrorWithStatus(404, 'Modifier not found'))
      }

      res.status(200).json({ items: modifier.items })
    }
  }

  public getOne() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params
      const modifier = await Modifier.findOne({
        attributes: ['id', 'description'],
        where: { id },
      })

      if (!modifier) {
        return Promise.reject(new ErrorWithStatus(404, 'Modifier not found'))
      }

      res.status(200).json({ modifier })
    }
  }

  public edit() {
    return async (req: Request<IdParam, ModifierData>, res: Response) => {
      const { description }: ModifierData = req.body
      const { id } = req.params

      const updated = await Modifier.update({ description }, { where: { id } })
      if (updated[0] === 0) {
        return Promise.reject(new ErrorWithStatus(404, 'Modifier not found'))
      }
      res.status(200).json({ message: 'Modifier updated successfully' })
    }
  }

  public delete() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params

      const deleted = await Modifier.destroy({ where: { id } })

      if (deleted === 0) {
        return Promise.reject(new ErrorWithStatus(404, 'Modifier not found'))
      }
      res.status(200).json({ message: 'Modifier deleted successfully' })
    }
  }

  public mapModifierToItem() {
    return async (
      req: Request<IdParam & { itemId: number }>,
      res: Response
    ) => {
      const { id, itemId } = req.params

      await addModifierToItem(id, itemId)

      res.status(200).json({ message: 'Modifier added to item successfully' })
    }
  }
}

export default new ModifierController()
