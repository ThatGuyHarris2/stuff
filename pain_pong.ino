#include <Servo.h>

Servo servoL;
Servo servoR;

void setup() {
  Serial.begin(9600);

  servoL.attach(7);
  servoL.write(0);
  delay(100);

  servoR.attach(6);
  servoR.write(0);
  delay(100);
}

void loop() {
  if (Serial.available() > 0) {
    char data = Serial.read();

    if (data == 'R') {
      servoL.write(90);
      delay(500);
      servoL.write(0);
      delay(100);
    } else if(data == 'L') {
      servoR.write(90);
      delay(500);
      servoR.write(0);
      delay(100);
    }
  }
}
