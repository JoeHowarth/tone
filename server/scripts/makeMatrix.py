import numpy as np
import pickle
import pygn
import sys

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

    # [ (title, artist), (...), ... , ]
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
        ("Photograph", "Ed Sheeran"),
        ("Turning Tables", "Adele"),
    ]

    vec_list = []
    for (title, artist) in songList:
        result = pygn.search(clientID=clientID, userID=userID, artist=artist, track=title)
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
    with open("matrix.txt", "wb") as fp:
        pickle.dump(matrix, fp)

    print(matrix)


if sys.argv[1] == "run":
    makeMatrix()
