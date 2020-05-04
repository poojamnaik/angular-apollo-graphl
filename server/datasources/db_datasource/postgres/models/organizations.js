/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('organizations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(organizations_id_seq::regclass)',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    uses_vixen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    uses_intro_tour: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    password_policy: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '^.{10,}$'
    },
    password_policy_description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Password should be of minimum 10 characters.'
    },
    clm_uuid: {
      type: DataTypes.UUIDV4,
      allowNull: true
    }
  }, {
    tableName: 'organizations',
    timestamps: true,
    underscored: true,
    freezeTableName: true    
  });
};
