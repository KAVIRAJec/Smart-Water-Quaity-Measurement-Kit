import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import time

# Create the I2C bus
i2c = busio.I2C(board.SCL, board.SDA)

# Create the ADC object using the I2C bus
ads = ADS.ADS1115(i2c)

# Create analog input object for ORP sensor
orp_sensor = AnalogIn(ads, ADS.P3)

# Constants for ORP conversion
ORP_MIN_RAW = 0  # Minimum raw ADC value corresponding to the minimum ORP value
ORP_MAX_RAW = 65535  # Maximum raw ADC value corresponding to the maximum ORP value (check datasheet)
MAX_ORP_VALUE = 1000  # Maximum ORP value in mV that your sensor can measure, adjust according to sensor specifications

# Function to convert raw ADC value to ORP in mV
def convert_orp(raw_value):
    orp_mV = (raw_value - ORP_MIN_RAW) / (ORP_MAX_RAW - ORP_MIN_RAW) * MAX_ORP_VALUE
    return orp_mV

try:
    while True:
        # Read ORP sensor value
        orp_raw_value = orp_sensor.value

        # Convert raw ADC value to ORP in mV
        orp_mV = convert_orp(orp_raw_value)

        # Print ORP value
        print("ORP: {:.2f} mV".format(orp_mV))

        # Wait for some time before reading again
        time.sleep(1)

except KeyboardInterrupt:
    # Handle keyboard interrupt (Ctrl+C) gracefully
    print("Exiting...")
finally:
    # Clean up GPIO and I2C resources before exiting
    ads.gain = 1
    ads.data_rate = 8
