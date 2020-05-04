/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spaces', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(spaces_id_seq::regclass)',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
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
    visibility: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'private'
    },
    page_order: {
      type: "ARRAY",
      allowNull: true,
      defaultValue: '{}'
    },
    vixen_masterclient_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    meta_data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: '{}'
    },
    custom_email_message: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'spaces'
  });
};
