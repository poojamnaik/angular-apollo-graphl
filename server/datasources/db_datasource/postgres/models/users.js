/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 'nextval(users_id_seq::regclass)',
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      primaryKey: true
    },
    encrypted_password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    reset_password_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    remember_created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sign_in_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    current_sign_in_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_sign_in_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    current_sign_in_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_sign_in_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: true,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    signup_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    signup_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar_file_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar_content_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar_file_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    avatar_updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email_status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    has_seen_intro_tour: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    has_seen_space_creation_tour: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    failed_attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    unlock_token: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
    locked_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    service_account: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    freezeTableName: true    
  });
};
