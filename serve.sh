#!/usr/bin/env bash
# Preview the site locally:  ./serve.sh  [port]
set -e
PORT="${1:-8080}"
cd "$(dirname "$0")"
echo "Serving $(pwd) at http://127.0.0.1:${PORT}/"
echo "Press Ctrl+C to stop."
exec python3 -m http.server "$PORT" --bind 127.0.0.1
