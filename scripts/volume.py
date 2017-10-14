from pydub import AudioSegment
import sys
#
# def match_target_amplitude(sound, target_dBFS):
#     change_in_dBFS = target_dBFS - sound.dBFS
#     return sound.apply_gain(change_in_dBFS)
#
# sound = AudioSegment.from_file(…)
# normalized_sound = match_target_amplitude(sound, -20.0)
#
#
# def match_target_amplitude(sound, target_dBFS):
#     change_in_dBFS = target_dBFS - sound.dBFS
#     return sound.apply_gain(change_in_dBFS)

if len(sys.argv) > 2:
    path = sys.argv[1]
    sound = AudioSegment.from_file(path, "aac")
    vol = (sound.rms)
    print(vol)
    sys.stdout.flush()
# normalized_sound = match_target_amplitude(sound, -20.0)
# normalized_sound.export("nomrmalizedAudio.m4a", format="mp4")
