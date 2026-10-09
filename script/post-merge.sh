#!/usr/bin/env bash
set -euo pipefail

# Reconcile the merged lockfile without prompting or changing it.
npm ci --no-audit --no-fund
npm run check
npm run build
