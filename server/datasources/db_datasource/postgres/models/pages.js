/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pages', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(pages_id_seq::regclass)',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    space_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    app_order: {
      type: "ARRAY",
      allowNull: true,
      defaultValue: '{}'
    }
  }, {
    tableName: 'pages'
  });
};
