from __future__ import print_function
import sys, pygn, json
from pprint import pprint
import numpy as np
import pickle
import json

def matchSong(sent, mag, vol):
    vec = [5,9,9]
    ## 10x / range + 10min/rnage
    s_range = 2.0
    s_min = -1
    sent = 10*(sent - s_min)/ s_range
    if sent < 1:
        sent = 1
    elif sent > 9:
        sent = 9

    m_range = float(2)
    m_min = -1
    mag = 10*(mag - m_min)/m_range

    v_range = 1700
    v_max   = 2500
    v_min   = 300
    vol     = 4000 / float(vol) + 3

    if vol > 9:
        vol = 9
    elif vol < 1:
        vol = 1

    vec = np.asarray([sent, mag, vol])
    # print(vec)
    # vec = shift_vec(vec)

    # reader = csv.reader(open("matrix.csv", "rb"), delimiter=",")
    # x = list(reader)
    # SongMatrix = numpy.array(x).astype("float")

    # reader = csv.reader(open("songList.csv", "rb"), delimiter=",")
    # x = list(reader)
    # songList = numpy.array(x).astype("float")
    # if not SongMatrix:
    SongMatrix = pickle.load(open("matrix.txt", "rb"))
    songList = pickle.load(open("songList.txt", "rb"))
    vec = np.asarray(vec)

    # print('match_song:', vec, SongMatrix)
    dists = np.sqrt(np.linalg.norm(SongMatrix - vec, axis=1))
    # print("dists",dists)

    dist_IDs = zip(dists,songList)
    closest_match = sorted(dist_IDs)[0]
    song_ID = closest_match[1]

    title = str(song_ID[0])
    artist = str(song_ID[1])
    ID = str(song_ID[2])
    vol = str(vec[2])

    response_dict = {"title": title, "artist": artist, "song_ID": ID, "vol":vol}
    with open('../tmp/result.json', 'w') as fp:
        print(json.dumps(response_dict))
        sys.stdout.flush()
        json.dump(response_dict, fp)

    # return response_dict


    ## vol in ????


# songList =  [
#     ( "Breathe Me", "Sia"),
#     ( "i hate u, i love you (feat. olivia o'brien)", "gnash"),
#     ("High Without Your Love", "Loote"),
#     ("Wild Horses - Sam Feldt Remix", "Birdy"),
#     ("I Like Me Better", "Lauv"),
#     ("From Time", "Drake"),
#     ("Losin Control", "Russ"),
#     ("The Night We Met", "Lord Huron"),
#     ("Sunscreen", "Ira Wolf"),
#     ("Ab Ovo", "Joep Beving"),
#     ("Adrift", "Alaskan Tapes"),
#     ("The Wave", "Elohim"),
#     ("rockstar", "Post Malone"),
#     ("Dan Bilzerian", "T-Pain"),
#     ("Sorry Not Sorry", "Demi Lovato"),
#     ("Issues", "Julia Michaels"),
#     ("1-800-273-8255", "Logic"),
#     ("About Today", "The National"),
#     ("Photograph", "Ed Sheeran"),
#     ("Turning Tables", "Adele"),
# ]

s = float(sys.argv[1])
m = float(sys.argv[2])
v = float(sys.argv[3])

matchSong(s, m, v)
#
#
# if len(sys.argv) > 1:
#     x = int(sys.argv[1])
#     y = int(sys.argv[2])
#     z = int(sys.argv[3])
#     [x,y,z]
#     a = matchSong([x,y,z])
#     # print(a)
