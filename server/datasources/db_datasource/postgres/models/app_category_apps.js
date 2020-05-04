/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('app_category_apps', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(app_category_apps_id_seq::regclass)',
      primaryKey: true
    },
    app_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    app_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'app_category_apps'
  });
};
