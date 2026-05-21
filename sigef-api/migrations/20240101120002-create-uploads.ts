import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Créer la table des uploads
    await queryInterface.createTable('uploads', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nomFichier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taille: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      typeMime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'application/pdf',
      },
      statut: {
        type: DataTypes.ENUM('validé', 'rejeté', 'en-attente', 'traité'),
        allowNull: false,
        defaultValue: 'en-attente',
      },
      dateUpload: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      erreursValidation: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
      lotId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      cheminFichier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploadedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
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
    await queryInterface.addIndex('uploads', ['statut']);
    await queryInterface.addIndex('uploads', ['lotId']);
    await queryInterface.addIndex('uploads', ['uploadedBy']);
    await queryInterface.addIndex('uploads', ['dateUpload']);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('uploads');
  },
};
