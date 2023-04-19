require('dotenv').config();
const { Company, Sector, User } = require('../models');
const port = process.env.PORT

class CompanyController {
    static async getAllCompany(req, res, next) {
        try{
            const findAllCompany = await Company.findAll({
                include: [
                    {
                        model: Sector
                    },
                    {
                        model: User
                    }
                ]
            })

            if(findAllCompany){
                res.status(200).json(findAllCompany)
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch(error){

        }
    }

    static async getCompanyById(req, res, next) {
        const {id} = req.params
        try{
            const findCompanyById = await Company.findOne({
                where: {
                    id
                },
                include : [
                    {
                        model: Sector
                    },
                    {
                        model: User
                    }
                ]
            })
            if (findCompanyById){
                res.status(200).json(findCompanyById)
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }

    static async createCompany(req, res, next) {
        const {id} = req.userLogged;
        const {sector, company_name, address, description, website} = req.body
        const logo = req.file.filename 
        const file = `http://localhost:${port}/uploads/logo/${logo}`
        try{
            const findSector = await Sector.findOne({where: {sector : `${sector}`}})

            const data = await Company.create({
                user_id : id,
                sector_id : findSector.id,
                company_name,
                address,
                description,
                website,
                logo: file
            })
            if(data){
                res.status(200).json({message: "Successfully create company!"})
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }

    static async updateCompanyById(req, res, next) {
        const {id} = req.params
        const {sector, company_name, address, description, website} = req.body
        try{
            const findSector = await Sector.findOne({where: {sector : `${sector}`}})

            const updateCompany = await Company.update({
                sector_id : findSector.id,
                company_name,
                address,
                description,
                website
            },
            {
                where: {
                    id
                }
            })
            if(updateCompany){
                res.status(200).json({message: "Successfully update company"})
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }

    static async updateCompanyLogo(req, res, next) {
        const {id} = req.params
        const logo = req.file.filename 
        const file = `http://localhost:${port}/uploads/logo/${logo}`
        try{
            const updateCompanyLogo = await Company.update({
                logo : file
            },
            {
                where: {
                    id
                }
            })
            if(updateCompanyLogo){
                res.status(200).json({message: "Successfully update logo"})
            }else{
                next({name: 'ErrorNotFound'})
            }
        }catch (error){
            next(error)
        }
    }

    static async deleteCompanyById(req, res, next) {
        const {id} = req.params
        try{
            const deleteCompanyById = await Company.destroy({
                where : {
                    id
                }
            })
            if (deleteCompanyById){
                res.status(200).json({message: "Successfully delete company"})
            }else{
                next({name: 'ErrorNotFound'})
            }

        }catch (error){
            next(error)
        }
    }

}

module.exports = CompanyController;
