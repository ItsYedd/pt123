import * as postService from '../services/post'

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const getPostsLimit = async (req, res) => {
    const { page, priceNumber, areaNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimitService(page, query, { priceNumber, areaNumber })
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        const { categoryCode, title, priceNumber, areaNumber, label } = req.body
        const {id} = req.user
        if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label) return res.status(400).json({
            err: 1,
            msg: 'missing input'
        })
        const response = await postService.createNewPostService(req.body, id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const getPostsLimitAdmin = async (req, res) => {
    const { page, priceNumber, areaNumber, ...query } = req.query
    const { id, role } = req.user;
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'missing inputs'
        })
        const response = await postService.getPostsLimitAdminService(page,id, query, { priceNumber, areaNumber },role )
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const updatePost = async (req, res) => {
    const { postId,overviewId, attributesId,imagesId, ...payload } = req.body 
    const {id} = req.user
    try {
        if (!postId || !id || !imagesId ||!attributesId || !overviewId) return res.status(400).json({
            err: 1,
            msg: 'missing Id'
        })
        const response = await postService.updatePost(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const deletePost = async (req, res) => {
    const { postId} = req.query 
    const {id} = req.user
    try {
        if (!postId || !id ) return res.status(400).json({
            err: 1,
            msg: 'missing Id'
        })
        const response = await postService.deletePost(postId)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}