from __future__ import print_function
import sys, pygn, json
from pprint import pprint
import time
import numpy as np
import pickle


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

def matchSong(vec):
    # if not SongMatrix:
    SongMatrix = pickle.load(open("matrix.txt", "rb"))
    vec = np.asarray(vec)

    print('match_song:', vec, SongMatrix)
    dists = np.sqrt(np.linalg.norm(SongMatrix - vec, axis=1))
    print("dists",dists)
    dist_IDs = zip(dists,songList)
    closest_match = sorted(dist_IDs)[0]
    songID = closest_match[1]


    return songID

x = matchSong([5,2,7])
print(x)
