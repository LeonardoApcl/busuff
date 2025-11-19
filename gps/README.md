# gps

## References
- https://randomnerdtutorials.com/esp8266-nodemcu-neo-6m-gps-module-arduino/
- https://arduinojson.org/
- https://www.emqx.com/en/blog/esp8266-connects-to-the-public-mqtt-broker
- https://tttapa.github.io/ESP8266/Chap07%20-%20Wi-Fi%20Connections.html
- http://www.pequenosprojetos.com.br/rastreador-gps-sim800l-e-esp8266-node-mcu/
- https://stuartsprojects.github.io/2024/09/21/How-not-to-read-a-GPS.html

- [List of MQTT public brokers](https://github.com/mqtt/mqtt.org/wiki/public_brokers)

## Todo

- [ ] Test SIM800L
- [ ] Micro SIM card free trial
- [ ] Introduce auth and encryption to MQTT comm
- [ ] Resolve RX pin issue (change gps baud rate to 9600)
- [ ] Decide internet data x historical data (send outdated data? If yes, Use queue to buffer unsent messages.)
- [ ] Remove ArduinoJson
- [ ] Update this README
- [ ] Make readGPS non-blocking
- [ ] Remove hardcoded sizes
- [ ] Use safer str functions alternatives (like strncpy, strncmp)