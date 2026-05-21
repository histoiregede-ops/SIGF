import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Créer la table des logs d'audit
    await queryInterface.createTable('audit_logs', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      entitéType: {
        type: DataTypes.ENUM('lot', 'document', 'upload', 'user'),
        allowNull: false,
      },
      entitéId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM('create', 'update', 'delete', 'validate', 'reject', 'assign'),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      oldValues: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
      newValues: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });

    // Ajouter les index
    await queryInterface.addIndex('audit_logs', ['entitéType', 'entitéId']);
    await queryInterface.addIndex('audit_logs', ['userId']);
    await queryInterface.addIndex('audit_logs', ['timestamp']);
    await queryInterface.addIndex('audit_logs', ['action']);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('audit_logs');
  },
};
