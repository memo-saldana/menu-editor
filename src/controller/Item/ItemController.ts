import { Item } from '../../db/models/Item'
import { Request, Response } from 'express'
import ErrorWithStatus from '../../utils/ErrorWithStatus'
import { Modifier } from '../../db/models/Modifier'
import { IdParam } from '../../types/common'

type ItemData = { name: string; description: string; price: number }

class ItemController {
  public register() {
    return async (req: Request, res: Response) => {
      const { name, description, price }: ItemData = req.body
      console.log('price :>> ', price)
      console.log('typeof price :>> ', typeof price)
      if (!name) {
        return Promise.reject(
          new ErrorWithStatus(400, 'Item name not provided')
        )
      }
      if (!description) {
        return Promise.reject(
          new ErrorWithStatus(400, 'Item description not provided')
        )
      }
      if (!price) {
        return Promise.reject(
          new ErrorWithStatus(400, 'Item price not provided')
        )
      }
      const [item, created] = await Item.findOrCreate({
        where: { name },
        defaults: { description, price },
      })

      if (!created) {
        return Promise.reject(
          new ErrorWithStatus(400, 'Item with that name already exists')
        )
      }

      res.status(201).json({
        message: 'Item registered successfully',
        item: item.toJSON(),
      })
    }
  }

  public getAll() {
    return async (req: Request, res: Response) => {
      const items = await Item.findAll({
        attributes: ['id', 'name', 'description', 'price'],
      })

      res.status(200).json({ items })
    }
  }

  public getModifiersForItem() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params
      const modifiers = await Modifier.findAll({
        where: { itemId: id },
        attributes: ['id', 'description'],
      })

      res.status(200).json({ modifiers })
    }
  }

  public getOne() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params
      const item = await Item.findOne({
        attributes: ['id', 'name', 'description', 'price'],
        where: { id },
      })

      res.status(200).json({ item })
    }
  }

  public edit() {
    return async (req: Request<IdParam, ItemData>, res: Response) => {
      const { name, description, price }: ItemData = req.body
      const { id } = req.params

      const updated = await Item.update(
        { name, description, price },
        { where: { id } }
      )
      if (updated[0] === 0) {
        return Promise.reject(new ErrorWithStatus(404, 'Item not found'))
      }
      res.status(200).json({ message: 'Item updated successfully' })
    }
  }
  public delete() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params

      const deleted = await Item.destroy({ where: { id } })

      if (deleted === 0) {
        return Promise.reject(new ErrorWithStatus(404, 'Item not found'))
      }
      res.status(200).json({ message: 'Item deleted successfully' })
    }
  }
}

export default new ItemController()
