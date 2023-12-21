#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <AsyncElegantOTA.h>
#include <ArduinoJson.h>       
#include <WebSocketsClient.h> 
#include <SocketIOclient.h>

const char* SSID = "Your Wifi SSID";
const char* PASSWORD = "Password";
#define SERVER "*******************.herokuapp.com"

const int relay1 = 5;
const int relay2 = 4;
const int relay3 = 0;
const int relay4 = 2;



AsyncWebServer server(80);
SocketIOclient socketIO;

void messageHandler(uint8_t* payload) {
  StaticJsonDocument<64> doc;

  DeserializationError error = deserializeJson(doc, payload);

  if (error) {
    Serial.println(error.f_str());
    return;
  }

  String messageKey = doc[0];
  bool value = doc[1];

  if (messageKey == "buttonState1") {
    digitalWrite(relay1, !value);
  }
  else if(messageKey == "buttonState2") {
    digitalWrite(relay2, !value);
  }
  else if(messageKey == "buttonState3") {
    digitalWrite(relay3, !value);
  }
  else if(messageKey == "buttonState5") {
    digitalWrite(relay4, !value);
  }
}

void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      Serial.println("Disconnected!");
      break;

    case sIOtype_CONNECT:
      Serial.printf("Connected to url: %s%s\n", SERVER, payload);

      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");
      break;

    case sIOtype_EVENT:
      messageHandler(payload);
      break;
  }
}

void setupWiFi() {
  Serial.println("\nConnecting...");

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConnected : ");
  Serial.println(WiFi.localIP());
}


void setup() {
  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  pinMode(relay3, OUTPUT);
  pinMode(relay4, OUTPUT);

  Serial.begin(9600);

  setupWiFi();

  // server address, port and URL
  socketIO.begin(SERVER, 80, "/socket.io/?EIO=4");

  socketIO.onEvent(socketIOEvent);
  
  AsyncElegantOTA.begin(&server);
  // Start server
  server.begin();
}

void loop() {
  socketIO.loop();
}