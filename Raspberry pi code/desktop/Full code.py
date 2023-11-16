
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import time
import requests
import serial

i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1115(i2c)
ph_sensor = AnalogIn(ads, ADS.P0)
turbidity_sensor = AnalogIn(ads, ADS.P1)
tds_sensor = AnalogIn(ads, ADS.P2)
orp_sensor = AnalogIn(ads, ADS.P0)

ph_4_voltage = 2.056  # Voltage output of the sensor in pH 4 solution
ph_7_voltage = 1.663 

ORP_MIN_RAW = 0  # Minimum raw ADC value corresponding to the minimum ORP value
ORP_MAX_RAW = 65535  # Maximum raw ADC value corresponding to the maximum ORP value (check datasheet)
MAX_ORP_VALUE = 1300  # Maximum ORP value in mV that your sensor can measure, adjust according to sensor specifications

TDS_MIN_RAW = 0  # Minimum raw ADC value corresponding to 0 ppm
TDS_MAX_RAW = 65535  # Maximum raw ADC value corresponding to the maximum TDS range of your sensor (check datasheet)
MAX_TDS_VALUE = 3000  # Maximum TDS value in ppm that your sensor can measure, adjust according to sensor specifications

TURBIDITY_MIN_RAW = 0  # Minimum raw ADC value corresponding to 0 NTU
TURBIDITY_MAX_RAW = 65535  # Maximum raw ADC value corresponding to the maximum turbidity range of your sensor
MAX_TURBIDITY_VALUE = 5  # Maximum turbidity value in NTU that your sensor can measure, adjust according to sensor specifications

def convert_orp(raw_value):
    orp_mV = (raw_value - ORP_MIN_RAW) / (ORP_MAX_RAW - ORP_MIN_RAW) * MAX_ORP_VALUE
    return orp_mV
def convert_tds(raw_value):
    tds = ((raw_value - TDS_MIN_RAW) / (TDS_MAX_RAW - TDS_MIN_RAW)) * MAX_TDS_VALUE
    return tds
def convert_turbidity(raw_value):
    turbidity = (raw_value - TURBIDITY_MIN_RAW) / (TURBIDITY_MAX_RAW - TURBIDITY_MIN_RAW) * MAX_TURBIDITY_VALUE
    return turbidity
ser = serial.Serial('/dev/ttyS0', baudrate=9600, timeout=1)  # Assuming your Nextion display is connected to the Raspberry Pi's GPIO serial port
eof = b"\xff\xff\xff"

api_url="http://10.10.220.68:3001/api"
parameters={
	'parameter': 'water',
	'ph': ph_value,
	'turbidity': turbidity_ntu,
	'tds': tds_ppm,
	'orp': orp_mV
}
try:
    while True:
        raw_value = ph_sensor.value # Assuming the sensor is connected to channel 0
        voltage = (raw_value * 4.096) / 32767.0  # 4.096V is the full-scale range of the ADC
        slope = (ph_7_voltage - ph_4_voltage) / (7 - 4)  # (V7 - V4) / (pH7 - pH4)
        offset = ph_4_voltage - (slope * 4)  # V4 - (slope * pH4)
        ph_value = (voltage - offset) / slope
        orp_raw_value = orp_sensor.value
        orp_mV = convert_orp(orp_raw_value)
        tds_raw_value = tds_sensor.value
        tds_ppm = convert_tds(tds_raw_value)
        turbidity_raw_value = turbidity_sensor.value
        turbidity_ntu = convert_turbidity(turbidity_raw_value)

        print("pH Value: {:.2f}".format(ph_value))
        print("Turbidity: {:.2f} NTU".format(turbidity_ntu))
        print("TDS: {:.2f} ppm".format(tds_ppm))
        print("ORP: {:.2f} mV".format(orp_mV))
        command_ph = ('page0.t5.txt="' + "{:.2f}".format(ph_value) + '"').encode() + eof
        command_turbidity = ('page0.t6.txt="' + "{:.2f}".format(turbidity_ntu) + '"').encode() + eof
        command_orp = ('page0.t7.txt="' + "{:.2f}".format(orp_mV) + '"').encode() + eof
        command_tds = ('page0.t8.txt="' + "{:.2f}".format(tds_ppm) + '"').encode() + eof
        if orp_mV > 250 and turbidity_ntu<=1:
            command = b'page0.t4.txt=Drinkable\xff\xff\xff'
        else:
            command = b'page0.t4.txt=Non-Drinkable\xff\xff\xff'
        ser.write(command_ph)
        ser.write(command_turbidity)
        ser.write(command_orp)
        ser.write(command_tds)
        ser.write(command)
	
        #ser.close()
        time.sleep(1)
        
        response = requests.get(api_url, params=parameters)
        if response.status_code == 200:
			print("Data uploaded successfully!")
		else:
			print(f"Error: {response.status_code}")
        
except Exception as e:
    print("Error: ", str(e))

except KeyboardInterrupt:
    print("Exiting...")
finally:
    ads.gain = 1
    ads.data_rate = 8
