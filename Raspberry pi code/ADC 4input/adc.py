import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import time

# Create the I2C bus
i2c = busio.I2C(board.SCL, board.SDA)

# Create the ADC object using the I2C bus
ads = ADS.ADS1115(i2c)

# Create analog input objects for pH, turbidity, TDS, and ORP sensors
#ph_sensor = AnalogIn(ads, ADS.P0)
turbidity_sensor = AnalogIn(ads, ADS.P1)
#tds_sensor = AnalogIn(ads, ADS.P2)
#orp_sensor = AnalogIn(ads, ADS.P3)

try:
    while True:
        # Read sensor values
        #ph_value = ph_sensor.value
        #turbidity_value = turbidity_sensor.value
        tds_value = tds_sensor.value
        #orp_value = orp_sensor.value

        # Convert sensor values to appropriate units if necessary
        # pH, turbidity, TDS, and ORP conversion logic goes here

        # Print sensor values
        print("pH: " + str(ph_value) + ", Turbidity: " + str(turbidity_value) + ", TDS: " + str(tds_value) + ", ORP: " + str(orp_value))

        # Wait for some time before reading again
        time.sleep(1)

except KeyboardInterrupt:
    # Handle keyboard interrupt (Ctrl+C) gracefully
    print("Exiting...")
finally:
    # Clean up GPIO and I2C resources before exiting
    ads.gain = 1
    ads.data_rate = 8
