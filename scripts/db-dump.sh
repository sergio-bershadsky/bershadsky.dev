#!/bin/bash

# Database Dump Script
# Usage: ./scripts/db-dump.sh [output_dir]
# 
# This script creates a PostgreSQL dump of the database.
# It uses the DATABASE_URL environment variable if available,
# or falls back to individual PG* environment variables.

set -e

OUTPUT_DIR="${1:-./dumps}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DUMP_FILE="${OUTPUT_DIR}/db_dump_${TIMESTAMP}.sql"

mkdir -p "$OUTPUT_DIR"

echo "=== Database Dump Script ==="
echo "Output directory: $OUTPUT_DIR"
echo "Dump file: $DUMP_FILE"

if [ -n "$DATABASE_URL" ]; then
    echo "Using DATABASE_URL for connection..."
    pg_dump "$DATABASE_URL" \
        --no-owner \
        --no-privileges \
        --clean \
        --if-exists \
        --format=plain \
        > "$DUMP_FILE"
elif [ -n "$PGHOST" ]; then
    echo "Using PG* environment variables for connection..."
    pg_dump \
        -h "$PGHOST" \
        -p "${PGPORT:-5432}" \
        -U "$PGUSER" \
        -d "$PGDATABASE" \
        --no-owner \
        --no-privileges \
        --clean \
        --if-exists \
        --format=plain \
        > "$DUMP_FILE"
else
    echo "Error: No database connection info found."
    echo "Set DATABASE_URL or PGHOST/PGUSER/PGPASSWORD/PGDATABASE environment variables."
    exit 1
fi

echo "Dump completed successfully!"
echo "File size: $(du -h "$DUMP_FILE" | cut -f1)"
echo ""
echo "To restore this dump:"
echo "  psql \$DATABASE_URL < $DUMP_FILE"
echo ""
echo "Or with docker-compose:"
echo "  docker-compose exec db psql -U postgres -d cyberpunk_blog < $DUMP_FILE"
