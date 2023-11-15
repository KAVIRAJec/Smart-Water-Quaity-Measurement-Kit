import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import time

# Create the I2C bus
i2c = busio.I2C(board.SCL, board.SDA)

# Create the ADC object using the I2C bus
ads = ADS.ADS1115(i2c)

# Create analog input objects for turbidity sensor
turbidity_sensor = AnalogIn(ads, ADS.P0)

# Constants for turbidity conversion
TURBIDITY_MIN_RAW = 0  # Minimum raw ADC value corresponding to 0 NTU
TURBIDITY_MAX_RAW = 65535  # Maximum raw ADC value corresponding to the maximum turbidity range of your sensor
MAX_TURBIDITY_VALUE = 1000  # Maximum turbidity value in NTU that your sensor can measure, adjust according to sensor specifications

# Function to convert raw ADC value to turbidity in NTU
def convert_turbidity(raw_value):
    turbidity = (raw_value - TURBIDITY_MIN_RAW) / (TURBIDITY_MAX_RAW - TURBIDITY_MIN_RAW) * MAX_TURBIDITY_VALUE
    return turbidity

try:
    while True:
        # Read turbidity sensor value
        turbidity_raw_value = turbidity_sensor.value

        # Convert raw ADC value to turbidity in NTU
        turbidity_ntu = convert_turbidity(turbidity_raw_value)

        # Print turbidity value
        print("Turbidity: {:.2f} NTU".format(turbidity_ntu))

        # Wait for some time before reading again
        time.sleep(1)

except KeyboardInterrupt:
    # Handle keyboard interrupt (Ctrl+C) gracefully
    print("Exiting...")
finally:
    # Clean up GPIO and I2C resources before exiting
    ads.gain = 1
    ads.data_rate = 8
