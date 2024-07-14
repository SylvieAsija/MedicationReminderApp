import os

def find_null_bytes(directory):
    print(directory)
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'rb') as f:
                    content = f.read()
                    if b'\x00' in content:
                        print(f"Null byte found in {file_path}")
            except Exception as e:
                print(f"Error reading {file_path}: {e}")

# Replace '/path/to/your/project' with the path to your project directory
find_null_bytes(r'C:\Users\Bino-\OneDrive - Queen\'s University\Queens U\MedicationReminderApp/backend')
