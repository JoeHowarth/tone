def pyScript(text):
    vec = text2vec(text)

    songID = matchSong(vec)

    return songID
