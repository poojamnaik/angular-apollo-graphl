/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apps', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(apps_id_seq::regclass)',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    namespace: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
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
    secret_key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    use_post: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uploaded_icon_file_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uploaded_icon_content_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uploaded_icon_file_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    uploaded_icon_updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    restricted_access: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    partial: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: 'apps'
  });
};
