const { sales, salesProducts, products } = require('../../database/sequelize/models');
const models = require('../../database/sequelize/models');

const findOne = (property, value) => sales.findOne({
  where: { [property]: value },
  include: [{ model: products, as: 'products', through: { attributes: [] } }],
});

const findAll = () => sales.findAll();

const findByUserId = (id) => sales.findAll({ where: { userId: id } });

const create = async ({ total, address, number, customerId, products: productsInput }) => {
  try {
    return await models.sequelize.transaction(async (t) => {
      const sale = await sales.create(
        { totalPrice: total, deliveryAddress: address, deliveryNumber: number, userId: customerId },
        { transaction: t },
      );
      
      await productsInput.map(async (product) =>
        salesProducts.create(
          { saleId: sale.id, productId: product.id, quantity: product.quantity },
          { transaction: t },
        ));

      // await PendingUsers.destroy({ where: { email: userEmail } }, { transaction: t });

      return sale;
    });
  } catch (error) {
    return ({ error });
  }
};

module.exports = {
  findOne,
  findAll,
  findByUserId,
  create,
};
