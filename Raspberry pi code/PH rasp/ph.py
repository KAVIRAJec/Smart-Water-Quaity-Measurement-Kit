import Adafruit_ADS1x15
import time
import serial

# Create an ADS1115 ADC instance
adc = Adafruit_ADS1x15.ADS1115()

# Constants for calibration (values need to be adjusted based on your sensor and calibration)
ph_4_voltage = 2.056  # Voltage output of the sensor in pH 4 solution
ph_7_voltage = 1.563  # Voltage output of the sensor in pH 7 solution

# Configure the serial port for communication with the Nextion display
ser = serial.Serial('/dev/ttyS0', 9600, timeout=1)  # Adjust the serial port and baud rate as needed

# Define a function to send data to the Nextion display
def send_to_nextion(data):
    ser.write(data.encode('utf-8'))

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

    # Send the pH value to the Nextion display
    send_to_nextion('n0.val=' + str(int(ph_value)))  # Adjust component name and ID as needed

    # Wait for a moment before taking the next measurement (adjust the delay as needed)
    time.sleep(1)

# Close the serial port when done
ser.close()
