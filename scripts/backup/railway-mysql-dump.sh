#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

BACKUP_DIR="${1:-audit_runs/mysql_manual_backup_$(date +%Y%m%d_%H%M%S)}"
DUMP_FILE="$BACKUP_DIR/railway_mysql_backup.sql.gz"
SUMMARY_FILE="$BACKUP_DIR/SUMMARY.txt"

mkdir -p "$BACKUP_DIR"

{
  echo "=== Railway MySQL manual backup ==="
  date
  echo "BACKUP_DIR=$BACKUP_DIR"

  echo ""
  echo "=== Tool check ==="
  command -v railway
  command -v mysqldump
  command -v gzip

  echo ""
  echo "=== Railway context ==="
  railway status

  echo ""
  echo "=== MySQL variable presence ==="
  railway run --service MySQL -- bash -lc '
    set -euo pipefail
    echo "MYSQLUSER_SET=$([ -n "${MYSQLUSER:-}" ] && echo yes || echo no)"
    echo "MYSQLDATABASE_SET=$([ -n "${MYSQLDATABASE:-}" ] && echo yes || echo no)"
    echo "TCP_PROXY_DOMAIN_SET=$([ -n "${RAILWAY_TCP_PROXY_DOMAIN:-}" ] && echo yes || echo no)"
    echo "TCP_PROXY_PORT_SET=$([ -n "${RAILWAY_TCP_PROXY_PORT:-}" ] && echo yes || echo no)"
  '

  echo ""
  echo "=== Connection test ==="
  railway run --service MySQL -- bash -lc '
    mysql \
      -h "$RAILWAY_TCP_PROXY_DOMAIN" \
      -P "$RAILWAY_TCP_PROXY_PORT" \
      -u "$MYSQLUSER" \
      -p"$MYSQLPASSWORD" \
      "$MYSQLDATABASE" \
      -e "SELECT NOW() AS now_time, DATABASE() AS db_name;"
  '

  echo ""
  echo "=== Create compressed dump ==="
  railway run --service MySQL -- bash -lc '
    mysqldump \
      -h "$RAILWAY_TCP_PROXY_DOMAIN" \
      -P "$RAILWAY_TCP_PROXY_PORT" \
      -u "$MYSQLUSER" \
      -p"$MYSQLPASSWORD" \
      --single-transaction \
      --quick \
      --routines \
      --triggers \
      --events \
      "$MYSQLDATABASE"
  ' | gzip > "$DUMP_FILE"

  echo ""
  echo "=== Backup file ==="
  ls -lh "$DUMP_FILE"

  echo ""
  echo "=== Gzip integrity ==="
  gzip -t "$DUMP_FILE"
  echo "gzip OK"

  echo ""
  echo "=== Dump stats ==="
  echo "lines=$(zcat "$DUMP_FILE" | wc -l)"
  echo "insert_blocks=$(zcat "$DUMP_FILE" | grep -c '^INSERT INTO' || true)"
  echo "table_count=$(zcat "$DUMP_FILE" | grep -c '^CREATE TABLE' || true)"

  echo ""
  echo "=== Key live counts ==="
  railway run --service MySQL -- bash -lc '
    mysql \
      -h "$RAILWAY_TCP_PROXY_DOMAIN" \
      -P "$RAILWAY_TCP_PROXY_PORT" \
      -u "$MYSQLUSER" \
      -p"$MYSQLPASSWORD" \
      "$MYSQLDATABASE" \
      -N -e "
        SELECT '\''users'\'', COUNT(*) FROM users
        UNION ALL SELECT '\''trial_leads'\'', COUNT(*) FROM trial_leads
        UNION ALL SELECT '\''presentation_codes'\'', COUNT(*) FROM presentation_codes
        UNION ALL SELECT '\''learning_logs'\'', COUNT(*) FROM learning_logs
        UNION ALL SELECT '\''open_questions'\'', COUNT(*) FROM open_questions
        UNION ALL SELECT '\''glossar_terms'\'', COUNT(*) FROM glossar_terms
        UNION ALL SELECT '\''pending_purchases'\'', COUNT(*) FROM pending_purchases;
      "
  '

  echo ""
  echo "BACKUP_DONE"
  echo "$DUMP_FILE"
} 2>&1 | tee "$SUMMARY_FILE"
