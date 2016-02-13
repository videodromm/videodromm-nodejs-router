import optparse
from colorama import init, Fore, Back, Style
from OSC import *
from OSC import _readString, _readFloat, _readInt

init()

if __name__ == "__main__":
	print(Fore.GREEN + "Videodromm receiver")

	s = OSCServer(("127.0.0.1", 7500), return_port=7500)
	s.addMsgHandler("/hello", s.msgPrinter_handler)
	s.addMsgHandler("/multislider", s.msgPrinter_handler)
	s.addMsgHandler("/dial", s.msgPrinter_handler)
	s.addMsgHandler("/dial3", s.msgPrinter_handler)
	s.addMsgHandler("/backgroundcolor", s.msgPrinter_handler)

	print(Fore.CYAN + "Ready")
	print s

	st = threading.Thread(target=s.serve_forever)
	st.start()

	try:
		while True:
			time.sleep(30)
	
	
	except KeyboardInterrupt:
		print(Fore.RED +  "\nClosing OSCServer.")
		s.close()
		print "Waiting for Server-thread to finish"
		st.join()
		
	sys.exit(0)