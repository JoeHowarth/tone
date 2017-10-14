from __future__ import print_function
import sys, pygn, json


clientID = '60953168-B870F3CF197FCE870CF8759D0A66D843' # Enter your Client ID from developer.gracenote.com here
userID = '43445971141100181-8D808B2A0047D17084D09FF1D5F6BA06' # Get a User ID from pygn.register() - Only register once per end-user


print('\nSearch for track "Drop" by "Cornelius"\n')
result = pygn.search(clientID=clientID, userID=userID, artist='Cornelius', track='Drop')
print(json.dumps(result, sort_keys=True, indent=4))
