import numpy as np
import pickle
import pygn
import sys
from pprint import pprint

clientID = '60953168-B870F3CF197FCE870CF8759D0A66D843' # Enter your Client ID from developer.gracenote.com here
userID = '43445971141100181-8D808B2A0047D17084D09FF1D5F6BA06' # Get a User ID from pygn.register() - Only register once per end-user

def makeMatrix():
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

    gen2num = {
        "Latin" : (5, 4, 8)   ,
        "Blues" :  (3, 4, 5)  ,
        "Classical" :  (6, 9, 1)  ,
        "World" : (5, 5, 5) ,
        "Electronica" : (7, 6, 9)   ,
        "Country & Western" : (3, 4, 4) ,
        "Comedy, Spoken & Other" : (5,5,5) ,
        "Traditional Pop" :  (8, 4, 8)  ,
        "Traditional": (6,4,2),
        "Folk" :  (5, 5, 3)  ,
        "Punk" :  (3,6,6)  ,
        "New Age" : (9, 4, 2) ,
        "Rock" :  (5,8,7),
        "Soul/R&B" : (4,9,5) ,
        "Soundtrack" : (5,5,5),
        "Reggae" : (5,3,3) ,
        "Gospel & Christian" :  (7, 7, 2),
        "Children's" :  (5,5,5)  ,
        "Alternative" : (4,6,7) ,
        "Alternative & Punk" : (4,6,6) ,
        "Metal" : (2,9,9) ,
        "Rap/Hip-Hop" : (5,9,7) ,
        "Urban": (5,9,7),
        "Pop" : (5,5,5) ,
        "Dance & House" : (7,6,9) ,
        "Oldies" : (6,2,2) ,
        "Jazz" :  (5,9,2),
        "Indie" : (8,7,3),
        "Other" : (5,5,5)
    }

    # [ (title, artist), (...), ... , ]
    songList = pickle.load(open("songList.txt", "rb"))
    pprint(songList)

    vec_list = []
    for (title, artist, _ID) in songList:
        result = pygn.search(clientID=clientID, userID=userID, artist=artist, track=title)
        moods = result["mood"]
        genre = result['genre']
        print(genre)
        # print(len(moods))

        if len(moods) > 1:
            mood = moods["1"]["TEXT"]
        else:
            mood = "Other"
        if len(genre) > 1:
            genre = genre["1"]["TEXT"]
            print(genre)
        else:
            genre = "Other"

        m_vec = mood2num[mood]
        g_vec = gen2num[genre]
        combined  = m_vec + np.multiply([0.3,0.5,1], g_vec)
        combined = np.divide(combined, [1.3,1.5,2])

        print(combined)
        vec_list.append(combined)

        # print(mood2num[mood])

    matrix = np.asarray(vec_list)
    with open("matrix.txt", "wb") as fp:
        pickle.dump(matrix, fp)

    print(matrix)


if sys.argv[1] == "run":
    makeMatrix()
