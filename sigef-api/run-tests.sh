#!/bin/bash

# Script de test complet pour Phase 1

echo "========================================="
echo "Phase 1 - SIGEF Tests Complets"
echo "========================================="
echo ""

# Variables
TEST_DIR="lib/modules/gestion-dossiers/tests"
LOG_FILE="test-results.log"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
run_tests() {
  local test_file=$1
  local test_name=$2
  
  echo -e "${YELLOW}Tests unitaires: ${test_name}${NC}"
  npx jest $TEST_DIR/$test_file --verbose --coverage 2>&1 | tee -a $LOG_FILE
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ ${test_name} réussis${NC}"
  else
    echo -e "${RED}✗ ${test_name} échoués${NC}"
  fi
  echo ""
}

# Nettoyer les anciens logs
rm -f $LOG_FILE

# Tests unitaires par module
echo -e "${YELLOW}=== TESTS UNITAIRES ===${NC}"
echo ""

run_tests "LotService.test.ts" "LotService"
run_tests "DocumentService.test.ts" "DocumentService"
run_tests "UploadService.test.ts" "UploadService"
run_tests "AuditService.test.ts" "AuditService"

# Tests des contrôleurs
echo -e "${YELLOW}=== TESTS DES CONTRÔLEURS ===${NC}"
echo ""
run_tests "Controllers.test.ts" "LotDocumentController"

# Tests d'intégration
echo -e "${YELLOW}=== TESTS D'INTÉGRATION ===${NC}"
echo ""
run_tests "Integration.test.ts" "Complete Workflow"

# Résumé
echo -e "${YELLOW}=========================================${NC}"
echo "Résumé des tests sauvegardé dans: $LOG_FILE"
echo -e "${YELLOW}=========================================${NC}"

# Couverture de code
echo ""
echo -e "${YELLOW}Génération du rapport de couverture...${NC}"
npx jest --coverage --coverageReporters=text --coverageReporters=html

echo -e "${GREEN}Tests terminés!${NC}"
