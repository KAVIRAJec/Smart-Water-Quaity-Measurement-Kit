import RPi.GPIO as GPIO

# Configure GPIO pin
GPIO.setmode(GPIO.BCM)
turbidity_pin = 7 # Replace with the actual GPIO pin you're using
GPIO.setup(turbidity_pin, GPIO.IN)

try:
    while True:
        turbidity_value = GPIO.input(turbidity_pin)
        print(f"Turbidity: {turbidity_value}")
except KeyboardInterrupt:
    GPIO.cleanup()
