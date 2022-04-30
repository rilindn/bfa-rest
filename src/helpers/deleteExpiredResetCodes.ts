import ResetCode from '../models/resetCode.model'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const deleteResetCodes = async (email: String) => {
  await ResetCode.destroy({
    where: {
      [Op.or]: [
        { email },
        {
          createdAt: {
            [Op.lt]: new Date(Date.now() - 10 * 60 * 1000),
          },
        },
      ],
    },
  })
}

export default deleteResetCodes
