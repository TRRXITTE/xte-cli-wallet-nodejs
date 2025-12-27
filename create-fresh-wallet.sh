#!/bin/bash

# TRAAITT Wallet - Create Fresh Wallet (Skip History)
# This creates a wallet starting from current block height
# Use this if sync gets stuck on historical blocks

echo "================================================"
echo "TRAAITT Wallet - Fresh Wallet Creator"
echo "================================================"
echo ""
echo "This will help you create a wallet that starts"
echo "syncing from the CURRENT block height, skipping"
echo "all historical transactions."
echo ""
echo "Use this if:"
echo "  - Sync gets stuck at a specific block"
echo "  - You don't need transaction history"
echo "  - You want fastest sync possible"
echo ""
echo "Note: Any previous transactions will not be shown,"
echo "but your balance from current height will be correct."
echo ""
read -p "Get current block height? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Fetching current network height..."

# Get current height from daemon
HEIGHT=$(curl -sk https://main.trrxitte.com:443/info 2>/dev/null | grep -o '"height":[0-9]*' | cut -d':' -f2)

if [ -z "$HEIGHT" ]; then
    echo "Error: Could not fetch network height"
    echo "Using default: 0"
    HEIGHT=0
else
    echo "Current network height: $HEIGHT"
fi

echo ""
echo "================================================"
echo "Next steps:"
echo "================================================"
echo ""
echo "1. Run: npm start"
echo "2. Choose (i)mport"
echo "3. Choose (s)eed for mnemonic or (k)eys for private keys"
echo "4. Enter your credentials"
echo "5. IMPORTANT: When asked for Scan Height, enter: $HEIGHT"
echo ""
echo "This will create a wallet starting from block $HEIGHT"
echo "and skip all historical transaction processing."
echo ""
