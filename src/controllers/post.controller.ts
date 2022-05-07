import { registerSchema, updateSchema } from '../validators/post.validation'
import { Request, Response } from 'express'
import Post from './../models/post.model'

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await Post.findAll()
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    if (!id) return

    const result = await Post.findByPk(id)
    if (!result) return res.status(404).send('Post not found')
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const registerPost = async (req: Request, res: Response) => {
  const validationResult = registerSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send({ error: errorMsg })
  }

  try {
    const result = await Post.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id
  const validationResult = updateSchema.validate({ ...req.body, postId })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details
    return res.status(400).json({ error: errorMsg })
  }

  try {
    const updatedPost: any = await Post.update({ ...req.body }, { where: { id: postId } })
    if (!updatedPost) return res.status(404).send('User not found!')
    const result = await Post.findByPk(postId)
    return res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await Post.findByPk(req.params.id)
    if (!result) {
      return res.status(404).send('Player not found')
    } else {
      await result.destroy()
      return res.send(result)
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getAllPosts, getPostById, registerPost, updatePost, deletePost }
