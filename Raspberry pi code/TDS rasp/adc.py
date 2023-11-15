import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import time

# Create the I2C bus
i2c = busio.I2C(board.SCL, board.SDA)

# Create the ADC object using the I2C bus
ads = ADS.ADS1115(i2c)

# Create analog input objects for TDS sensor
tds_sensor = AnalogIn(ads, ADS.P0)

# Constants for TDS conversion
TDS_MIN_RAW = 0  # Minimum raw ADC value corresponding to 0 ppm
TDS_MAX_RAW = 65535  # Maximum raw ADC value corresponding to the maximum TDS range of your sensor (check datasheet)
MAX_TDS_VALUE = 5000  # Maximum TDS value in ppm that your sensor can measure, adjust according to sensor specifications

# Function to convert raw ADC value to TDS in ppm
def convert_tds(raw_value):
    tds = ((raw_value - TDS_MIN_RAW) / (TDS_MAX_RAW - TDS_MIN_RAW)) * MAX_TDS_VALUE
    return tds

try:
    while True:
        # Read TDS sensor value
        tds_raw_value = tds_sensor.value

        # Convert raw ADC value to TDS in ppm
        tds_ppm = convert_tds(tds_raw_value)

        # Print TDS value
        print("TDS: {:.2f} ppm".format(tds_ppm))

        # Wait for some time before reading again
        time.sleep(1)

except KeyboardInterrupt:
    # Handle keyboard interrupt (Ctrl+C) gracefully
    print("Exiting...")
finally:
    # Clean up GPIO and I2C resources before exiting
    ads.gain = 1
    ads.data_rate = 8
