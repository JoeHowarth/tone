from __future__ import print_function
import sys, pygn, json
from pprint import pprint
import time
import numpy as np
import pickle
import json

def matchSong(vec):
    vec = [5,9,9]
    # vec = shift_vec(vec)

    # if not SongMatrix:
    SongMatrix = pickle.load(open("matrix.txt", "rb"))
    songList = pickle.load(open("songList.txt", "rb"))
    vec = np.asarray(vec)

    print('match_song:', vec, SongMatrix)
    dists = np.sqrt(np.linalg.norm(SongMatrix - vec, axis=1))
    print("dists",dists)

    dist_IDs = zip(dists,songList)
    closest_match = sorted(dist_IDs)[0]
    songID = closest_match[1]

    response_dict = {"title": song_ID[0], "artist": song_ID[1], "song_ID": song_ID[2], "vol":vec[2]}
    with open('../tmp/result.json', 'w') as fp:
        json.dump(response_dict, fp)

    return response_dict

def shift_vec(vec):
    (sent, mag, vol) = vec
    ## sent in [-2,2] ??

    ## mag in [-2,2]

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





if len(sys.argv) > 1:
    x = int(sys.argv[1])
    y = int(sys.argv[2])
    z = int(sys.argv[3])
    [x,y,z]
    a = matchSong([x,y,z])
    print(a)
