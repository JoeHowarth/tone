from __future__ import print_function
import sys, pygn, json
from pprint import pprint
import time
import numpy as np


clientID = '60953168-B870F3CF197FCE870CF8759D0A66D843' # Enter your Client ID from developer.gracenote.com here
userID = '43445971141100181-8D808B2A0047D17084D09FF1D5F6BA06' # Get a User ID from pygn.register() - Only register once per end-user

def matchSong(vec, song_IDs, SongMatrix):
    vec = np.asarray(vec)

    print('match_song:', vec, SongMatrix)
    dists = np.sqrt(np.linalg.norm(SongMatrix - vec, axis=1))
    print("dists",dists)
    dist_IDs = zip(dists,song_IDs)
    closest_match = sorted(dist_IDs)[0]
    songID = closest_match[1]


    return songID

# (title, artist)
mood2num = {
    "Peaceful" : (5, 2, 1),
    "Romantic" : (7, 5, 4),
    "Sentimental" : (6, 3, 2),
    "Tender" : (6, 4, 3),
    "Easygoing" : (8, 3, 3),
    "Yearning" : (4, 7, 4),
    "Sophisticated" : (7,7,4),
    "Sensual" : (8,9,3),
    "Cool" :   (6, 3, 4),
    "Gritty" :  (3, 8, 7),
    "Somber" :  (2, 5, 3),
    "Melancholy" :   (1, 6, 3),
    "Serious" :  (5, 5, 5),
    "Brooding" :   (2, 9, 4),
    "Fiery" :   (5, 9, 7),
    "Urgent" :  (4, 8, 6),
    "Defiant" :  (3, 6, 5),
    "Aggressive" :  (3, 9,9),
    "Rowdy" :  (6, 8, 9),
    "Excited" :   (9,9,8),
    "Energizing" :   (8,7,8),
    "Empowering" :   (7,7,6),
    "Stirring" :   (5,5,6),
    "Lively" :   (7,5,7),
    "Upbeat" :   (8,4,6),
    "Other" :   (5,5,5),
}

songList =  [
    ( "Breathe Me", "Sia"),
    ( "i hate u, i love you (feat. olivia o'brien)", "gnash"),
    ("High Without Your Love", "Loote"),
    ("Wild Horses - Sam Feldt Remix", "Birdy"),
    ("I Like Me Better", "Lauv"),
    ("From Time", "Drake"),
    ("Losin Control", "Russ"),
    ("The Night We Met", "Lord Huron"),
    ("Sunscreen", "Ira Wolf"),
    ("Ab Ovo", "Joep Beving"),
    ("Adrift", "Alaskan Tapes"),
    ("The Wave", "Elohim"),
    ("rockstar", "Post Malone"),
    ("Dan Bilzerian", "T-Pain"),
    ("Sorry Not Sorry", "Demi Lovato"),
    ("Issues", "Julia Michaels"),
    ("1-800-273-8255", "Logic"),
    ("About Today", "The National"),
    # ("Photograph", "Ed Sheeran"),
    ("Turning Tables", "Adele"),
]

vec_list = []

for (title, artist) in songList:
    result = pygn.search(clientID=clientID, userID=userID, artist=artist, track=title)
    # print(json.dumps(result, sort_keys=True, indent=4))
    # print(result["mood"])
    moods = result["mood"]
    # print(len(moods))
    if len(moods) > 1:
        mood = moods["1"]["TEXT"]
        # print(mood)
    else:
        mood = "Other"
    vec_list.append(mood2num[mood])

    # print(mood2num[mood])

matrix = np.asarray(vec_list)
pprint(matrix)

print(matchSong(np.asarray([8,3,3]), songList, matrix))
        # mood = result["mood"]["0"]["TEXT"]

    # code = mood2num[mood]
    # # print(code)
    # pprint(moods)
    # for key in moods.keys():
    #     print(key)
    #     moods[key]['TEXT']
    # pprint(json.dumps(json, sort_keys=True, indent=4))

## sentiment, magnitude, volume

# <string name="id65322,">Peaceful</string>
# <string name="id65323,">Romantic</string>
# <string name="id65324,">Sentimental</string>
# <string name="id42942,">Tender</string>
# <string name="id42946,">Easygoing</string>
# <string name="id65325,">Yearning</string>
# <string name="id42954,">Sophisticated</string>
# <string name="id42947,">Sensual</string>
# <string name="id65326,">Cool</string>
# <string name="id65327,">Gritty</string>
# <string name="id42948,">Somber</string>
# <string name="id42949,">Melancholy</string>
# <string name="id65328,">Serious</string>
# <string name="id65329,">Brooding</string>
# <string name="id42953,">Fiery</string>
# <string name="id42955,">Urgent</string>
# <string name="id42951,">Defiant</string>
# <string name="id42958,">Aggressive</string>
# <string name="id65330,">Rowdy</string>
# <string name="id42960,">Excited</string>
# <string name="id42961,">Energizing</string>
# <string name="id42945,">Empowering</string>
# <string name="id65331,">Stirring</string>
# <string name="id65332,">Lively</string>
# <string name="id65333,">Upbeat</string>
# <string name="id42966,">Other</string>

ids = [65322,
65323,
65324,
42942,
42946,
65325,
42954,
42947,
65326,
65327,
42948,
42949,
65328,
65329,
42953,
42955,
42951,
42958,
65330,
42960,
42961,
42945,
65331,
65332,
65333,
42966]

# titles = []
# # for ID in ids:
# clientID = '60953168-B870F3CF197FCE870CF8759D0A66D843' # Enter your Client ID from developer.gracenote.com here
# userID = '43445971141100181-8D808B2A0047D17084D09FF1D5F6BA06' #
# time.sleep(1)
# result = pygn.createRadio(clientID, userID, mood=str(42954), popularity ='1000', similarity = '1000')
# title = result[0]["track_title"]
# titles.append(title)
#     # for key in moods.keys():
#     #     pprint(moods[key]['TEXT'])
# print(json.dumps(result[0], sort_keys=True, indent=4))
#
# print(titles)
