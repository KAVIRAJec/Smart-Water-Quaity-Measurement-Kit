import Adafruit_ADS1x15
import time

# Create an ADS1115 ADC instance
adc = Adafruit_ADS1x15.ADS1115()

# Constants for calibration (values need to be adjusted based on your sensor and calibration)
ph_4_voltage = 2.056  # Voltage output of the sensor in pH 4 solution
ph_7_voltage = 1.563  # Voltage output of the sensor in pH 7 solution

# Loop indefinitely
while True:
    # Read the raw ADC value from the sensor
    raw_value = adc.read_adc(0, gain=1)  # Assuming the sensor is connected to channel 0

    # Convert raw ADC value to voltage
    voltage = (raw_value * 4.096) / 32767.0  # 4.096V is the full-scale range of the ADC

    # Calculate the slope and offset
    slope = (ph_7_voltage - ph_4_voltage) / (7 - 4)  # (V7 - V4) / (pH7 - pH4)
    offset = ph_4_voltage - (slope * 4)  # V4 - (slope * pH4)

    # Convert voltage to pH using the calibration parameters
    ph_value = (voltage - offset) / slope

    # Print the pH value
    print("pHValue: {:.2f}".format(ph_value))

    # Wait for a moment before taking the next measurement (adjust the delay as needed)
    time.sleep(1)
