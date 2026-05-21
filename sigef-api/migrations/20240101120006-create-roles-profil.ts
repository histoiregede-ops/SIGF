import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Créer la table d'association entre rôles et profils
    await queryInterface.createTable('aut_roles_profil', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'ID unique de l\'association'
      },
      roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'aut_roles',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        comment: 'Référence vers la table des rôles'
      },
      profilId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'aut_profils',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        comment: 'Référence vers la table des profils'
      },
      actif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indique si l\'association est active'
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
      comment: 'Table d\'association entre rôles et profils'
    });

    // Créer les associations par défaut
    // Profil Administrateur a tous les rôles
    await queryInterface.sequelize.query(`
      INSERT INTO aut_roles_profil (roleId, profilId, actif, createdAt, updatedAt)
      SELECT id, (SELECT id FROM aut_profils WHERE titre = 'Administrateur'), 1, NOW(), NOW()
      FROM aut_roles
    `);

    // Profil Indexeur a le rôle Indexer
    await queryInterface.sequelize.query(`
      INSERT INTO aut_roles_profil (roleId, profilId, actif, createdAt, updatedAt)
      SELECT id, (SELECT id FROM aut_profils WHERE titre = 'Indexeur'), 1, NOW(), NOW()
      FROM aut_roles WHERE libelle = 'Indexer'
    `);

    // Profil Contrôleur a le rôle Contrôler
    await queryInterface.sequelize.query(`
      INSERT INTO aut_roles_profil (roleId, profilId, actif, createdAt, updatedAt)
      SELECT id, (SELECT id FROM aut_profils WHERE titre = 'Contrôleur'), 1, NOW(), NOW()
      FROM aut_roles WHERE libelle = 'Contrôler'
    `);

    // Profil Indexeur & Contrôleur a les deux rôles
    await queryInterface.sequelize.query(`
      INSERT INTO aut_roles_profil (roleId, profilId, actif, createdAt, updatedAt)
      SELECT id, (SELECT id FROM aut_profils WHERE titre = 'Indexeur & Contrôleur'), 1, NOW(), NOW()
      FROM aut_roles WHERE libelle IN ('Indexer', 'Contrôler')
    `);

    // Ajouter un index composite pour améliorer les performances
    await queryInterface.addIndex('aut_roles_profil', ['roleId', 'profilId'], {
      name: 'idx_role_profil_composite'
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('aut_roles_profil');
  }
};
