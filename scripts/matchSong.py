import numpy as np
import xml.etree.ElementTree as ET

def matchSong(vec):
    vec = np.ndarray(vec)


    dists = np.sqrt(np.linalg.norm(SongMatrix - vec, axis=1))
    dist_IDs = zip(dists,song_IDs)
    closest_match = sorted(dist_IDs)[0]
    songID = closest_match[1]

    np.sort(dists)

    return songID

song_IDs []

def gaceNote2SongMatrix():
    Qs = ET.Element('QUERIES')
    for (artist,track) in songLsit:
        q = ET.SubElement(Qs, 'QUERY')
        

    return SongMatrix

#
# def compute_distances_no_loops(self, X):
#     """
#     Compute the distance between each test point in X and each training point
#     in self.X_train using no explicit loops.
#     Input / Output: Same as compute_distances_two_loops
#     """
#     num_test = X.shape[0]
#     num_train = self.X_train.shape[0]
#     dists = np.zeros((num_test, num_train))
#     #########################################################################
#     # TODO:                                                                 #
#     # Compute the l2 distance between all test points and all training      #
#     # points without using any explicit loops, and store the result in      #
#     # dists.                                                                #
#     #                                                                       #
#     # You should implement this function using only basic array operations; #
#     # in particular you should not use functions from scipy.                #
#     #                                                                       #
#     # HINT: Try to formulate the l2 distance using matrix multiplication    #
#     #       and two broadcast sums.                                         #
#     #########################################################################
#
#     #IMPORTANT: (x-y)^2 = x^2 + y^2 -2ab
#     num_test = X.shape[0]
#     num_train = self.X_train.shape[0]
#     dists = np.zeros((num_test, num_train))
#
#     tr2 = (self.X_train ** 2).sum(axis = 1).reshape(1, self.X_train.shape[0])
#     tst2 = (X ** 2).T.sum(axis = 0).reshape(X.shape[0],1)
#
#     AxB = 2 * np.matmul(X, self.X_train.T)
#     a2pb2 = tst2 + tr2
#     dists = np.sqrt(np.sqrt(np.abs(a2pb2 - AxB)))
#     #########################################################################
#     #                         END OF YOUR CODE                              #
#     #########################################################################
#     return dists
