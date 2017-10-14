from pydub import AudioSegment
import sys

def main():
    if len(sys.argv) > 1:
        path = sys.argv[1]
        sound = AudioSegment.from_file(path, "aac")
        vol = (sound.rms)
        print(vol)
        sys.stdout.flush()

if __name__ == '__main__':
    main()
