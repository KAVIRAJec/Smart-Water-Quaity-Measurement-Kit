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
orp_sensor = AnalogIn(ads, ADS.P0)
tds_sensor = AnalogIn(ads, ADS.P3)

ph_4_voltage = 2.056  # Voltage output of the sensor in pH 4 solution
ph_7_voltage = 1.563  # Voltage output of the sensor in pH 7 solution

TURBIDITY_MIN_RAW = 0  
TURBIDITY_MAX_RAW = 65535  
MAX_TURBIDITY_VALUE = 1000  

ORP_MIN_RAW = 0  
ORP_MAX_RAW = 65535  
MAX_ORP_VALUE = 600  

TDS_MIN_RAW = 0  
TDS_MAX_RAW = 65535  
MAX_TDS_VALUE = 5000 

ser = serial.Serial('/dev/ttyS0', baudrate=9600, timeout=1)  # Assuming your Nextion display is connected to the Raspberry Pi's GPIO serial port
eof = b"\xff\xff\xff"
try:
	
    while True:
        raw_value = ph_sensor.value
        voltage = (raw_value * 4.096) / 32767.0  
        slope = (ph_7_voltage - ph_4_voltage) / (7 - 4) 
        offset = ph_4_voltage - (slope * 4)
        ph_value = (voltage - offset) / slope
    
        turbidity_raw_value = turbidity_sensor.value
        turbidity_ntu = (turbidity_raw_value - TURBIDITY_MIN_RAW) / (TURBIDITY_MAX_RAW - TURBIDITY_MIN_RAW) * MAX_TURBIDITY_VALUE

        orp_raw_value = orp_sensor.value
        orp_mV = (orp_raw_value - ORP_MIN_RAW) / (ORP_MAX_RAW - ORP_MIN_RAW) * MAX_ORP_VALUE

        tds_raw_value = tds_sensor.value
        tds_ppm = (tds_raw_value - TDS_MIN_RAW) / (TDS_MAX_RAW - TDS_MIN_RAW) * MAX_TDS_VALUE

        print("pH Value: {:.2f}".format(ph_value), end=" ")
        print("Turbidity: {:.2f} NTU".format(turbidity_ntu), end=" ")
        print("ORP: {:.2f} mV".format(orp_mV), end=" ")
        print("TDS: {:.2f} ppm".format(tds_ppm))
        
        #url = "http://192.168.38.68:3001/api/?parameter=water&ph={:.2f}&turbidity={:.2f}&tds={:.2f}&orp={:.2f}".format(ph_value, turbidity_ntu, tds_ppm, orp_mV)
        #response = requests.get(url)
        #print("Response Status Code:", response.status_code)
        
        command_ph = ('page0.t5.txt="' + "{:.2f}".format(ph_value) + '"').encode() + eof
        command_turbidity = ('page0.t6.txt="' + "{:.2f}".format(turbidity_ntu) + '"').encode() + eof
        command_orp = ('page0.t7.txt="' + "{:.2f}".format(orp_mV) + '"').encode() + eof
        command_tds = ('page0.t8.txt="' + "{:.2f}".format(tds_ppm) + '"').encode() + eof
        
        ser.write(command_ph)
        ser.write(command_turbidity)
        ser.write(command_orp)
        ser.write(command_tds)

        #ser.close()
        print("Command sent successfully.")
        time.sleep(1)		

except Exception as e:
    print("Error: ", str(e))

except KeyboardInterrupt:
    print("Exiting...")
finally:
    ads.gain = 1
    ads.data_rate = 8
