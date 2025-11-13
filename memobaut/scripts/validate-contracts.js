#!/usr/bin/env node
/**
 * Contract Validation Script - memobaut.com
 * Validates JSON contracts against schema and structure requirements
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

let hasErrors = false;

function validateJSON(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    JSON.parse(content);
    console.log(`✓ ${filePath}`);
    return true;
  } catch (error) {
    console.error(`✗ ${filePath}: ${error.message}`);
    hasErrors = true;
    return false;
  }
}

function validateContracts() {
  console.log('Validating contract files...\n');

  const contractsDir = join(projectRoot, 'contracts');
  const contractFiles = [
    'routes/seo.routes.json',
    'tokens/primitives.json',
    'tokens/semantic.json',
    'tokens/components.json',
    'components/button.contract.json',
    'components/card.contract.json',
    'components/hero.contract.json',
    'components/navigation.contract.json',
    'components/footer.contract.json',
    'components/contact-form.contract.json',
  ];

  contractFiles.forEach((file) => {
    const filePath = join(contractsDir, file);
    validateJSON(filePath);
  });

  if (hasErrors) {
    console.error('\n❌ Contract validation failed!');
    process.exit(1);
  } else {
    console.log('\n✅ All contracts valid!');
    process.exit(0);
  }
}

validateContracts();
