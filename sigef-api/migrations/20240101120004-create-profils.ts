import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Créer la table des profils
    await queryInterface.createTable('aut_profils', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'ID unique du profil'
      },
      titre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: 'Titre/Libellé du profil (Administrateur, Indexeur, Contrôleur, etc.)'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Description détaillée du profil'
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
      comment: 'Table des profils utilisateur (Administrateur, Indexeur, Contrôleur, etc.)'
    });

    // Insérer les profils par défaut
    await queryInterface.bulkInsert('aut_profils', [
      {
        titre: 'Administrateur',
        description: 'Administrateur système avec accès complet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titre: 'Indexeur',
        description: 'Utilisateur responsable de l\'indexation des documents',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titre: 'Contrôleur',
        description: 'Utilisateur responsable du contrôle des données indexées',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titre: 'Indexeur & Contrôleur',
        description: 'Utilisateur ayant les rôles d\'indexeur et de contrôleur',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('aut_profils');
  }
};
