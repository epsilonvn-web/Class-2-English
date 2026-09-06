# -*- coding: utf-8 -*-
"""
TOOL: AUTOMATIC VISUAL ASSET GENERATOR (PLACEHOLDER EDITION)
This script scans English Class 2 JSON databases (V10), extracts all 309 unique 
image paths, and generates beautifully styled pastel placeholder images using 
centered Emojis and text titles. This prevents broken images during app development.

Requirements: pip install Pillow
"""

import os
import json
from PIL import Image, ImageDraw, FontFile, ImageFont

# Path definitions - Adjust according to your local folder structure
JSON_FILES = [
    "kho_hoc_english_part1_v10.json",
    "kho_hoc_english_part2_v10.json",
    "de_thi_english_2_v10.json"
]
OUTPUT_DIR = "assets/images"

# 12 Pastel color palettes for visual appeal
PASTEL_PALETTES = [
    ("#FFE4E6", "#9E1F35"),  # Pink / Rose
    ("#ECFDF5", "#065F46"),  # Mint / Green
    ("#EFF6FF", "#1E40AF"),  # Soft Blue
    ("#FEF3C7", "#92400E"),  # Honey / Amber
    ("#FAF5FF", "#5B21B6"),  # Lilac / Lavender
    ("#FFF7ED", "#9A3412"),  # Peach / Orange
    ("#F0FDFA", "#115E59"),  # Teal
    ("#FFF1F2", "#9F1239"),  # Salmon / Rose
    ("#EDF2F7", "#1E293B"),  # Cool Slate
    ("#F5F3FF", "#6D28D9"),  # Violet
    ("#FFFBEB", "#B45309"),  # Cream Yellow
    ("#ECFDF5", "#047857")   # Emerald
]

def collect_image_assets():
    """Scans JSON files and collects all image_url along with word and emoji"""
    assets = {}
    
    def scan_obj(obj, current_word=None, current_emoji=None, current_tid=1):
        if isinstance(obj, dict):
            # Extract potential identifiers
            word = obj.get("word") or current_word
            emoji = obj.get("emoji") or current_emoji
            tid = obj.get("topic_id") or current_tid
            img_url = obj.get("image_url")
            
            if img_url and img_url.startswith("assets/images/"):
                filename = os.path.basename(img_url)
                if filename not in assets:
                    assets[filename] = {
                        "word": word or filename.replace(".png", "").capitalize(),
                        "emoji": emoji or "🐰",
                        "topic_id": int(tid) if str(tid).isdigit() else 1
                    }
            
            for k, v in obj.items():
                scan_obj(v, word, emoji, tid)
        elif isinstance(obj, list):
            for item in obj:
                scan_obj(item, current_word, current_emoji, current_tid)

    for filename in JSON_FILES:
        if os.path.exists(filename):
            try:
                with open(filename, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    scan_obj(data)
            except Exception as e:
                print(f"Error reading {filename}: {e}")
        else:
            print(f"Warning: Local JSON file {filename} not found. Please put the script in the same folder.")
            
    return assets

def create_placeholder_image(filename, word, emoji, topic_id):
    """Generates a high-quality 512x512 PNG placeholder asset with centered Emoji and Text"""
    size = (512, 512)
    bg_color, text_color = PASTEL_PALETTES[(topic_id - 1) % len(PASTEL_PALETTES)]
    
    # Create canvas
    img = Image.new("RGBA", size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Rounded border outline for playful card look
    draw.rounded_rectangle(
        [24, 24, 488, 488], 
        radius=40, 
        outline=text_color, 
        width=12
    )
    
    # Draw Word label on the top
    try:
        # Fallback to default if custom fonts aren't available locally
        font_title = ImageFont.load_default(size=40)
        font_subtitle = ImageFont.load_default(size=24)
    except:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        
    # Draw standard text placeholder since local rendering of diverse Emojis on Pillow 
    # varies depending on local OS font support.
    # Write the English word centered on Card
    draw.text((256, 380), word.upper(), fill=text_color, anchor="ms", font=font_title)
    draw.text((256, 420), f"Topic {topic_id}", fill=text_color + "99", anchor="ms", font=font_subtitle)
    
    # Draw Emoji symbol or icon representation in center
    draw.text((256, 220), emoji, fill=text_color, anchor="mm", font=font_title)
    
    # Ensure directory exists and save
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    target_path = os.path.join(OUTPUT_DIR, filename)
    img.save(target_path, "PNG")
    print(f"Generated asset: {target_path} [{emoji} - {word}]")

if __name__ == "__main__":
    print("=== STARTING LOCAL IMAGE ASSET GENERATOR ===")
    assets = collect_image_assets()
    total = len(assets)
    print(f"Detected {total} unique images required in JSON.")
    
    if total == 0:
        print("No image URLs collected. Ensure the JSON files are in the same folder as this script.")
    else:
        print(f"Generating placeholders in '{OUTPUT_DIR}' folder...")
        count = 0
        for filename, info in assets.items():
            create_placeholder_image(filename, info["word"], info["emoji"], info["topic_id"])
            count += 1
        print(f"\nSUCCESS! Generated {count}/{total} visual assets in '{OUTPUT_DIR}/'.")
        print("You can now replace individual files with your designer's art anytime!")
