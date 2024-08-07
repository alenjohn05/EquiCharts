#!/bin/bash

# Directory containing the files
directory="."

# Start date
start_date="2024-01-01"
current_date="$start_date"

# Function to increment the date
increment_date() {
  date -I -d "$current_date + 1 day"
}

# Loop through files in the directory
for file in "$directory"/*; do
  # Check if it's a file (not a directory)
  if [[ -f "$file" ]]; then
    file_name=$(basename "$file")
    
    # Stage the file
    git add "$file"
    
    # Commit the file with a specific date
    git commit -m "Added file $file_name" --date="$current_dateT00:00:00"
    echo "Committed $file_name on $current_date"
    
    # Clear the staging area for the next file
    git reset
    
    # Increment the date
    current_date=$(increment_date)
    
    # Break if we reach the end of March 2024
    if [[ "$current_date" > "2024-03-31" ]]; then
      break
    fi
  fi
done
