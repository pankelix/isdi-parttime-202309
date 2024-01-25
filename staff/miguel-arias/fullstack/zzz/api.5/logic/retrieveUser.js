import { User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError } from './errors.js'

function retrieveUser(userId) {
    validate.id(userId, 'user id')

    return User.findById(userId, 'name').lean() //en el findById le digo que me busque por userId pero que me devuelva solo name (y el _id, que siempre lo devuelve)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            delete user._id

            return user //al haber usado el lean y borrado user._id, el user es un objeto que envuelve el nombre
        })
}

export default retrieveUser