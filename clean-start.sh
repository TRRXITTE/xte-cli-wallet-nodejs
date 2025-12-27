#!/bin/bash

# TRAAITT Wallet - Clean Start Script
# This removes incompatible TurtleCoin wallet files

echo "================================================"
echo "TRAAITT Wallet - Clean Start"
echo "================================================"
echo ""
echo "This will backup and remove incompatible wallet files."
echo "You will need to create a new TRAAITT wallet or import existing TRAAITT keys."
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

WALLET_DIR="$HOME/.xte-cli-wallet/wallets"
BACKUP_DIR="$HOME/.xte-cli-wallet/backup-$(date +%Y%m%d-%H%M%S)"

if [ -d "$WALLET_DIR" ]; then
    if [ "$(ls -A $WALLET_DIR)" ]; then
        echo "Backing up old wallet files to: $BACKUP_DIR"
        mkdir -p "$BACKUP_DIR"
        cp -r "$WALLET_DIR"/* "$BACKUP_DIR/"
        echo "✓ Backup created"

        echo "Removing incompatible wallet files..."
        rm -f "$WALLET_DIR"/*.wallet
        echo "✓ Old wallet files removed"
    else
        echo "No wallet files found to remove."
    fi
else
    echo "Wallet directory doesn't exist yet. Nothing to clean."
fi

echo ""
echo "================================================"
echo "✓ Clean start ready!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Run: npm start"
echo "  2. Choose (c)reate for a new wallet"
echo "  3. OR choose (i)mport if you have TRAAITT keys"
echo ""
echo "Your old files are backed up at:"
echo "  $BACKUP_DIR"
echo ""
