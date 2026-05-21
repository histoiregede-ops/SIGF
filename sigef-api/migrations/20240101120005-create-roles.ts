import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Créer la table des rôles
    await queryInterface.createTable('aut_roles', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'ID unique du rôle'
      },
      libelle: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: 'Libellé du rôle'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Description du rôle'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Soft delete - date de suppression logique'
      }
    }, {
      comment: 'Table des rôles disponibles'
    });

    // Insérer les rôles par défaut
    await queryInterface.bulkInsert('aut_roles', [
      {
        libelle: 'Créer utilisateur',
        description: 'Rôle pour créer de nouveaux utilisateurs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libelle: 'Éditer utilisateur',
        description: 'Rôle pour éditer les utilisateurs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libelle: 'Supprimer utilisateur',
        description: 'Rôle pour supprimer les utilisateurs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libelle: 'Indexer',
        description: 'Rôle pour indexer les documents',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libelle: 'Contrôler',
        description: 'Rôle pour contrôler les données',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libelle: 'Valider',
        description: 'Rôle pour valider les données',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('aut_roles');
  }
};
