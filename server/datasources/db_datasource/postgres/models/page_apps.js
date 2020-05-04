/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page_apps', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(page_apps_id_seq::regclass)',
      primaryKey: true
    },
    page_id: {
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
    },
    instance_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'page_apps'
  });
};
