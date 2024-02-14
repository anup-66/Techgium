import uuid
import subprocess

def get_mac_address():
    try:
        mac = ':'.join(['{:02x}'.format((uuid.getnode() >> elements) & 0xff) for elements in range(5, -1, -1)])
        return mac
    except Exception as e:
        print(f"Error: {e}")
        return None

# Example usage
mac_address = get_mac_address()
if mac_address:
    print(f"MAC Address: {mac_address}")
else:
    print("Failed to retrieve MAC address.")
