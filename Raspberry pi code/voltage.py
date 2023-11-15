import Adafruit_ADS1x15

# Create an ADS1115 ADC instance
adc = Adafruit_ADS1x15.ADS1115()

# ADC channel (0 to 3)
adc_channel = 0

# Gain (1 for reading voltages in the range -4.096V to 4.096V)
gain = 1

# Read the raw ADC value from the specified channel
raw_value = adc.read_adc(adc_channel, gain=gain)

# Convert raw ADC value to voltage (assuming 16-bit resolution)
voltage = (raw_value * 4.096) / 32767.0  # 4.096V is the full-scale range of the ADC

# Print the raw ADC value and voltage
print("Raw ADC Value: {}".format(raw_value))
print("Voltage: {:.4f} V".format(voltage))
