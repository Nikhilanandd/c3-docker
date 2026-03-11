#!/bin/bash
# Find all PNG files in public/assets and create WebP versions if they don't exist
find public/assets -type f -name "*.png" | while read -r img; do
  webp_file="${img%.png}.webp"
  if [ ! -f "$webp_file" ]; then
    echo "Converting $img to WebP..."
    npx --yes cwebp-bin -q 80 "$img" -o "$webp_file"
  else
    echo "WebP version already exists for $img"
  fi
done
