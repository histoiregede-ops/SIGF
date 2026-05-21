import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Créer la table des centres de conservation foncière d'abord (dépendance)
    if (!await queryInterface.tableExists('aut_centres_conservation_fonciere')) {
      await queryInterface.createTable('aut_centres_conservation_fonciere', {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          comment: 'ID unique du centre'
        },
        libelle: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: 'Libellé du centre'
        },
        code: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          comment: 'Code unique du centre'
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: 'Description du centre'
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
      });
    }

    // Créer la table des utilisateurs
    await queryInterface.createTable('aut_utilisateurs', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'ID unique de l\'utilisateur'
      },
      nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Nom de famille de l\'utilisateur'
      },
      prenoms: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: 'Prénoms de l\'utilisateur'
      },
      identifiant: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: 'Identifiant unique pour la connexion'
      },
      matricule: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
        comment: 'Matricule de l\'utilisateur'
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        comment: 'Adresse email unique'
      },
      motDePasse: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Mot de passe hashé (bcrypt)'
      },
      contact: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Numéro de contact/téléphone'
      },
      profilId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'aut_profils',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        comment: 'Référence vers le profil de l\'utilisateur'
      },
      centreConservationFonciereId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'aut_centres_conservation_fonciere',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        comment: 'Référence vers le centre de conservation foncière'
      },
      photoDeProfil: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Chemin vers la photo de profil'
      },
      dateVerificationEmail: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Date de vérification de l\'email'
      },
      actif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indique si le compte est actif'
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
      comment: 'Table des utilisateurs du système'
    });

    // Créer les index
    await queryInterface.addIndex('aut_utilisateurs', ['identifiant'], { name: 'idx_utilisateurs_identifiant' });
    await queryInterface.addIndex('aut_utilisateurs', ['email'], { name: 'idx_utilisateurs_email' });
    await queryInterface.addIndex('aut_utilisateurs', ['profilId'], { name: 'idx_utilisateurs_profil' });
    await queryInterface.addIndex('aut_utilisateurs', ['centreConservationFonciereId'], { name: 'idx_utilisateurs_centre' });
    await queryInterface.addIndex('aut_utilisateurs', ['actif'], { name: 'idx_utilisateurs_actif' });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('aut_utilisateurs');
  }
};
