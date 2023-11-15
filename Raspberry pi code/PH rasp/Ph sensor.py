import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import time

# Create an I2C object
i2c = busio.I2C(board.SCL, board.SDA)

# Create an ADS1115 object
ads = ADS.ADS1115(i2c)

pH_sensor = AnalogIn(ads, ADS.P0)
# Configure the ADS1115 for single-ended input
ads.gain = 1

# Set the slope and intercept values
ads.slope = -0.0007380073800738007
ads.intercept = 12475.00516605166

# Start a loop to read the pH sensor
while True:

    # Read the voltage from the pH sensor
    voltage = pH_sensor.value

    # Calculate the pH
    pH = voltage * ads.slope + ads.intercept

    # Print the pH to the console
    print(pH)

    # Wait for 1 second
    time.sleep(1)
