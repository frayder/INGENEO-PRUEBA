const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const usuariosRepository = require('../../repositories/usuarios');
const rolesRepository = require('../../repositories/roles');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
    try {

        let findObject = req.body;
        let arrRoles = [];
        //find

        let response = await usuariosRepository.validarIngreso2(findObject);

        //Si existe el usuario se obtiene su rol con sus permisos
        if (response.usuarios.length > 0) {

            findObject = {
                key: "Codigo",
                value: response.usuarios[0].IdRol
            }

            let responseRoles = await rolesRepository.buscar({ findObject });

            arrRoles = responseRoles.roles;
        }

        //set status code
        let statusCode;
        switch (response.status) {
            case constants.NOT_FOUND_ERROR_MESSAGE:
                statusCode = 404;
                break;
            case constants.INTERNAL_ERROR_MESSAGE:
                statusCode = 500;
                break;
            default:
                statusCode = 200;
        }

        //Response Object
        let oResponse = {
            usuarios: response.usuarios,
            roles: arrRoles
        }

        //return response
        if (statusCode !== 200) {
            oResponse.status = response.status;
            oResponse.error = {
                code: response.failure_code,
                message: response.failure_message
            }
        }

        res.status(statusCode).send(oResponse);

    } catch (error) {
        next(error);
    }
}

module.exports = [validate, handler];