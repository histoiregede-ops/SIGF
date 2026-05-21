import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Créer la table des documents
    await queryInterface.createTable('documents', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      lotId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'lots',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      nomFichier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeDocument: {
        type: DataTypes.ENUM('titre-foncier', 'depot', 'formalites', 'oppositions', 'autre'),
        allowNull: false,
      },
      statut: {
        type: DataTypes.ENUM('non-commence', 'en-cours', 'valide', 'rejete', 'bloque'),
        allowNull: false,
        defaultValue: 'non-commence',
      },
      champsSaisie: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      dateTraitement: {
        type: DataTypes.DATE,
        allowNull: true,
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
      commentaires: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    // Ajouter les index
    await queryInterface.addIndex('documents', ['lotId']);
    await queryInterface.addIndex('documents', ['indexeurId']);
    await queryInterface.addIndex('documents', ['statut']);
    await queryInterface.addIndex('documents', ['typeDocument']);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('documents');
  },
};
