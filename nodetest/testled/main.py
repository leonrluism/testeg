#!/usr/bin/python
#autor: Jefferson Rivera
import sys
import signal
from gpiozero import LED
from gpiozero import LED2
from clases.Conexion import Conexion
from clases.Conexion2 import Conexion2

ledcuarto = LED(4)
ledsala=  LED2 (17)

#LED CUARTO
def procesa(respuesta):
    print respuesta

    if respuesta:
    	ledcuarto.on()
    	print "Encendido"
    else:
    	ledcuarto.off()
    	print "Apagado"
    sys.stdout.flush()

#LED SALA
def procesasala(respuesta2):
    print respuesta2

    if respuesta2:
    	ledsala.on()
    	print "Encendido"
    else:
    	ledsala.off()
    	print "Apagado"
    sys.stdout.flush()


try:
	print "Inicio"
	t = Conexion(procesa)
	t.daemon=True
	t.start()
	t2 = Conexion2(procesasala)
	t2.daemon=True
	t2.start()
	signal.pause()
except (KeyboardInterrupt, SystemExit):
	raise
	print "Salida"
