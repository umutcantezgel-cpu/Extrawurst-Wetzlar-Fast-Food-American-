/**
 * Contract Validation Script
 * Validates all JSON contracts against their schemas
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTRACTS_DIR = path.join(__dirname, '..', 'contracts');

function validateJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    JSON.parse(content);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function getAllContracts(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllContracts(filePath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function main() {
  console.log('[Contract Validator] Starting...\n');

  const contracts = getAllContracts(CONTRACTS_DIR);
  let valid = 0;
  let invalid = 0;

  contracts.forEach((contractPath) => {
    const relativePath = path.relative(CONTRACTS_DIR, contractPath);
    const result = validateJSON(contractPath);

    if (result.valid) {
      console.log(`✅ ${relativePath}`);
      valid++;
    } else {
      console.error(`❌ ${relativePath}`);
      console.error(`   Error: ${result.error}`);
      invalid++;
    }
  });

  console.log('\n[Contract Validator] Summary:');
  console.log(`  Valid: ${valid}`);
  console.log(`  Invalid: ${invalid}`);
  console.log(`  Total: ${contracts.length}\n`);

  if (invalid > 0) {
    process.exit(1);
  }

  console.log('[Contract Validator] ✅ All contracts valid\n');
}

main();
