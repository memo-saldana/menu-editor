import { Section } from '../../db/models/Section'
import { Request, Response } from 'express'
import ErrorWithStatus from '../../utils/ErrorWithStatus'
import { Item } from '../../db/models/Item'
import { IdParam } from '../../types/common'

type SectionData = { name: string; description: string }

class SectionController {
  public register() {
    return async (req: Request, res: Response) => {
      const { name, description }: SectionData = req.body
      if (!name) {
        return Promise.reject(
          new ErrorWithStatus(400, 'Section name not provided')
        )
      }
      if (!description) {
        return Promise.reject(
          new ErrorWithStatus(400, 'Section description not provided')
        )
      }
      const [section, created] = await Section.findOrCreate({
        where: { name },
        defaults: { description },
      })

      if (!created) {
        return Promise.reject(
          new ErrorWithStatus(400, 'Section with that name already exists')
        )
      }

      res.status(201).json({
        message: 'Section registered successfully',
        section: section.toJSON(),
      })
    }
  }

  public getAll() {
    return async (req: Request, res: Response) => {
      const sections = await Section.findAll({
        attributes: ['id', 'name', 'description'],
      })

      res.status(200).json({ sections })
    }
  }

  public getItemsForSection() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params

      const section = await Section.findOne({
        where: { id },
        include: [
          {
            model: Item,
            attributes: ['id', 'name', 'description', 'price'],
          },
        ],
      })
      if (!section) {
        return Promise.reject(new ErrorWithStatus(404, 'Section not found'))
      }
      res.status(200).json({ items: section.items })
    }
  }

  public getOne() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params
      const section = await Section.findOne({
        attributes: ['id', 'name', 'description'],
        where: { id },
      })

      if (!section) {
        return Promise.reject(new ErrorWithStatus(404, 'Section not found'))
      }

      res.status(200).json({ section })
    }
  }

  public edit() {
    return async (req: Request<IdParam, SectionData>, res: Response) => {
      const { name, description }: SectionData = req.body
      const { id } = req.params

      const updated = await Section.update(
        { name, description },
        { where: { id } }
      )
      if (updated[0] === 0) {
        return Promise.reject(new ErrorWithStatus(404, 'Section not found'))
      }
      res.status(200).json({ message: 'Section updated successfully' })
    }
  }
  public delete() {
    return async (req: Request<IdParam>, res: Response) => {
      const { id } = req.params

      const deleted = await Section.destroy({ where: { id } })

      if (deleted === 0) {
        return Promise.reject(new ErrorWithStatus(404, 'Section not found'))
      }
      res.status(200).json({ message: 'Section deleted successfully' })
    }
  }

  public mapSectionToItem() {
    return async (
      req: Request<IdParam & { itemId: number }>,
      res: Response
    ) => {
      const { id, itemId } = req.params

      const section = await Section.findOne({
        attributes: ['id', 'name', 'description'],
        where: { id },
      })

      if (!section) {
        return Promise.reject(new ErrorWithStatus(404, 'Section not found'))
      }

      const item = await Item.findOne({ where: { id: itemId } })

      if (!item) {
        return Promise.reject(new ErrorWithStatus(404, 'Item not found'))
      }
      await item.$set('section', section)
      res.status(200).json({ message: 'Item added to section successfully' })
    }
  }
}

export default new SectionController()
