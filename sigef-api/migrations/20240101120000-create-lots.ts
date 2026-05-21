import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Créer la table des lots
    await queryInterface.createTable('lots', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      typeDocument: {
        type: DataTypes.ENUM('titre-foncier', 'depot', 'formalites', 'oppositions', 'autre'),
        allowNull: false,
      },
      nombreDocuments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      statut: {
        type: DataTypes.ENUM('cree', 'affecte', 'en-cours', 'termine', 'archive'),
        allowNull: false,
        defaultValue: 'cree',
      },
      indexeurId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      dateCreation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      priorite: {
        type: DataTypes.ENUM('basse', 'normale', 'haute', 'urgente'),
        allowNull: false,
        defaultValue: 'normale',
      },
      commentaires: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    // Ajouter les index
    await queryInterface.addIndex('lots', ['statut']);
    await queryInterface.addIndex('lots', ['indexeurId']);
    await queryInterface.addIndex('lots', ['typeDocument']);
    await queryInterface.addIndex('lots', ['dateCreation']);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('lots');
  },
};
