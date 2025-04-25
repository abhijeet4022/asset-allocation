#!/bin/bash

# Set colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${2:-$GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

# Error handling function
handle_error() {
    log "ERROR: $1" "$RED"
    exit 1
}

# Check if script is run as root
if [[ $EUID -ne 0 ]]; then
    handle_error "This script must be run as root"
fi

# Create log directory
if [ -d "/var/log/calculator-deploy" ]; then
    rm -rf /var/log/calculator-deploy
fi
mkdir -p /var/log/calculator-deploy
LOG_FILE="/var/log/calculator-deploy/deploy-$(date +'%Y%m%d-%H%M%S').log"

# Function to check command status
check_status() {
    if [ $? -ne 0 ]; then
        handle_error "$1"
    else
        log "$2"
    fi
}

# Start deployment
log "Starting deployment process..." "$YELLOW"

# Clone repository
log "Cloning repository..." "$YELLOW"
if [ -d "/App/asset-allocation" ]; then
    rm -rf /App/asset-allocation
fi
git clone https://github.com/abhijeet4022/asset-allocation.git /App/asset-allocation >> "$LOG_FILE" 2>&1
check_status "Failed to clone repository" "Repository cloned successfully"

# Navigate to project directory
cd /App/asset-allocation || handle_error "Failed to change directory"

# Setup Node.js
log "Setting up Node.js..." "$YELLOW"
dnf module disable nodejs -y >> "$LOG_FILE" 2>&1
dnf module enable nodejs:18 -y >> "$LOG_FILE" 2>&1
dnf install nodejs npm -y >> "$LOG_FILE" 2>&1
check_status "Failed to install Node.js" "Node.js installed successfully"

# Install dependencies and build
log "Installing dependencies..." "$YELLOW"
npm install >> "$LOG_FILE" 2>&1
check_status "Failed to install dependencies" "Dependencies installed successfully"

log "Building application..." "$YELLOW"
CI=true npx update-browserslist-db@latest -y >> "$LOG_FILE" 2>&1
npm run build >> "$LOG_FILE" 2>&1
check_status "Failed to build application" "Application built successfully"

# Setup Nginx
log "Setting up Nginx..." "$YELLOW"
dnf module disable nginx -y >> "$LOG_FILE" 2>&1
dnf module enable nginx:1.24 -y >> "$LOG_FILE" 2>&1
dnf install nginx -y >> "$LOG_FILE" 2>&1
check_status "Failed to install Nginx" "Nginx installed successfully"

# Create and setup web directory
log "Setting up web directory..." "$YELLOW"
if [ -d "/var/www/sip-calculator" ]; then
    rm -rf /var/www/sip-calculator
fi
mkdir -p /var/www/sip-calculator
cp -r /App/asset-allocation/dist/* /var/www/sip-calculator/ >> "$LOG_FILE" 2>&1
check_status "Failed to copy files" "Files copied successfully"

# Configure Nginx
log "Configuring Nginx..." "$YELLOW"
#if [ -f "/etc/nginx/conf.d/calculator.conf" ]; then
#    rm -rf /etc/nginx/conf.d/calculator.conf
#fi
cat > /etc/nginx/conf.d/calculator.conf << 'EOF'
server {
    listen 81;
    server_name localhost;

    root /var/www/sip-calculator;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF
check_status "Failed to create Nginx configuration" "Nginx configured successfully"

# Set permissions
log "Setting permissions..." "$YELLOW"
chown -R nginx:nginx /var/www/sip-calculator
chmod -R 755 /var/www/sip-calculator
check_status "Failed to set permissions" "Permissions set successfully"

# Test and start Nginx
log "Testing Nginx configuration..." "$YELLOW"
nginx -t >> "$LOG_FILE" 2>&1
check_status "Nginx configuration test failed" "Nginx configuration test passed"

log "Starting Nginx..." "$YELLOW"
systemctl restart nginx >> "$LOG_FILE" 2>&1
systemctl enable nginx >> "$LOG_FILE" 2>&1
check_status "Failed to start Nginx" "Nginx started successfully"

# Configure firewall
log "Configuring firewall..." "$YELLOW"
if systemctl is-active --quiet firewalld >/dev/null 2>&1; then
    firewall-cmd --permanent --add-service=http >> "$LOG_FILE" 2>&1
    firewall-cmd --reload >> "$LOG_FILE" 2>&1
    check_status "Failed to configure firewall" "Firewall configured successfully"
else
    log "firewalld is not active, skipping firewall configuration" "$YELLOW"
fi

# Get server IP
SERVER_IP=$(hostname -I | awk '{print $1}')

# Final success message
log "Deployment completed successfully!" "$GREEN"
log "Application is now accessible at: http://$SERVER_IP:81" "$GREEN"
log "Deployment log available at: $LOG_FILE" "$GREEN"