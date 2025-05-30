import db from '../models'
const { Op, where } = require("sequelize");
import { v4 as generateId } from 'uuid'
import generateCode from '../ultis/generateCode';
import moment from 'moment'
import generateDate from '../ultis/genetateDate';


export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})
export const getPostsLimitService = (page, {limitPost,order, ...query}, { priceNumber, areaNumber }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
        const limit = +limitPost || +process.env.LIMIT
        queries.limit = limit
        if (priceNumber) query.priceNumber = { [Op.between]: priceNumber }
        if (areaNumber) query.areaNumber = { [Op.between]: areaNumber }
        if (order) queries.order = [order]
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            //order: [['createdAt', 'DESC']],
            
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone', 'fbUrl'] },
                { model: db.Overview, as: 'overviews' },
                {model: db.Label, as:'labelData', attributes : {exclude : ['createdAt', 'updatedAt']}}
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            ],
            attributes: ['id', 'title', 'star', 'createdAt']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const createNewPostService = (body, userId) => new Promise(async (resolve, reject) => {
    try {

        const attributesId = generateId()
        const imagesId = generateId()
        const overviewId = generateId()
        const labelCode = generateCode(body.label)
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`
        const currentDate = generateDate();

        await db.Post.create({
            id: generateId(),
            title: body.title || null,
            labelCode,
            address: body.address || null,
            attributesId,
            categoryCode: body.categoryCode || null,
            description: JSON.stringify(body.description) || null,
            userId,
            overviewId,
            imagesId,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body?.province?.includes('Thành phố') ? generateCode(body.province.replace('Thành phố', ''))
                : generateCode(body.province.replace('Tỉnh', ''))
                || null,
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber
        })
        await db.Attribute.create({
            id: attributesId,
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng ` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2 `,
            published: moment(new Date).format('DD/MM/YYYY'),
            hashtag,
        })
        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body.images)
        })
        await db.Overview.create({
            id: overviewId,
            code: hashtag,
            area: body.label,
            type: body?.category,
            target: body?.target,
            bonus: '',
            created: currentDate.today,
            expired: currentDate.expireDay,
        })
        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace('Thành phố', '') },
                    { value: body?.province?.replace('Tỉnh', '') }
                ]
            },
            defaults: {
                code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) :
                    generateCode(body?.province?.replace('Tỉnh', '')),
                value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố', '') :
                    body?.province?.replace('Tỉnh', ''),
            }
        })
        await db.Label.findOrCreate({
            where: {

                code: labelCode
            },
            defaults: {
                code: labelCode,
                value: body.label
            }
        })


        resolve({
            err: 0,
            msg: 'OKE',

        })

    } catch (error) {
        reject(error)
    }
})

export const getPostsLimitAdminService = (
    page,
    id,
    query,
    { priceNumber, areaNumber },
    role
) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }

        // Nếu không phải admin => chỉ lấy bài của chính user đó
        if (role !== 'admin') {
            queries.userId = id
        }

        // Tạo options truy vấn
        const options = {
            where: queries,
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                { model: db.Overview, as: 'overviews' },
            ]
        }

        // Nếu KHÔNG phải admin thì thêm phân trang
        if (role !== 'admin') {
            options.limit = +process.env.LIMIT
            options.offset = offset * +process.env.LIMIT
        }

        const response = await db.Post.findAndCountAll(options)

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})


export const updatePost = ({ postId, overviewId, attributesId, imagesId, ...body }) => new Promise(async (resolve, reject) => {
    try {
        const labelCode = generateCode(body.label)
        await db.Post.update({
            title: body.title || null,
            labelCode,
            address: body.address || null,
            categoryCode: body.categoryCode || null,
            description: JSON.stringify(body.description) || null,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body?.province?.includes('Thành phố') ? generateCode(body.province.replace('Thành phố', ''))
                : generateCode(body.province.replace('Tỉnh', ''))
                || null,
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber
        }, {
            where: { id: postId }
        })
        await db.Attribute.update({
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng ` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2 `,
        }, {
            where: { id: attributesId }
        })
        await db.Image.update({
            image: JSON.stringify(body.images)
        }, {
            where: { id: imagesId }
        })
        await db.Overview.update({
            area: body.label,
            type: body?.category,
            target: body?.target,
        }, {
            where: { id: overviewId }
        })
        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace('Thành phố', '') },
                    { value: body?.province?.replace('Tỉnh', '') }
                ]
            },
            defaults: {
                code: body?.province?.includes('Thành phố') ? generateCode(body?.province?.replace('Thành phố', '')) :
                    generateCode(body?.province?.replace('Tỉnh', '')),
                value: body?.province?.includes('Thành phố') ? body?.province?.replace('Thành phố', '') :
                    body?.province?.replace('Tỉnh', ''),
            }
        })
        await db.Label.findOrCreate({
            where: {

                code: labelCode
            },
            defaults: {
                code: labelCode,
                value: body.label
            }
        })
        resolve({
            err: 0,
            msg: 'updated',
        })

    } catch (error) {
        reject(error)
    }
})

export const deletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.destroy({
            where: {id : postId},
           
        })
        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'Deleted' : 'No post deleted.',
            response
        })

    } catch (error) {
        reject(error)
    }
})