#!/bin/bash

echo "================================================"
echo "TRAAITT Wallet - Sync Diagnostic"
echo "================================================"
echo ""

LOG_FILE="$HOME/.xte-cli-wallet/logs/xte-wallet.log"

if [ ! -f "$LOG_FILE" ]; then
    echo "Error: Log file not found at $LOG_FILE"
    echo "Have you started the wallet yet?"
    exit 1
fi

echo "Analyzing sync status..."
echo ""

# Get last few height changes
echo "=== Recent Height Changes ==="
grep "Height changed" "$LOG_FILE" | tail -10

echo ""
echo "=== Stuck Warnings ==="
grep "WARNING: Stuck" "$LOG_FILE" | tail -5

echo ""
echo "=== Connection Status ==="
grep -E "(Daemon initialized|disconnected|reconnected|dead)" "$LOG_FILE" | tail -5

echo ""
echo "=== Recent Sync Progress ==="
grep "Syncing:" "$LOG_FILE" | tail -5

echo ""
echo "=== Last Log Entries ==="
tail -20 "$LOG_FILE"

echo ""
echo "================================================"
echo "Analysis:"
echo "================================================"

# Check if stuck
LAST_HEIGHT=$(grep "Height changed" "$LOG_FILE" | tail -1 | grep -o "wallet=[0-9]*" | cut -d'=' -f2)
STUCK_COUNT=$(grep "WARNING: Stuck" "$LOG_FILE" | wc -l | tr -d ' ')

if [ -z "$LAST_HEIGHT" ]; then
    echo "Status: Cannot determine - wallet may not have started syncing"
elif [ "$STUCK_COUNT" -gt "0" ]; then
    echo "Status: STUCK at block height $LAST_HEIGHT"
    echo ""
    echo "Recommendation:"
    echo "1. Try fresh wallet: ./create-fresh-wallet.sh"
    echo "2. Or wait 2-3 minutes - complex blocks can be slow"
else
    echo "Status: Syncing at block height $LAST_HEIGHT"
    echo "Appears to be progressing normally"
fi

echo ""
